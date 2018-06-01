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
  mapValues,
  partition,
  pickBy,
  reduce,
  sortBy,
  uniq,
  uniqueId,
  values,
} from "lodash/fp"
import { computeRequiredMargin, insertElements, positionBackgroundRect, translateAxis } from "./axis_utils"
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
  TimeAxisOptions,
  AxisPosition,
  ChartConfig,
  ComponentConfigInfo,
  Computed,
  D3Selection,
  EventBus,
  Object,
  Partial,
  State,
  StateWriter,
  TimeIntervals,
  XAxisConfig,
  YAxisConfig,
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

class TimeAxis implements AxisClass<Date> {
  computed: AxisComputed
  data: Date[]
  el: D3Selection
  events: EventBus
  isXAxis: boolean
  position: AxisPosition
  previous: AxisComputed
  state: State
  stateWriter: StateWriter
  type: AxisType = "time"
  // Options
  start: Date
  end: Date
  interval: TimeIntervals
  showRules: boolean = false
  fontSize: number
  margin: number
  minTicks: number
  minTopOffsetTopTick: number
  tickOffset: number
  tickSpacing: number
  outerPadding: number

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

  private updateOptions(options: TimeAxisOptions): void {
    forEach.convert({ cap: false })((value: any, key: string): void => {
      ;(this as any)[key] = value
    })(options)
    if (!this.start || !this.end || !this.interval) {
      throw new Error("Values for `start`, `end` and `interval` must always be configured for time axes.")
    }
    this.adjustMargins()
  }

  update(options: TimeAxisOptions, data: Date[]): void {
    this.updateOptions(options)
    this.data = flow(filter(this.validate), sortBy((value: any): number => value.valueOf()))(data)
  }

  // Computations
  compute(): void {
    this.previous = cloneDeep(this.computed)
    const computed: Partial<AxisComputed> = this.computeInitial()
    computed.tickNumber = this.computeTickNumber(computed.ticksInDomain, computed.range)
    computed.scale = this.computeScale(computed.range, computed.ticksInDomain)
    computed.ticks = this.computeTicks(computed)
    this.computed = computed as AxisComputed
    this.previous = defaults(this.computed)(this.previous)
    this.stateWriter(["computed", this.position], this.computed)
    this.stateWriter(["previous", this.position], this.previous)
  }

  computeInitial(): Object<any> {
    const negativeRange: boolean = new Date(this.start).valueOf() > new Date(this.end).valueOf()
    const start = negativeRange ? this.end : this.start
    const end = negativeRange ? this.start : this.end
    const ticksInDomain: any[] = Array.from(moment.range(start, end).by(this.interval))
    const computed: Partial<AxisComputed> = {}
    computed.tickFormatter = tickFormatter(this.interval)
    computed.ticksInDomain = map((d: any) => d.toDate())(negativeRange ? ticksInDomain.reverse() : ticksInDomain)
    computed.tickWidth = this.computeTickWidth(computed.ticksInDomain)
    computed.range = this.computeRange(computed.tickWidth, computed.ticksInDomain.length)
    return computed
  }

  private computeTickWidth(ticksInDomain: Date[]): number {
    const barSeries = this.state.current.get("computed").series.barSeries
    if (isEmpty(barSeries)) {
      return 0
    }

    const config: ChartConfig = this.state.current.get("config")
    const drawingDims: Object<number> = this.state.current.get("computed").canvas.drawingDims
    const defaultTickWidth: number = Math.min(drawingDims[this.isXAxis ? "width" : "height"] / ticksInDomain.length)

    const stacks = groupBy((s: Object<any>) => s.stackIndex || uniqueId("stackIndex"))(barSeries)
    const partitionedStacks: Object<any>[][] = partition((stack: any): boolean => {
      return compact(map(get("barWidth"))(stack)).length > 0
    })(stacks)
    const fixedWidthStacks: Object<any>[] = partitionedStacks[0]
    const variableWidthStacks: Object<any>[] = partitionedStacks[1]

    let requiredTickWidth: number = reduce((sum: number, stack: Object<any>): number => {
      return sum + stack[0].barWidth
    }, config.outerBarSpacing)(fixedWidthStacks)

    const variableBarWidth: number =
      variableWidthStacks.length > 0
        ? Math.min(
            Math.max(config.minBarWidth, (defaultTickWidth - requiredTickWidth) / variableWidthStacks.length),
            config.maxBarWidthRatio * drawingDims[this.isXAxis ? "width" : "height"]
          )
        : 0
    requiredTickWidth = requiredTickWidth + variableBarWidth * variableWidthStacks.length

    this.stateWriter("computedBars", this.computeBars(variableBarWidth, requiredTickWidth))
    return Math.max(requiredTickWidth, defaultTickWidth)
  }

  private computeBars(defaultBarWidth: number, tickWidth: number): Object<number> {
    const config: ChartConfig = this.state.current.get("config")
    const computedSeries: Object<any> = this.state.current.get("computed").series
    const indices = sortBy(identity)(uniq(values(computedSeries.barIndices)))
    let offset: number = -tickWidth / 2 + config.outerBarSpacing / 2

    return reduce((memo: Object<any>, index: number): Object<any> => {
      const seriesAtIndex: string[] = keys(pickBy((d: number): boolean => d === index)(computedSeries.barIndices))
      const width: number = computedSeries.barSeries[seriesAtIndex[0]].barWidth || defaultBarWidth
      forEach((series: string): void => {
        memo[series] = { width, offset }
      })(seriesAtIndex)
      offset = offset + width + config.innerBarSpacing
      return memo
    }, {})(indices)
  }

