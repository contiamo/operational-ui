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
import { axisPosition, computeRange, computeRequiredMargin, insertElements, positionBackgroundRect } from "./axis_utils"
import { setTextAttributes, setLineAttributes } from "../../utils/d3_utils"
import { scaleBand } from "d3-scale"
import * as styles from "./styles"
import {
  AxisAttributes,
  AxisClass,
  AxisComputed,
  AxisPosition,
  AxisType,
  CategoricalAxisOptions,
  ChartConfig,
  Computed,
  D3Selection,
  EventBus,
  Object,
  State,
  StateWriter,
  XAxisConfig,
  YAxisConfig,
} from "../typings"

class CategoricalAxis implements AxisClass<string> {
  computed: AxisComputed
  data: string[]
  el: D3Selection
  events: EventBus
  isXAxis: boolean
  position: AxisPosition
  previous: AxisComputed
  sort: boolean = true
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
  }

  // Categorical axis supports everything that supports ".toString()"
  validate(value: any): boolean {
    return !isNil(value)
  }

  update(options: CategoricalAxisOptions, data: string[]): void {
    this.data = flow(filter(this.validate), map(String))(options.values || data)
  }

  // Computations
  compute(): void {
    this.previous = cloneDeep(this.computed)
    const config: ChartConfig = this.state.current.get("config")
    const computedChart: Computed = this.state.current.get("computed")
    const tickWidth: number = this.computeTickWidth()
    const range: [number, number] = this.computeRange(tickWidth)
    this.computed = {
      range,
      ticks: this.data,
      scale: scaleBand()
        .range(range)
        .domain(this.data)
        .padding(config.innerBarPaddingCategorical),
    }
    this.previous = defaults(this.computed)(this.previous)
    this.stateWriter(["computed", this.position], this.computed)
    this.stateWriter(["previous", this.position], this.previous)
  }

  private computeTickWidth(): number {
    const barSeries = this.state.current.get("computed").series.barSeries
    if (isEmpty(barSeries)) {
      return 0
    }

    const config: ChartConfig = this.state.current.get("config")
    const drawingDims: Object<number> = this.state.current.get("computed").canvas.drawingDims
    const defaultTickWidth: number =
      (this.position[0] === "x" ? drawingDims.width / this.data.length : drawingDims.height / this.data.length) *
      (1 - config.innerBarPaddingCategorical)

    const stacks = groupBy((s: Object<any>) => s.stackIndex || uniqueId("stackIndex"))(barSeries)
    const partitionedStacks: Object<any>[][] = partition((stack: any): boolean => {
      return compact(map(get("barWidth"))(stack)).length > 0
    })(stacks)
    const fixedWidthStacks: Object<any>[] = partitionedStacks[0]
    const variableWidthStacks: Object<any>[] = partitionedStacks[1]

    let requiredTickWidth: number = reduce((sum: number, stack: Object<any>): number => {
      return sum + stack[0].barWidth
    }, config.innerBarPadding * (keys(stacks).length - 1))(fixedWidthStacks)

    const variableBarWidth: number =
      variableWidthStacks.length > 0
        ? Math.max(config.minBarWidth, (defaultTickWidth - requiredTickWidth) / variableWidthStacks.length)
        : 0

    requiredTickWidth =
      (requiredTickWidth + variableBarWidth * variableWidthStacks.length) / (1 - config.innerBarPaddingCategorical)

    this.stateWriter("computedBars", this.computeBarPositions(variableBarWidth, requiredTickWidth))
    return Math.max(requiredTickWidth, defaultTickWidth / (1 - config.innerBarPaddingCategorical))
  }

  private computeBarPositions(defaultBarWidth: number, tickWidth: number): Object<number> {
    const config: ChartConfig = this.state.current.get("config")
    const computedSeries: Object<any> = this.state.current.get("computed").series
    const indices = sortBy(identity)(uniq(values(computedSeries.barIndices)))
    let offset: number = -tickWidth / 2

    return reduce((memo: Object<any>, index: number): Object<any> => {
      const seriesAtIndex: string[] = keys(pickBy((d: number): boolean => d === index)(computedSeries.barIndices))
      const width: number = computedSeries.barSeries[seriesAtIndex[0]].barWidth || defaultBarWidth
      forEach((series: string): void => {
        memo[series] = { width, offset }
      })(seriesAtIndex)
      offset = offset + width + config.innerBarPadding
      return memo
    }, {})(indices)
  }

  private computeRange(tickWidth: number): [number, number] {
    const config: ChartConfig = this.state.current.get("config")
    const computed: Computed = this.state.current.get("computed")
    const width: number = tickWidth * this.data.length
    const offset: number = tickWidth / 2
    const margin = (axis: AxisPosition): number =>
      includes(axis)(computed.axes.requiredAxes) ? (computed.axes.margins || {})[axis] || config[axis].margin : 0

    const range: [number, number] =
      this.position[0] === "x"
        ? [0, width || computed.canvas.drawingDims.width]
        : [
            computed.canvas.drawingDims.height || width,
            margin("x2") || (config[this.position] as YAxisConfig).minTopOffsetTopTick,
          ]

    const adjustedRange: [number, number] = [range[0] + offset, range[1] + offset]
    return adjustedRange
  }

  // Drawing
  draw(): void {
    this.el.attr(
      "transform",
      `translate(${axisPosition(this.position, this.state.current.get("computed").canvas.drawingDims).join(",")})`
    )
    this.drawTicks()
    this.drawBorder()
    positionBackgroundRect(this.el, this.state.current.get("config").duration)
  }

  private drawTicks(): void {
    const config: ChartConfig = this.state.current.get("config")
    const attributes: AxisAttributes = this.getAttributes()
    const startAttributes: AxisAttributes = this.getStartAttributes(attributes)

    const ticks: any = this.el
      .selectAll(`text.${styles.tick}.${styles[this.position]}`)
      .data(this.computed.ticks, String)

    ticks
      .enter()
      .append("svg:text")
      .call(setTextAttributes, startAttributes)
      .merge(ticks)
      .attr("class", `${styles.tick} ${styles[this.position]}`)
      .call(setTextAttributes, attributes, config.duration)

    ticks
      .exit()
      .transition()
      .duration(config.duration)
      .call(setTextAttributes, defaults(attributes)({ opacity: 1e-6 }))
      .remove()

    this.adjustMargins()
  }

  // Padding added only to end of each step in d3 ordinal band scale
  private scaleWithOffset(computed: AxisComputed) {
    const barPadding: number = this.state.current.get("config").innerBarPaddingCategorical
    const stepWidth: number = computed.scale.step()
    return (d: string): number => computed.scale(d) - stepWidth * barPadding / 2
  }

  private getAttributes(): AxisAttributes {
    const tickOffset: number = this.state.current.get("config")[this.position].tickOffset
    const scaleWithOffset = this.scaleWithOffset(this.computed)
    return {
      dx: this.isXAxis ? 0 : tickOffset,
      dy: this.isXAxis ? tickOffset : "0.35em",
      text: identity,
      x: this.isXAxis ? scaleWithOffset : 0,
      y: this.isXAxis ? 0 : scaleWithOffset,
    }
  }

  private getStartAttributes(attributes: AxisAttributes): AxisAttributes {
    const scaleWithOffset = this.scaleWithOffset(this.previous)
    return defaults({
      x: this.isXAxis ? scaleWithOffset : 0,
      y: this.isXAxis ? 0 : scaleWithOffset,
    })(attributes)
  }

  private adjustMargins(): void {
    const computedMargins: Object<number> = this.state.current.get("computed").axes.margins || {}
    const config: XAxisConfig | YAxisConfig = this.state.current.get("config")[this.position]
    let requiredMargin: number = computeRequiredMargin(this.el, computedMargins, config, this.position)

    // Add space for flags
    const hasFlags: boolean = includes(this.position)(this.state.current.get("computed").series.axesWithFlags)
    requiredMargin = requiredMargin + (hasFlags ? this.state.current.get("config").axisPaddingForFlags : 0)

    if (computedMargins[this.position] === requiredMargin) {
      return
    }
    computedMargins[this.position] = requiredMargin
    this.stateWriter("margins", computedMargins)
    this.events.emit("margins:update", this.isXAxis)
  }

  private drawBorder(): void {
    const drawingDims: any = this.state.current.get("computed").canvas.drawingDims
    const border: Object<number> = {
      x1: 0,
      x2: this.isXAxis ? drawingDims.width : 0,
      y1: this.isXAxis ? 0 : drawingDims.height,
      y2: 0,
    }
    this.el.select(`line.${styles.border}`).call(setLineAttributes, border)
  }

  close(): void {
    this.el.node().remove()
  }
}

export default CategoricalAxis
