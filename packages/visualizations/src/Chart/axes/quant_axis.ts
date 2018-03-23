import { defaults, filter, flow, forEach, identity, includes, isFinite, last, sortBy } from "lodash/fp"
import { axisPosition, insertElements, positionBackgroundRect } from "./axis_utils"
import { setTextAttributes, setLineAttributes } from "../../utils/d3_utils"
import { computeDomain, computeScale, computeSteps, computeTicks } from "../../utils/quant_axis_utils"
import * as styles from "./styles"

import {
  AxisClass,
  AxisOptions,
  AxisPosition,
  ChartConfig,
  Computed,
  D3Selection,
  EventBus,
  Object,
  State,
  StateWriter,
  XAxisConfig,
  YAxisConfig
} from "../typings"

class QuantAxis implements AxisClass<number> {
  computed: any // @TODO typing
  data: number[]
  end: number
  el: D3Selection
  events: EventBus
  expand: "smart" | "zero" | "custom" = "smart"
  interval: number // @TODO should the use be allowed to define the interval?
  isXAxis: boolean
  position: AxisPosition
  previous: any // @TODO typing
  start: number
  state: State
  stateWriter: StateWriter
  type: "time" | "quant" | "categorical" = "quant"
  unit: string

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection, position: AxisPosition) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.position = position
    this.isXAxis = position[0] === "x"
    this.el = insertElements(el, position, this.state.current.get("computed").canvas.drawingDims)
    // this.el.on("mouseenter", this.onComponentHover(this))
  }

  // Quant axis only supports finite numbers
  validate(value: any): boolean {
    return isFinite(value)
  }

  updateOptions(options: AxisOptions): void {
    forEach.convert({ cap: false })((option: any, key: string): void => {
      ;(this as any)[key] = option
    })(options)
  }

  update(options: AxisOptions, data: number[]): void {
    this.updateOptions(options)
    this.data = flow(filter(this.validate), sortBy(identity))(data)
  }

  draw(): void {
    this.compute()
    this.drawTicks()
    this.drawBorder()
    positionBackgroundRect(this.el, this.state.current.get("config").duration)
  }

  // Computations
  compute(): void {
    this.previous = this.computed
    const computed: Object<any> = this.computeInitial()
    computed.ticks = computeTicks(computed.steps)
    computed.scale = computeScale(computed.range, computed.ticks)
    this.computed = computed
  }

  computeRange(): [number, number] {
    const config: ChartConfig = this.state.current.get("config")
    const computed: Computed = this.state.current.get("computed")
    const margin = (axis: AxisPosition): number =>
      includes(axis)(computed.axes.requiredAxes) ? config[axis].margin : 0
    return this.isXAxis
      ? [margin("y1"), computed.canvas.drawingContainerDims.width - margin("y2")]
      : [
          computed.canvas.drawingContainerDims.height - margin("x1"),
          margin("x2") || (config[this.position] as YAxisConfig).minTopOffsetTopTick
        ]
  }

  // @TODO typing
  computeInitial(): Object<any> {
    const options: XAxisConfig | YAxisConfig = this.state.current.get("config")[this.position]
    const computed: Object<any> = {}
    computed.range = this.computeRange()
    computed.domain = computeDomain(this.data, this.start, this.end, this.expand)
    computed.steps = computeSteps(computed.domain, computed.range, options.tickSpacing, options.minTicks)
    return computed
  }

  computeAligned(computed: Object<any>): void {
    this.previous = this.computed
    computed.domain = computed.steps.slice(0, 2)
    computed.scale = computeScale(computed.range, computed.domain)
    computed.ticks = computeTicks(computed.steps)
    // computed.baseline = this.computeBaseline(computed.domain, computed.scale)
    this.computed = computed
    // this.previous = defaults(this.previous, this.computed)
  }

  // Ticks
  drawTicks(): void {
    const config: ChartConfig = this.state.current.get("config")
    const attributes: any = this.getAttributes()
    const startAttributes: any = this.getStartAttributes(attributes)

    const ticks: any = this.el
      .selectAll(`text.${styles.tick}`)
      // @TODO add tick mapper
      .data(this.computed.ticks)

    ticks
      .enter()
      .append("svg:text")
      .call(setTextAttributes, startAttributes)
      .merge(ticks)
      .attr("class", styles.tick)
      // @TODO only for time axis
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
    console.log(requiredMargin)
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

  tickFormatter(): (x: number) => string {
    const numberFormatter: (x: number) => string = this.state.current.get("config").numberFormatter
    const unitTick: number = this.isXAxis ? this.computed.ticks[0] : last(this.computed.ticks)
    return (x: number): string => (x === unitTick && this.unit ? this.unit : numberFormatter(x))
  }

  getAttributes(): any {
    const tickOffset: number = this.state.current.get("config")[this.position].tickOffset
    return {
      dx: this.isXAxis ? 0 : tickOffset,
      dy: this.isXAxis ? tickOffset : "-0.4em",
      text: this.tickFormatter(),
      textAnchor: this.isXAxis ? "middle" : this.position === "y1" ? "end" : "start", // @TODO can this be moved to css?
      x: this.isXAxis ? this.computed.scale : 0,
      y: this.isXAxis ? 0 : this.computed.scale
    }
  }

  getStartAttributes(attributes: any): any {
    return defaults({
      x: this.isXAxis ? this.previous.scale : 0,
      y: this.isXAxis ? 0 : this.previous.scale
    })(attributes)
  }

  // Border
  drawBorder(): void {
    const border: Object<number> = {
      x1: 0,
      x2: this.isXAxis ? this.computed.range[1] : 0,
      y1: this.isXAxis ? 0 : this.computed.range[0],
      y2: 0
    }
    this.el.select(`line.${styles.border}`).call(setLineAttributes, border)
  }

  remove(): void {}
}

export default QuantAxis
