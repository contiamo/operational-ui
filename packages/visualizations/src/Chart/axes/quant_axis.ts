import Events from "../../shared/event_catalog"
import * as d3 from "d3-selection"
import { cloneDeep, defaults, filter, find, forEach, includes, isFinite, last, rangeStep, sortBy } from "lodash/fp"
import {
  computeRequiredMargin,
  insertElements,
  positionBackgroundRect,
  translateAxis,
  getTextAnchor,
} from "./axis_utils"
import { setTextAttributes, setLineAttributes, withD3Element } from "../../utils/d3_utils"
import { computeDomain, computeScale, computeTickNumber, computeTicks } from "../../utils/quant_axis_utils"
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
  QuantAxisOptions,
  State,
  StateWriter,
} from "../typings"

const stepScaleFactors = (step: number): number[] => {
  return step === 1 ? [10, 5, 2, 1] : rangeStep(0.5)(0, 10)
}

class QuantAxis implements AxisClass<number> {
  computed: AxisComputed
  data: number[]
  el: D3Selection
  events: EventBus
  isXAxis: boolean
  position: AxisPosition
  previous: AxisComputed
  state: State
  stateWriter: StateWriter
  type: AxisType = "quant"
  // Options
  start: number
  end: number
  interval: number
  unit: string
  showRules: boolean = true
  showTicks: boolean = true
  fontSize: number
  margin: number
  minTicks: number
  minTopOffsetTopTick: number
  rotateLabels: boolean
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

  // Quant axis only supports finite numbers
  validate(value: any): boolean {
    return isFinite(value)
  }

  private updateOptions(options: QuantAxisOptions): void {
    forEach.convert({ cap: false })(
      (value: any, key: string): void => {
        ;(this as any)[key] = value
      },
    )(options)
  }

  update(options: QuantAxisOptions, data: number[]): void {
    this.updateOptions(options)
    this.data = filter(this.validate)(data)
  }

  // Computations
  compute(): void {
    this.previous = cloneDeep(this.computed)
    const computed = this.computeInitial()
    computed.ticks = computeTicks(computed.steps)
    computed.scale = computeScale(computed.range, computed.ticks)
    this.computed = computed as AxisComputed
    this.previous = defaults(this.computed)(this.previous)
    this.stateWriter(["computed", this.position], this.computed)
    this.stateWriter(["previous", this.position], this.previous)
  }

  computeInitial(): Partial<AxisComputed> {
    const computed: Partial<AxisComputed> = {}
    computed.range = this.computeRange()
    computed.domain = computeDomain(this.data, this.start, this.end)
    computed.steps = this.computeSteps(computed)
    computed.tickFormatter = this.state.current.get("config").numberFormatter
    return computed
  }

  private computeRange(): [number, number] {
    const computed = this.state.current.get("computed")
    const margin = (axis: AxisPosition) =>
      includes(axis)(computed.axes.requiredAxes) ? computed.axes.margins[axis] || 0 : 0
    return this.isXAxis
      ? [0, computed.canvas.drawingDims.width]
      : [computed.canvas.drawingDims.height, margin("x2") || this.minTopOffsetTopTick]
  }

  // Computes nice steps (for ticks) given a domain [start, stop] and a
  // wanted number of ticks (number of ticks returned might differ
  // by a few ticks)
  computeSteps(computed: { [key: string]: any }): [number, number, number] {
    const steps: [number, number, number] = [this.start, this.end, this.interval]
    if (!this.interval) {
      const tickNumber = computeTickNumber(computed.range, this.tickSpacing, this.minTicks)
      const span = computed.domain[1] - computed.domain[0]
      let step = Math.pow(10, Math.floor(Math.log(Math.abs(span) / tickNumber) / Math.LN10)) * (span < 0 ? -1 : 1)

      let scaleFactor: number
      if (this.end) {
        // If a value has been explicitly set for this.end, there must be a tick at this value
        const validScaleFactors: number[] = filter((val: number): boolean => (span / (step * val)) % 1 === 0)(
          stepScaleFactors(step),
        )
        // Choose scale factor which gives a number of ticks as close as possible to tickNumber
        scaleFactor = sortBy((val: number) => Math.abs(span / (val * step) - tickNumber))(validScaleFactors)[0]
      } else {
        const err: number = (tickNumber / span) * step
        const errorMapper: [boolean, number][] = [[err <= 0.15, 10], [err <= 0.35, 5], [err <= 0.75, 2], [true, 1]]
        scaleFactor = find(0)(errorMapper)[1]
      }
      step *= scaleFactor
      steps[2] = step
    }

    let computedStart = this.end % steps[2]
    computedStart = computedStart - (computedStart > computed.domain[0] ? steps[2] : 0)
    steps[0] = this.start || computedStart || Math.floor(computed.domain[0] / steps[2]) * steps[2]
    steps[1] = this.end || Math.ceil((computed.domain[1] - steps[0]) / steps[2]) * steps[2] + steps[0]
    return steps
  }

