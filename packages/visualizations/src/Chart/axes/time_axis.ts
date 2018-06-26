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
  isDate,
  isEmpty,
  keys,
  last,
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
import * as Moment from "moment"
import { extendMoment } from "moment-range"

const moment: any = extendMoment(Moment as any)

import { scaleTime } from "d3-scale"
import { timeMonday } from "d3-time"
import { timeFormat } from "d3-time-format"
import * as styles from "./styles"

import {
  AxisAttributes,
  AxisClass,
  AxisComputed,
  AxisType,
  AxisPosition,
  ComponentConfigInfo,
  ComponentHoverPayload,
  D3Selection,
  EventBus,
  State,
  StateWriter,
  TimeAxisOptions,
  TimeIntervals,
} from "../typings"

// @TODO - add in more options
// Have removed "now", and any formatting to account for change in month/year
const tickFormatter = (interval: TimeIntervals) => {
  switch (interval) {
    case "hour":
      return timeFormat("%b %d %H:00")
    case "day":
      return timeFormat("%b %d")
    case "week":
      return timeFormat("W%W")
    case "month":
      return timeFormat("%b %y")
    case "quarter":
      return (d: Date): string => timeFormat(`Q${Math.floor((d.getMonth() + 3) / 3)} %Y`)(d)
    case "year":
      return timeFormat("%Y")
    default:
      throw new Error(`Interval of length ${interval} is not supported.`)
  }
}

const defaultOptions: Partial<TimeAxisOptions> = {
  showRules: false,
  showTicks: true,
}

