import Events from "../../shared/event_catalog"
import { cloneDeep, defaults, filter, find, includes, isFinite, last, rangeStep, sortBy } from "lodash/fp"
import { setTextAttributes, setLineAttributes } from "../../utils/d3_utils"
import { computeDomain, computeScale, computeTickNumber, computeTicks } from "../../utils/quant_axis_utils"
import * as styles from "./styles"

import {
  computeRequiredMargin,
  insertElements,
  positionBackgroundRect,
  translateAxis,
  getTextAnchor,
  drawTitle,
} from "./axis_utils"

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

const defaultOptions: Partial<QuantAxisOptions> = {
  showRules: true,
  showTicks: true,
}

class QuantAxis implements AxisClass<number> {
  computed: AxisComputed
  data: number[]
  el: D3Selection
  events: EventBus
  isXAxis: boolean
  options: QuantAxisOptions
  position: AxisPosition
  previous: AxisComputed
  state: State
  stateWriter: StateWriter
  type: AxisType = "quant"

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

  update(options: Partial<QuantAxisOptions>, data: number[]): void {
    this.options = defaults(defaultOptions)(options)
    this.data = filter(this.validate)(data)
  }

  // Computations
  compute(): void {
    this.previous = cloneDeep(this.computed)
    const computed = this.computeInitial()
    computed.labelTicks = computeTicks(computed.labelSteps)
    computed.ruleTicks = this.computeRuleTicks(computed.ruleSteps)
    computed.ticks = computeTicks(computed.tickSteps)
    computed.scale = computeScale(computed.range, computed.labelTicks)
    this.computed = computed as AxisComputed
    this.previous = defaults(this.computed)(this.previous)
    this.stateWriter(["computed", this.position], this.computed)
    this.stateWriter(["previous", this.position], this.previous)
  }

  computeInitial(): Partial<AxisComputed> {
    const computed: Partial<AxisComputed> = {}
    computed.range = this.computeRange()
    computed.domain = computeDomain(this.data, this.options.start, this.options.end)
    computed.tickSteps = this.computeTickSteps(computed)
    computed.ruleSteps = this.computeRuleSteps(computed)
    computed.labelSteps = this.computeLabelSteps(computed)
    computed.tickFormatter = this.state.current.get("config").numberFormatter
    return computed
  }

  private computeRange(): [number, number] {
    const computed = this.state.current.get("computed")
    const margin = (axis: AxisPosition) =>
      includes(axis)(computed.axes.requiredAxes) ? computed.axes.margins[axis] || 0 : 0
    return this.isXAxis
      ? [0, computed.canvas.drawingDims.width]
      : [
          computed.canvas.drawingDims.height,
          includes("x2")(computed.axes.requiredAxes) ? 0 : this.options.minTopOffsetTopTick,
        ]
  }

  // Computes nice steps (for ticks) given a domain [start, stop] and a
  // wanted number of ticks (number of ticks returned might differ
  // by a few ticks)
  computeInterval(computed: any): number {
    const tickNumber = computeTickNumber(computed.range, this.options.tickSpacing, this.options.minTicks)
    const span = computed.domain[1] - computed.domain[0]
    let step = Math.pow(10, Math.floor(Math.log(Math.abs(span) / tickNumber) / Math.LN10)) * (span < 0 ? -1 : 1)

    let scaleFactor: number
    if (this.options.end) {
      // If a value has been explicitly set for this.end, there must be a tick at this value
      const validScaleFactors = filter((val: number) => (span / (step * val)) % 1 === 0)(stepScaleFactors(step))
      // Choose scale factor which gives a number of ticks as close as possible to tickNumber
      scaleFactor = sortBy((val: number) => Math.abs(span / (val * step) - tickNumber))(validScaleFactors)[0]
    } else {
      const err = (tickNumber / span) * step
      const errorMapper = [[err <= 0.15, 10], [err <= 0.35, 5], [err <= 0.75, 2], [true, 1]]
      scaleFactor = find(0)(errorMapper)[1]
    }
    step *= scaleFactor
    return step
  }

