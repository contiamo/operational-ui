import { defaults, filter, flow, forEach, includes, isDate, last, map, omit, sortBy } from "lodash/fp"
import { axisPosition, insertElements, positionBackgroundRect } from "./axis_utils"
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
  XAxisConfig,
  YAxisConfig
} from "../typings"

// @TODO - add in more options?
// Have removed "now", and any formatting to account for change in month/year
const tickFormatter = (interval: "hours" | "days" | "weeks" | "months" | "quarters" | "years") => {
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
  computed: any // @TODO typing
  data: Date[]
  el: D3Selection
  end: Date
  events: EventBus
  interval: "hours" | "days" | "weeks" | "months" | "quarters" | "years"
  isXAxis: boolean
  position: AxisPosition
  previous: any // @TODO typing
  start: Date
  state: State
  stateWriter: StateWriter
  type: "time" | "quant" | "categorical" = "time"

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

  updateOptions(options: TimeAxisOptions): void {
    this.start = options.start
    this.end = options.end
    this.interval = options.interval
  }

  update(options: TimeAxisOptions, data: Date[]): void {
    this.updateOptions(options)
    // @TODO validation here does nothing - needs to be validated on render, surely?
    this.data = flow(filter(this.validate), sortBy((value: any): number => value.valueOf()))(data)
  }

  draw(): void {
    this.drawTicks()
    this.drawBorder()
    positionBackgroundRect(this.el, this.state.current.get("config").duration)
  }

  compute(): void {
    this.previous = this.computed
    const computed: Object<any> = this.computeInitial()
    computed.tickNumber = this.computeTickNumber(computed.ticksInDomain, computed.range)
    computed.scale = scaleTime()
      .range(computed.range)
      .domain([computed.ticksInDomain[0], last(computed.ticksInDomain)])
    computed.ticks = this.computeTicks(computed)
    this.computed = computed
    this.previous = defaults(this.previous)(this.computed)
  }

  computeRange(): [number, number] {
    const config: ChartConfig = this.state.current.get("config")
    const computed: Computed = this.state.current.get("computed")
    const computedAxes: Object<number> = computed.axes.margins || {}
    const margin = (axis: AxisPosition): number =>
      includes(axis)(computed.axes.requiredAxes) ? computedAxes[axis] || config[axis].margin : 0
    return this.isXAxis
      ? [0, computed.canvas.drawingDims.width]
      : [computed.canvas.drawingDims.height, margin("x2") || (config[this.position] as YAxisConfig).minTopOffsetTopTick]
  }

  computeInitial(): Object<any> {
    const options: XAxisConfig | YAxisConfig = this.state.current.get("config")[this.position]
    const computed: Partial<AxisComputed> = {}
    computed.range = this.computeRange()
    computed.ticksInDomain = map((d: any) => d.toDate())(
      Array.from(moment.range(this.start, this.end).by(this.interval))
    )
    return computed
  }

  computeTickNumber(ticksInDomain: Date[], range: [number, number]): number {
    const width: number = Math.abs(range[1] - range[0])
    const axisOptions: XAxisConfig | YAxisConfig = this.state.current.get("config")[this.position]
    return Math.min(ticksInDomain.length, Math.max(Math.floor(width / axisOptions.tickSpacing), axisOptions.minTicks))
  }

  computeTicks(computed: Partial<AxisComputed>): Date[] {
    if (this.interval === "weeks") {
      const tickInterval: number = Math.ceil(computed.ticksInDomain.length / computed.tickNumber || 1)
      return computed.scale.ticks(timeMonday, tickInterval)
    }
    return computed.scale.ticks(computed.tickNumber || 1)
  }

  computeAligned(computed: Object<any>): void {
    this.previous = this.computed
    computed.tickNumber = this.computeTickNumber(computed.ticksInDomain, computed.range)
    computed.scale = scaleTime()
      .range(computed.range)
      .domain([computed.ticksInDomain[0], last(computed.ticksInDomain)])
    computed.ticks = this.computeTicks(computed)
    this.computed = computed
    this.previous = defaults(this.previous)(this.computed)
  }

  drawTicks(): void {
    const config: ChartConfig = this.state.current.get("config")
    const attributes: AxisAttributes = this.getAttributes()
    const startAttributes: AxisAttributes = this.getStartAttributes(attributes)
    const ticks: any = this.el
      .selectAll(`text.${styles.tick}.${styles[this.position]}`)
      // @TODO add tick mapper
      .data(this.computed.ticks)

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

  adjustMargins(): void {
    const computedMargins: Object<number> = this.state.current.get("computed").axes.margins || {}
    const config: XAxisConfig | YAxisConfig = this.state.current.get("config")[this.position]
    let requiredMargin: number = config.margin

    // @TODO Adjust for flags

    // Adjust for ticks
    if (this.isXAxis) {
      return
    }
    const axisWidth: number = this.el.node().getBBox().width
    requiredMargin = Math.max(requiredMargin, Math.ceil(axisWidth) + config.outerPadding)
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

  getAttributes(): AxisAttributes {
    const tickOffset: number = this.state.current.get("config")[this.position].tickOffset
    return {
      dx: this.isXAxis ? 0 : tickOffset,
      dy: this.isXAxis ? tickOffset : "-0.4em",
      text: tickFormatter(this.interval),
      x: this.isXAxis ? this.computed.scale : 0,
      y: this.isXAxis ? 0 : this.computed.scale
    }
  }

  getStartAttributes(attributes: AxisAttributes): AxisAttributes {
    return defaults({
      x: this.isXAxis ? this.previous.scale : 0,
      y: this.isXAxis ? 0 : this.previous.scale
    })(attributes)
  }

  drawBorder(): void {
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