class TimeAxis implements AxisClass<Date> {
  computed: AxisComputed
  data: Date[]
  el: D3Selection
  events: EventBus
  isXAxis: boolean
  options: TimeAxisOptions
  position: AxisPosition
  previous: AxisComputed
  state: State
  stateWriter: StateWriter
  type: AxisType = "time"

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection, position: AxisPosition) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.position = position
    this.isXAxis = position[0] === "x"
    this.el = insertElements(el, this.type, position, this.state.current.get("computed").canvas.drawingDims)
    this.el.on("mouseenter", this.onComponentHover.bind(this))
  }

  validate(value: any): boolean {
    return isDate(value)
  }

  private updateOptions(options: Partial<TimeAxisOptions>): void {
    this.options = defaults(defaultOptions)(options)
    if (!this.options.start || !this.options.end || !this.options.interval) {
      throw new Error("Values for `start`, `end` and `interval` must always be configured for time axes.")
    }
  }

  update(options: TimeAxisOptions, data: Date[]): void {
    this.updateOptions(options)
    this.data = flow(
      filter(this.validate),
      sortBy((value: any) => value.valueOf()),
    )(data)
  }

  // Computations
  compute(): void {
    this.previous = cloneDeep(this.computed)
    const computed = this.computeInitial()
    computed.tickNumber = this.computeTickNumber(computed.ticksInDomain, computed.range)
    computed.scale = this.computeScale(computed.range, computed.ticksInDomain)
    computed.ticks = this.computeTicks(computed)
    computed.ruleTicks = this.computeRuleTicks(computed)
    this.computed = computed as AxisComputed
    this.previous = defaults(this.computed)(this.previous)
    this.stateWriter(["computed", this.position], this.computed)
    this.stateWriter(["previous", this.position], this.previous)
  }

  computeInitial(): { [key: string]: any } {
    const isRangeNegative = new Date(this.options.start).valueOf() > new Date(this.options.end).valueOf()
    const start = isRangeNegative ? this.options.end : this.options.start
    const end = isRangeNegative ? this.options.start : this.options.end
    const ticksInDomain = Array.from(moment.range(start, end).by(this.options.interval))
    const computed: Partial<AxisComputed> = {}
    computed.tickFormatter = tickFormatter(this.options.interval)
    computed.ticksInDomain = map((d: any) => d.toDate())(isRangeNegative ? ticksInDomain.reverse() : ticksInDomain)
    computed.tickWidth = this.computeTickWidth(computed.ticksInDomain)
    computed.range = this.computeRange(computed.tickWidth, computed.ticksInDomain.length)
    return computed
  }

  private computeTickWidth(ticksInDomain: Date[]): number {
    const barSeries = this.state.current.get("computed").series.barSeries
    if (isEmpty(barSeries)) {
      return 0
    }

    const config = this.state.current.get("config")
    const drawingDims = this.state.current.get("computed").canvas.drawingDims
    const defaultTickWidth = Math.min(drawingDims[this.isXAxis ? "width" : "height"] / ticksInDomain.length)

    const stacks = groupBy((s: { [key: string]: any }) => s.stackIndex || uniqueId("stackIndex"))(barSeries)
    const partitionedStacks: { [key: string]: any }[][] = partition(
      (stack: any): boolean => {
        return compact(map(get("barWidth"))(stack)).length > 0
      },
    )(stacks)
    const fixedWidthStacks: { [key: string]: any }[] = partitionedStacks[0]
    const variableWidthStacks: { [key: string]: any }[] = partitionedStacks[1]

    let requiredTickWidth: number = reduce((sum: number, stack: any) => {
      return sum + stack[0].barWidth
    }, config.outerBarSpacing)(fixedWidthStacks)

    const variableBarWidth =
      variableWidthStacks.length > 0
        ? Math.min(
            Math.max(config.minBarWidth, (defaultTickWidth - requiredTickWidth) / variableWidthStacks.length),
            config.maxBarWidthRatio * drawingDims[this.isXAxis ? "width" : "height"],
          )
        : 0
    requiredTickWidth = requiredTickWidth + variableBarWidth * variableWidthStacks.length

    this.stateWriter("computedBars", this.computeBars(variableBarWidth, requiredTickWidth))
    return Math.max(requiredTickWidth, defaultTickWidth)
  }

  private computeBars(defaultBarWidth: number, tickWidth: number) {
    const config = this.state.current.get("config")
    const computedSeries = this.state.current.get("computed").series
    const indices = sortBy(identity)(uniq(values(computedSeries.barIndices)))
    let offset = -tickWidth / 2 + config.outerBarSpacing / 2

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

  private computeRange(tickWidth: number, numberOfTicks: number): [number, number] {
    return this.isXAxis ? this.computeXRange(tickWidth, numberOfTicks) : this.computeYRange(tickWidth, numberOfTicks)
  }

  private computeXRange(tickWidth: number, numberOfTicks: number): [number, number] {
    const drawingDims = this.state.current.get("computed").canvas.drawingDims
    const width = tickWidth * numberOfTicks
    const offset = tickWidth / 2
    return [offset, (width || drawingDims.width) - offset]
  }

  private computeYRange(tickWidth: number, numberOfTicks: number): [number, number] {
    const computed = this.state.current.get("computed")
    const margin = (axis: AxisPosition) => {
      const isRequired: boolean = includes(axis)(computed.axes.requiredAxes)
      return isRequired ? (computed.axes.margins || {})[axis] || 0 : 0
    }
    const drawingDims = computed.canvas.drawingDims
    const width = tickWidth * numberOfTicks
    const offset = tickWidth / 2
    return [(drawingDims.height || width) - offset, offset + (margin("x2") || this.options.minTopOffsetTopTick)]
  }

  private computeTickNumber(ticksInDomain: Date[], range: [number, number]): number {
    const width = Math.abs(range[1] - range[0])
    return Math.min(ticksInDomain.length, Math.max(Math.floor(width / this.options.tickSpacing), this.options.minTicks))
  }

  private computeScale(range: [number, number], ticks: Date[]) {
    return scaleTime()
      .range(range)
      .domain([ticks[0], last(ticks)])
  }

  private computeTicks(computed: Partial<AxisComputed>): Date[] {
    if (this.options.interval === "week") {
      const tickInterval = Math.ceil(computed.ticksInDomain.length / computed.tickNumber || 1)
      return computed.scale.ticks(timeMonday, tickInterval)
    }
    const ticks = computed.scale.ticks(computed.tickNumber || 1)
    return ticks.length > computed.ticksInDomain.length ? computed.ticksInDomain : ticks
  }

  private computeRuleTicks(computed: Partial<AxisComputed>): Date[] {
    const ticks = this.options.interval === "week" ? computed.scale.ticks(timeMonday, 1) : computed.ticksInDomain
    if (!computed.tickWidth) {
      return ticks
    }

    const tickValues = map(computed.scale)(ticks)
    const ruleValues = reduce.convert({ cap: false })((memo: number[], tick: number, i: number) => {
      if (i > 0) {
        memo.push((tickValues[i - 1] + tick) / 2)
      }
      return memo
    }, [])(tickValues)
    return map(computed.scale.invert)(ruleValues)
  }

  computeAligned(computed: Partial<AxisComputed>): void {
    this.previous = cloneDeep(this.computed)
    computed.tickNumber = this.computeTickNumber(computed.ticksInDomain, computed.range)
    computed.scale = this.computeScale(computed.range, computed.ticksInDomain)
    computed.ticks = this.computeTicks(computed)
    computed.ruleTicks = this.computeRuleTicks(computed)
    this.computed = computed as AxisComputed
    this.previous = defaults(this.computed)(this.previous)
    this.stateWriter(["computed", this.position], this.computed)
    this.stateWriter(["previous", this.position], this.previous)
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
    const startAttributes = this.getTickStartAttributes()
    const attributes = this.getTickAttributes()

    const ticks = this.el
      .select("g.axis-elements")
      .selectAll(`line.${styles.tick}`)
      .data(this.options.showTicks ? this.computed.ticks : [], String)

    const updateTicks = ticks
      .enter()
      .append("svg:line")
      .call(setLineAttributes, startAttributes)
      .merge(ticks)
      .attr("class", styles.tick)

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
      // @TODO
      // .attr("class", (d: string | number, i: number): string => "tick " + this.tickClass(d, i))
      .style("font-size", `${this.options.fontSize}px`)

    if (duration) {
      updateLabels.call(setTextAttributes, attributes, duration)
    }

    labels.exit().remove()
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

  private getAttributes(): AxisAttributes {
    const attrs: any = {
      x: this.isXAxis ? this.computed.scale : (d: Date) => 0,
      y: this.isXAxis ? (d: Date) => 0 : this.computed.scale,
      dx: this.isXAxis ? 0 : this.options.tickOffset,
      dy: this.isXAxis ? this.options.tickOffset + (this.position === "x1" ? this.options.fontSize : 0) : 0,
      text: this.computed.tickFormatter,
      textAnchor: getTextAnchor(this.position, this.options.rotateLabels),
    }
    attrs.transform = this.options.rotateLabels
      ? (d: Date) => `rotate(-45, ${attrs.x(d) + attrs.dx}, ${attrs.y(d) + attrs.dy})`
      : ""
    return attrs
  }

  private getStartAttributes(attributes: AxisAttributes): AxisAttributes {
    const startAttributes = cloneDeep(attributes)
    startAttributes[this.isXAxis ? "x" : "y"] = this.previous.scale
    startAttributes.transform = this.options.rotateLabels
      ? (d: Date) =>
          `rotate(-45, ${startAttributes.x(d) + startAttributes.dx}, ${startAttributes.y(d) + startAttributes.dy})`
      : ""
    return startAttributes
  }

  private getTickAttributes() {
    return {
      x1: this.isXAxis ? this.computed.scale : 0,
      x2: this.isXAxis ? this.computed.scale : this.options.tickOffset * 0.6,
      y1: this.isXAxis ? 0 : this.computed.scale,
      y2: this.isXAxis ? this.options.tickOffset * 0.6 : this.computed.scale,
    }
  }

  private getTickStartAttributes() {
    return {
      x1: this.isXAxis ? this.previous.scale : 0,
      x2: this.isXAxis ? this.previous.scale : this.options.tickOffset * 0.6,
      y1: this.isXAxis ? 0 : this.previous.scale,
      y2: this.isXAxis ? this.options.tickOffset * 0.6 : this.previous.scale,
    }
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

export default TimeAxis
