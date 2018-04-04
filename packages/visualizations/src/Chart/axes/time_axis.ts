import {
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
  values
} from "lodash/fp"
import { axisPosition, computeRequiredMargin, insertElements, positionBackgroundRect } from "./axis_utils"
import { setTextAttributes, setLineAttributes } from "../../utils/d3_utils"
import * as Moment from "moment"
import { extendMoment } from "moment-range"
const moment: any = extendMoment(Moment)
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
  Computed,
  D3Selection,
  EventBus,
  Object,
  Partial,
  State,
  StateWriter,
  TimeIntervals,
  XAxisConfig,
  YAxisConfig
} from "../typings"

// @TODO - add in more options
// Have removed "now", and any formatting to account for change in month/year
const tickFormatter = (interval: TimeIntervals) => {
  switch (interval) {
    case "hours":
      return timeFormat("%b %d %H:00")
    case "days":
      return timeFormat("%b %d")
    case "weeks":
      return timeFormat("W%W")
    case "months":
      return timeFormat("%b %y")
    case "quarters":
      return (d: Date): string => timeFormat(`Q${Math.floor((d.getMonth() + 3) / 3)} %Y`)(d)
    case "years":
      return timeFormat("%Y")
    default:
      throw new Error(`Interval of length ${interval} is not supported.`)
  }
}

