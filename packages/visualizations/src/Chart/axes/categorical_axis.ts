import {
  cloneDeep,
  compact,
  defaults,
  filter,
  flow,
  forEach,
  get,
  groupBy,
  identity,
  includes,
  isEmpty,
  isNil,
  keys,
  map,
  partition,
  pickBy,
  reduce,
  sortBy,
  uniq,
  uniqueId,
  values,
} from "lodash/fp"

import {
  computeRequiredMargin,
  insertElements,
  positionBackgroundRect,
  translateAxis,
  getTextAnchor,
  drawTitle,
} from "./axis_utils"

import { setTextAttributes, setLineAttributes } from "../../utils/d3_utils"
import Events from "../../shared/event_catalog"
import { scaleBand } from "d3-scale"
import * as styles from "./styles"

import {
  AxisAttributes,
  AxisClass,
  AxisComputed,
  AxisPosition,
  AxisType,
  CategoricalAxisOptions,
  ComponentConfigInfo,
  D3Selection,
  EventBus,
  State,
  StateWriter,
  ComponentHoverPayload,
} from "../typings"

const defaultOptions: Partial<CategoricalAxisOptions> = {
  showRules: false,
  showTicks: true,
}

class CategoricalAxis implements AxisClass<string> {
  computed: AxisComputed
  data: string[]
  el: D3Selection
  events: EventBus
  isXAxis: boolean
  options: CategoricalAxisOptions
  position: AxisPosition
  previous: AxisComputed
  state: State
  stateWriter: StateWriter
  type: AxisType = "categorical"

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection, position: AxisPosition) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.position = position
    this.isXAxis = position[0] === "x"
    this.el = insertElements(el, this.type, position, this.state.current.get("computed").canvas.drawingDims)
    this.el.on("mouseenter", this.onComponentHover.bind(this))
  }

  // Categorical axis supports everything that supports ".toString()"
  validate(value: any): boolean {
    return !isNil(value)
  }

  update(options: Partial<CategoricalAxisOptions>, data: string[]): void {
    this.options = defaults(defaultOptions)(options)
    this.data = flow(
      filter(this.validate),
      map(String),
    )(this.options.values || data)
  }

  // Computations
  compute(): void {
    this.previous = cloneDeep(this.computed)
    const config = this.state.current.get("config")
    const tickWidth = this.computeTickWidth()
    const range = this.computeRange(tickWidth)
    this.computed = {
      range,
      tickWidth,
      ticks: this.data,
      scale: scaleBand()
        .range(range)
        .domain(this.data)
        .padding(config.innerBarSpacingCategorical),
    }
    this.computed.ruleOffset = tickWidth ? this.computed.scale.bandwidth() / 2 : 0
    this.previous = defaults(this.computed)(this.previous)
    this.stateWriter(["computed", this.position], this.computed)
    this.stateWriter(["previous", this.position], this.previous)
  }

  private computeTickWidth(): number {
    const barSeries = this.state.current.get("computed").series.barSeries
    if (isEmpty(barSeries)) {
      return 0
    }

    const config = this.state.current.get("config")
    const drawingDims = this.state.current.get("computed").canvas.drawingDims
    const defaultTickWidth =
      (this.position[0] === "x"
        ? drawingDims.width / (this.data.length || 1)
        : drawingDims.height / (this.data.length || 1)) *
      (1 - config.innerBarSpacingCategorical)

    const stacks = groupBy((s: { [key: string]: any }) => s.stackIndex || uniqueId("stackIndex"))(barSeries)
    const partitionedStacks: { [key: string]: any }[][] = partition(
      (stack: any): boolean => {
        return compact(map(get("barWidth"))(stack)).length > 0
      },
    )(stacks)
    const fixedWidthStacks: { [key: string]: any }[] = partitionedStacks[0]
    const variableWidthStacks: { [key: string]: any }[] = partitionedStacks[1]

    let requiredTickWidth = reduce((sum: number, stack: any) => {
      return sum + stack[0].barWidth
    }, config.innerBarSpacing * (keys(stacks).length - 1))(fixedWidthStacks)

    const variableBarWidth =
      variableWidthStacks.length > 0
        ? Math.max(config.minBarWidth, (defaultTickWidth - requiredTickWidth) / (variableWidthStacks.length || 1))
        : 0

    requiredTickWidth =
      (requiredTickWidth + variableBarWidth * variableWidthStacks.length) / (1 - config.innerBarSpacingCategorical)

    this.stateWriter("computedBars", this.computeBarPositions(variableBarWidth, requiredTickWidth))
    return Math.max(requiredTickWidth, defaultTickWidth / (1 - config.innerBarSpacingCategorical))
  }

  private computeBarPositions(defaultBarWidth: number, tickWidth: number) {
    const config = this.state.current.get("config")
    const computedSeries = this.state.current.get("computed").series
    const indices = sortBy(identity)(uniq(values(computedSeries.barIndices)))
    let offset = -tickWidth / 2

    return reduce((memo: { [key: string]: any }, index: number): { [key: string]: any } => {
      const seriesAtIndex: string[] = keys(
        pickBy((d: number): boolean => d === index)(computedSeries.barIndices),
      ) as string[]
      const width: number = computedSeries.barSeries[seriesAtIndex[0]].barWidth || defaultBarWidth
      forEach(
        (series: string): void => {
          memo[series] = { width, offset }
        },
      )(seriesAtIndex)
      offset = offset + width + config.innerBarSpacing
      return memo
    }, {})(indices)
  }

  private computeRange(tickWidth: number): [number, number] {
    const computed = this.state.current.get("computed")
    const width = tickWidth * this.data.length
    const offset = tickWidth / 2
    const margin = (axis: AxisPosition) =>
      includes(axis)(computed.axes.requiredAxes) ? (computed.axes.margins || {})[axis] || 0 : 0

    const range =
      this.position[0] === "x"
        ? [0, width || computed.canvas.drawingDims.width]
        : [computed.canvas.drawingDims.height || width, margin("x2") || this.options.minTopOffsetTopTick]

    const adjustedRange: [number, number] = [range[0] + offset, range[1] + offset]
    return adjustedRange
  }

  // Drawing
  draw(duration?: number): void {
    translateAxis(this.el, this.position, this.state.current.get("computed").canvas.drawingDims)
    this.drawTicks(duration)
    this.drawLabels(duration)
    this.drawBorder(duration)
    positionBackgroundRect(this.el, this.position, this.state.current.get("config").duration)
    drawTitle(this.el, this.options, this.position, this.computed.range)
  }

  private drawTicks(duration?: number): void {
    const attributes = this.getTickAttributes()

    const ticks = this.el
      .select("g.axis-elements")
      .selectAll(`line.${styles.tick}`)
      .data(this.options.showTicks ? this.computed.ticks : [], String)

    const updateTicks = ticks
      .enter()
      .append("svg:line")
      .call(setLineAttributes, attributes)
      .merge(ticks)
      .attr("class", (d: any) => `${styles.tick} ${d === 0 ? "zero" : ""}`)

    if (duration) {
      updateTicks.call(setLineAttributes, attributes, duration)
    }

    ticks.exit().remove()
  }

  private drawLabels(duration?: number): void {
    const attributes = this.getAttributes()
    const startAttributes = this.getStartAttributes(attributes)

    const labels = this.el
      .select("g.axis-elements")
      .selectAll(`text.${styles.label}`)
      .data(this.computed.ticks, String)

    const updateLabels = labels
      .enter()
      .append("svg:text")
      .attr("class", styles.label)
      .merge(labels)
      .call(setTextAttributes, startAttributes)
      .style("font-size", `${this.options.fontSize}px`)

    if (duration) {
      updateLabels.call(setTextAttributes, attributes, duration)
    }

    labels.exit().remove()
  }

  // Padding added only to end of each step in d3 ordinal band scale
  private scaleWithOffset(computed: AxisComputed) {
    const barPadding = this.state.current.get("config").innerBarSpacingCategorical
    const stepWidth = computed.scale.step()
    return (d: string) => computed.scale(d) - (computed.tickWidth ? (stepWidth * barPadding) / 2 : 0)
  }

  private getAttributes(): AxisAttributes {
    const scaleWithOffset = this.scaleWithOffset(this.computed)
    const attrs: any = {
      x: this.isXAxis ? scaleWithOffset : (d: string) => 0,
      y: this.isXAxis ? (d: string) => 0 : scaleWithOffset,
      dx: this.isXAxis ? 0 : this.options.tickOffset,
      dy: this.isXAxis ? this.options.tickOffset + (this.position === "x1" ? this.options.fontSize : 0) : 0,
      text: identity,
      textAnchor: getTextAnchor(this.position, this.options.rotateLabels),
    }
    attrs.transform = this.options.rotateLabels
      ? (d: any) => `rotate(-45, ${attrs.x(d) + attrs.dx}, ${attrs.y(d) + attrs.dy})`
      : ""
    return attrs
  }

  private getStartAttributes(attributes: AxisAttributes): AxisAttributes {
    const startAttributes = cloneDeep(attributes)
    startAttributes[this.isXAxis ? "x" : "y"] = (d: string) =>
      this.scaleWithOffset(this.previous)(d) || this.scaleWithOffset(this.computed)(d)
    startAttributes.transform = this.options.rotateLabels
      ? (d: any) =>
          `rotate(-45, ${startAttributes.x(d) + startAttributes.dx}, ${startAttributes.y(d) + startAttributes.dy})`
      : ""
    return startAttributes
  }

  private getTickAttributes() {
    const scaleWithOffset = this.scaleWithOffset(this.computed)
    return {
      x1: this.isXAxis ? scaleWithOffset : 0,
      x2: this.isXAxis ? scaleWithOffset : this.options.tickOffset * 0.6,
      y1: this.isXAxis ? 0 : scaleWithOffset,
      y2: this.isXAxis ? this.options.tickOffset * 0.6 : scaleWithOffset,
    }
  }

  adjustMargins(): void {
    let requiredMargin = computeRequiredMargin(this.el, this.options.margin, this.options.outerPadding, this.position)

    // Add space for flags
    const flagAxis = this.state.current.get(["computed", "series", "axesWithFlags", this.position])
    requiredMargin = requiredMargin + (flagAxis ? flagAxis.axisPadding : 0)

    const computedMargins = this.state.current.get("computed").axes.margins || {}
    if (computedMargins[this.position] === requiredMargin) {
      return
    }
    computedMargins[this.position] = requiredMargin
    this.stateWriter("margins", computedMargins)
    translateAxis(this.el, this.position, this.state.current.get("computed").canvas.drawingDims)
  }

  private drawBorder(duration?: number): void {
    const drawingDims = this.state.current.get("computed").canvas.drawingDims
    const border = {
      x1: 0,
      x2: this.isXAxis ? drawingDims.width : 0,
      y1: this.isXAxis ? 0 : drawingDims.height,
      y2: 0,
    }
    this.el.select(`line.${styles.border}`).call(setLineAttributes, border, duration)
  }

  private onComponentHover(): void {
    const payload: ComponentHoverPayload = { component: this.el, options: this.hoverInfo() }
    this.events.emit(Events.FOCUS.COMPONENT.HOVER, payload)
  }

  private hoverInfo(): ComponentConfigInfo {
    return {
      key: this.position,
      type: "axis",
    }
  }

  close(): void {
    this.el.node().remove()
  }
}

export default CategoricalAxis