  private computeRange(tickWidth: number, numberOfTicks: number): [number, number] {
    return this.isXAxis ? this.computeXRange(tickWidth, numberOfTicks) : this.computeYRange(tickWidth, numberOfTicks)
  }

  private computeXRange(tickWidth: number, numberOfTicks: number): [number, number] {
    const drawingDims = this.state.current.get("computed").canvas.drawingDims
    const width: number = tickWidth * numberOfTicks
    const offset: number = tickWidth / 2
    return [offset, (width || drawingDims.width) - offset]
  }

  private computeYRange(tickWidth: number, numberOfTicks: number): [number, number] {
    const computed: Computed = this.state.current.get("computed")
    const margin = (axis: AxisPosition): number => {
      const isRequired: boolean = includes(axis)(computed.axes.requiredAxes)
      return isRequired ? (computed.axes.margins || {})[axis] || 0 : 0
    }
    const drawingDims = computed.canvas.drawingDims
    const width: number = tickWidth * numberOfTicks
    const offset: number = tickWidth / 2
    return [(drawingDims.height || width) - offset, offset + (margin("x2") || this.minTopOffsetTopTick)]
  }

  private computeTickNumber(ticksInDomain: Date[], range: [number, number]): number {
    const width: number = Math.abs(range[1] - range[0])
    return Math.min(ticksInDomain.length, Math.max(Math.floor(width / this.tickSpacing), this.minTicks))
  }

  private computeScale(range: [number, number], ticks: Date[]): any {
    return scaleTime()
      .range(range)
      .domain([ticks[0], last(ticks)])
  }

  private computeTicks(computed: Partial<AxisComputed>): Date[] {
    if (this.interval === "week") {
      const tickInterval: number = Math.ceil(computed.ticksInDomain.length / computed.tickNumber || 1)
      return computed.scale.ticks(timeMonday, tickInterval)
    }
    const ticks: Date[] = computed.scale.ticks(computed.tickNumber || 1)
    return ticks.length > computed.ticksInDomain.length ? computed.ticksInDomain : ticks
  }

  computeAligned(computed: Partial<AxisComputed>): void {
    this.previous = cloneDeep(this.computed)
    computed.tickNumber = this.computeTickNumber(computed.ticksInDomain, computed.range)
    computed.scale = this.computeScale(computed.range, computed.ticksInDomain)
    computed.ticks = this.computeTicks(computed)
    this.computed = computed as AxisComputed
    this.previous = defaults(this.computed)(this.previous)
    this.stateWriter(["computed", this.position], this.computed)
    this.stateWriter(["previous", this.position], this.previous)
  }

  // Drawing
  draw(): void {
    translateAxis(this.el, this.position, this.state.current.get("computed").canvas.drawingDims)
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
      // @TODO
      // .attr("class", (d: string | number, i: number): string => "tick " + this.tickClass(d, i))
      .style("font-size", `${this.fontSize}px`)
      .call(setTextAttributes, attributes, config.duration)

    ticks
      .exit()
      .transition()
      .duration(config.duration / 2)
      .call(setTextAttributes, defaults({ opacity: 1e-6 })(attributes))
      .remove()

    this.adjustMargins()
  }

  private adjustMargins(): void {
    let requiredMargin: number = computeRequiredMargin(this.el, this.margin, this.outerPadding, this.position)

    // Add space for flags
    const flagAxis: Object<any> = this.state.current.get(["computed", "series", "axesWithFlags", this.position])
    requiredMargin = requiredMargin + (flagAxis ? flagAxis.axisPadding : 0)

    const computedMargins: Object<number> = this.state.current.get("computed").axes.margins || {}
    if (computedMargins[this.position] === requiredMargin) {
      return
    }
    computedMargins[this.position] = requiredMargin
    this.stateWriter("margins", computedMargins)
    this.events.emit("margins:update", this.isXAxis)
    translateAxis(this.el, this.position, this.state.current.get("computed").canvas.drawingDims)
  }

  private getAttributes(): AxisAttributes {
    return {
      dx: this.isXAxis ? 0 : this.tickOffset,
      dy: this.isXAxis ? this.tickOffset + (this.position === "x1" ? this.fontSize : 0) : "-0.4em",
      text: this.computed.tickFormatter,
      x: this.isXAxis ? this.computed.scale : 0,
      y: this.isXAxis ? 0 : this.computed.scale,
    }
  }

  private getStartAttributes(attributes: AxisAttributes): AxisAttributes {
    return defaults(attributes)({
      x: this.isXAxis ? this.previous.scale : 0,
      y: this.isXAxis ? 0 : this.previous.scale,
    })
  }

  private drawBorder(): void {
    const drawingDims = this.state.current.get("computed").canvas.drawingDims
    const border: Object<number> = {
      x1: 0,
      x2: this.isXAxis ? drawingDims.width : 0,
      y1: this.isXAxis ? 0 : drawingDims.height,
      y2: 0,
    }
    this.el.select(`line.${styles.border}`).call(setLineAttributes, border)
  }

  private onComponentHover(): void {
    this.events.emit(Events.FOCUS.COMPONENT.HOVER, { component: this.el, options: this.hoverInfo() })
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