class TimeAxis implements AxisClass<Date> {
  computed: AxisComputed
  data: Date[]
  el: D3Selection
  end: Date
  events: EventBus
  interval: TimeIntervals
  isXAxis: boolean
  position: AxisPosition
  previous: AxisComputed
  start: Date
  state: State
  stateWriter: StateWriter
  type: AxisType = "time"

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection, position: AxisPosition) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.position = position
    this.isXAxis = position[0] === "x"
    this.el = insertElements(el, position, this.state.current.get("computed").canvas.drawingDims)
    // this.el.on("mouseenter", this.onComponentHover(this))  }
  }

  validate(value: any): boolean {
    return isDate(value)
  }

  private updateOptions(options: TimeAxisOptions): void {
    this.start = options.start
    this.end = options.end
    this.interval = options.interval
    if (!this.start || !this.end || !this.interval) {
      throw new Error("Values for `start`, `end` and `interval` must always be configured for time axes.")
    }
  }

  update(options: TimeAxisOptions, data: Date[]): void {
    this.updateOptions(options)
    this.data = flow(filter(this.validate), sortBy((value: any): number => value.valueOf()))(data)
  }

  // Computations
  compute(): void {
    this.previous = this.computed
    const computed: Partial<AxisComputed> = this.computeInitial()
    computed.tickNumber = this.computeTickNumber(computed.ticksInDomain, computed.range)
    computed.scale = this.computeScale(computed.range, computed.ticksInDomain)
    computed.ticks = this.computeTicks(computed)
    this.computed = computed as AxisComputed
    this.previous = defaults(this.previous)(this.computed)
    this.stateWriter(["computed", this.position], this.computed)
    this.stateWriter(["previous", this.position], this.previous)
  }

  computeInitial(): Object<any> {
    const ticksInDomain: any[] = Array.from(moment.range(this.start, this.end).by(this.interval))
    const computed: Partial<AxisComputed> = {}
    computed.ticksInDomain = map((d: any) => d.toDate())(ticksInDomain)
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
    const defaultTickWidth: number =
      this.position[0] === "x" ? drawingDims.width / ticksInDomain.length : drawingDims.height / ticksInDomain.length

    const stacks = groupBy("stackIndex")(barSeries)
    const partitionedStacks: Object<any>[][] = partition((stack: any): boolean => {
      return compact(map(get("barWidth"))(stack)).length > 0
    })(stacks)
    const fixedWidthStacks: Object<any>[] = partitionedStacks[0]
    const variableWidthStacks: Object<any>[] = partitionedStacks[1]

    let requiredTickWidth: number = reduce((sum: number, stack: Object<any>): number => {
      return sum + stack[0].barWidth
    }, config.outerBarPadding)(fixedWidthStacks)

    const variableBarWidth: number =
      variableWidthStacks.length > 0
        ? Math.max(config.minBarWidth, (defaultTickWidth - requiredTickWidth) / variableWidthStacks.length)
        : 0
    requiredTickWidth = requiredTickWidth + variableBarWidth * variableWidthStacks.length

    this.stateWriter("computedBars", this.computeBars(variableBarWidth, requiredTickWidth))
    return Math.max(requiredTickWidth, defaultTickWidth)
  }

  private computeBars(defaultBarWidth: number, tickWidth: number): Object<number> {
    const config: ChartConfig = this.state.current.get("config")
    const computedSeries: Object<any> = this.state.current.get("computed").series
    const indices = sortBy(identity)(uniq(values(computedSeries.barIndices)))
    let offset: number = -tickWidth / 2 + config.outerBarPadding / 2

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

  private computeRange(tickWidth: number, numberOfTicks: number): [number, number] {
    const config: ChartConfig = this.state.current.get("config")
    const computedAxes: Object<any> = this.state.current.get("computed").axes
    const width: number = tickWidth * numberOfTicks
    const offset: number = tickWidth / 2
    const margin = (axis: AxisPosition): number =>
      includes(axis)(computedAxes.requiredAxes) ? (computedAxes.margins || {})[axis] || config[axis].margin : 0
    return this.position[0] === "x"
      ? [offset, width - offset]
      : [width - offset, offset + (margin("x2") || (config[this.position] as YAxisConfig).minTopOffsetTopTick)]
  }

  private computeTickNumber(ticksInDomain: Date[], range: [number, number]): number {
    const width: number = Math.abs(range[1] - range[0])
    const axisOptions: XAxisConfig | YAxisConfig = this.state.current.get("config")[this.position]
    return Math.min(ticksInDomain.length, Math.max(Math.floor(width / axisOptions.tickSpacing), axisOptions.minTicks))
  }

  private computeScale(range: [number, number], ticks: Date[]): any {
    return scaleTime()
      .range(range)
      .domain([ticks[0], last(ticks)])
  }

  private computeTicks(computed: Partial<AxisComputed>): Date[] {
    if (this.interval === "weeks") {
      const tickInterval: number = Math.ceil(computed.ticksInDomain.length / computed.tickNumber || 1)
      return computed.scale.ticks(timeMonday, tickInterval)
    }
    return computed.scale.ticks(computed.tickNumber || 1)
  }

  computeAligned(computed: Partial<AxisComputed>): void {
    this.previous = this.computed
    computed.tickNumber = this.computeTickNumber(computed.ticksInDomain, computed.range)
    computed.scale = this.computeScale(computed.range, computed.ticksInDomain)
    computed.ticks = this.computeTicks(computed)
    this.computed = computed as AxisComputed
    this.previous = defaults(this.previous)(this.computed)
    this.stateWriter(["computed", this.position], this.computed)
    this.stateWriter(["previous", this.position], this.previous)
  }

  // Drawing
  draw(): void {
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
      .call(setTextAttributes, attributes, config.duration)

    ticks
      .exit()
      .transition()
      .duration(config.duration)
      .call(setTextAttributes, defaults({ opacity: 1e6 })(attributes))
      .remove()

    this.adjustMargins()
  }

  private adjustMargins(): void {
    const computedMargins: Object<number> = this.state.current.get("computed").axes.margins || {}
    const config: XAxisConfig | YAxisConfig = this.state.current.get("config")[this.position]
    const requiredMargin: number = computeRequiredMargin(this.el, computedMargins, config, this.position)
    if (computedMargins[this.position] === requiredMargin) {
      return
    }
    computedMargins[this.position] = requiredMargin
    this.stateWriter("margins", computedMargins)
    this.events.emit("margins:update")
    this.el.attr(
      "transform",
      `translate(${axisPosition(this.position, this.state.current.get("computed").canvas.drawingDims).join(",")})`
    )
  }

  private getAttributes(): AxisAttributes {
    const tickOffset: number = this.state.current.get("config")[this.position].tickOffset
    return {
      dx: this.isXAxis ? 0 : tickOffset,
      dy: this.isXAxis ? tickOffset : "-0.4em",
      text: tickFormatter(this.interval),
      x: this.isXAxis ? this.computed.scale : 0,
      y: this.isXAxis ? 0 : this.computed.scale
    }
  }

  private getStartAttributes(attributes: AxisAttributes): AxisAttributes {
    return defaults({
      x: this.isXAxis ? this.previous.scale : 0,
      y: this.isXAxis ? 0 : this.previous.scale
    })(attributes)
  }

  private drawBorder(): void {
    const drawingDims: any = this.state.current.get("computed").canvas.drawingDims
    const border: Object<number> = {
      x1: 0,
      x2: this.isXAxis ? drawingDims.width : 0,
      y1: this.isXAxis ? 0 : drawingDims.height,
      y2: 0
    }
    this.el.select(`line.${styles.border}`).call(setLineAttributes, border)
  }

  remove(): void {}
}

export default TimeAxis