  computeTickSteps(computed: any): [number, number, number] {
    const defaultInterval = this.options.interval || this.computeInterval(computed)
    const interval = this.options.tickInterval ? Math.min(this.options.tickInterval, defaultInterval) : defaultInterval

    return this.computeSteps(computed, interval)
  }

  computeRuleSteps(computed: any): [number, number, number] {
    return this.computeSteps(
      computed,
      this.options.ruleInterval || this.options.interval || this.computeInterval(computed),
    )
  }

  computeLabelSteps(computed: any): [number, number, number] {
    return this.computeSteps(computed, this.options.interval || this.computeInterval(computed))
  }

  computeSteps(computed: { [key: string]: any }, interval: number): [number, number, number] {
    const steps: [number, number, number] = [this.options.start, this.options.end, interval]
    let computedStart = this.options.end % steps[2]
    computedStart = computedStart - (computedStart > computed.domain[0] ? steps[2] : 0)
    steps[0] = this.options.start || computedStart || Math.floor(computed.domain[0] / steps[2]) * steps[2]
    steps[1] = this.options.end || Math.ceil((computed.domain[1] - steps[0]) / steps[2]) * steps[2] + steps[0]
    return steps
  }

  computeRuleTicks(steps: [number, number, number]): number[] {
    const ruleTicks = computeTicks(steps)
    const requiredAxes = this.state.current.get("computed").axes.requiredAxes
    if (includes(this.isXAxis ? "y1" : "x1")(requiredAxes)) {
      ruleTicks.shift()
    }
    if (includes(this.isXAxis ? "y2" : "x2")(requiredAxes)) {
      ruleTicks.pop()
    }
    return ruleTicks
  }

  computeAligned(computed: Partial<AxisComputed>): void {
    this.previous = cloneDeep(this.computed)
    computed.domain = computed.labelSteps.slice(0, 2) as [number, number]
    computed.scale = computeScale(computed.range, computed.domain)
    computed.labelTicks = computeTicks(computed.labelSteps)
    computed.ruleTicks = this.computeRuleTicks(computed.ruleSteps)
    computed.ticks = computeTicks(computed.tickSteps)
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
      .data(this.computed.labelTicks, String)

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

  private tickFormatter(): (x: number) => string {
    const numberFormatter = this.state.current.get("config").numberFormatter
    const unitTick = last(this.computed.ticks)
    return (x: number): string => (x === unitTick && this.options.unit ? this.options.unit : numberFormatter(x))
  }

  private getAttributes(): AxisAttributes {
    const attrs: any = {
      x: this.isXAxis ? this.computed.scale : (d: number) => 0,
      y: this.isXAxis ? (d: number) => 0 : this.computed.scale,
      dx: this.isXAxis ? 0 : this.options.tickOffset,
      dy: this.isXAxis
        ? this.options.tickOffset + (this.position === "x1" ? this.options.fontSize : 0)
        : Math.abs(this.options.tickOffset / 2),
      text: this.tickFormatter(),
      textAnchor: getTextAnchor(this.position, this.options.rotateLabels),
    }
    attrs.transform = this.options.rotateLabels
      ? (d: number) => `rotate(-45, ${attrs.x(d) + attrs.dx}, ${attrs.y(d)})`
      : ""
    return attrs
  }

  private getStartAttributes(attributes: AxisAttributes): AxisAttributes {
    const startAttributes = cloneDeep(attributes)
    startAttributes[this.isXAxis ? "x" : "y"] = this.previous.scale
    startAttributes.transform = this.options.rotateLabels
      ? (d: number) => `rotate(-45, ${startAttributes.x(d) + startAttributes.dx}, ${startAttributes.y(d)})`
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

export default QuantAxis