  computeAligned(computed: Partial<AxisComputed>): void {
    this.previous = cloneDeep(this.computed)
    computed.domain = computed.steps.slice(0, 2) as [number, number]
    computed.scale = computeScale(computed.range, computed.domain)
    computed.ticks = computeTicks(computed.steps)
    this.computed = computed as AxisComputed
    this.previous = defaults(this.computed)(this.previous)
    this.stateWriter(["computed", this.position], this.computed)
    this.stateWriter(["previous", this.position], this.previous)
  }

  // Drawing
  draw(): void {
    translateAxis(this.el, this.position, this.state.current.get("computed").canvas.drawingDims)
    this.drawTicks()
    this.drawLabels()
    this.drawBorder()
    positionBackgroundRect(this.el, this.state.current.get("config").duration)
  }

  private drawTicks(): void {
    const config = this.state.current.get("config")
    const attributes = this.getTickAttributes()

    const ticks = this.el.selectAll(`line.${styles.tick}`).data(this.showTicks ? this.computed.ticks : [], String)

    ticks
      .enter()
      .append("svg:line")
      .call(setLineAttributes, attributes)
      .merge(ticks)
      .attr("class", (d: any) => `${styles.tick} ${d === 0 ? "zero" : ""}`)
      .call(setLineAttributes, attributes, config.duration)

    ticks
      .exit()
      .transition()
      .duration(config.duration / 2)
      .call(setLineAttributes, defaults(attributes)({ opacity: 1e-6 }))
      .remove()
  }

  private drawLabels(): void {
    const config = this.state.current.get("config")
    const attributes = this.getAttributes()
    const startAttributes = this.getStartAttributes(attributes)

    const labels = this.el.selectAll(`text.${styles.label}`).data(this.computed.ticks, String)

    labels
      .enter()
      .append("svg:text")
      .call(setTextAttributes, startAttributes)
      .merge(labels)
      .attr("class", styles.label)
      .style("font-size", `${this.fontSize}px`)
      .call(setTextAttributes, attributes, config.duration)

    labels
      .exit()
      .transition()
      .duration(config.duration / 2)
      .call(setTextAttributes, defaults(attributes)({ opacity: 1e-6 }))
      .remove()

    this.adjustMargins()
  }

  private adjustMargins(): void {
    let requiredMargin = computeRequiredMargin(this.el, this.margin, this.outerPadding, this.position)

    // Add space for flags
    const flagAxis = this.state.current.get(["computed", "series", "axesWithFlags", this.position])
    requiredMargin = requiredMargin + (flagAxis ? flagAxis.axisPadding : 0)

    const computedMargins = this.state.current.get("computed").axes.margins || {}
    if (computedMargins[this.position] === requiredMargin) {
      return
    }
    computedMargins[this.position] = requiredMargin
    this.stateWriter("margins", computedMargins)
    this.events.emit("margins:update", this.isXAxis)
    translateAxis(this.el, this.position, this.state.current.get("computed").canvas.drawingDims)
  }

  private tickFormatter(): (x: number) => string {
    const numberFormatter = this.state.current.get("config").numberFormatter
    const unitTick = this.isXAxis ? this.computed.ticks[0] : last(this.computed.ticks)
    return (x: number): string => (x === unitTick && this.unit ? this.unit : numberFormatter(x))
  }

  private getAttributes(): AxisAttributes {
    let attrs: any = {
      x: this.isXAxis ? this.computed.scale : (d: number) => 0,
      y: this.isXAxis ? (d: number) => 0 : this.computed.scale,
      dx: this.isXAxis ? 0 : this.tickOffset,
      dy: this.isXAxis ? this.tickOffset + (this.position === "x1" ? this.fontSize : 0) : Math.abs(this.tickOffset / 2),
      text: this.tickFormatter(),
      textAnchor: getTextAnchor(this.position, this.rotateLabels),
    }
    attrs.transform = this.rotateLabels ? (d: number) => `rotate(-45, ${attrs.x(d) + attrs.dx}, ${attrs.y(d)})` : ""
    return attrs
  }

  private getStartAttributes(attributes: AxisAttributes): AxisAttributes {
    return defaults(attributes)({
      x: this.isXAxis ? this.previous.scale : 0,
      y: this.isXAxis ? 0 : this.previous.scale,
    })
  }

  private getTickAttributes() {
    return {
      x1: this.isXAxis ? this.computed.scale : 0,
      x2: this.isXAxis ? this.computed.scale : this.tickOffset * 0.6,
      y1: this.isXAxis ? 0 : this.computed.scale,
      y2: this.isXAxis ? this.tickOffset * 0.6 : this.computed.scale,
    }
  }

  private drawBorder(): void {
    const drawingDims = this.state.current.get("computed").canvas.drawingDims
    const border = {
      x1: 0,
      x2: this.isXAxis ? drawingDims.width : 0,
      y1: this.isXAxis ? 0 : drawingDims.height,
      y2: 0,
    }
    this.el.select(`line.${styles.border}`).call(setLineAttributes, border)
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

export default QuantAxis
