import { defaults, filter, flow, forEach, identity, includes, isNil, omit, sortBy } from "lodash/fp"
import { axisPosition, insertElements, positionBackgroundRect } from "./axis_utils"
import { setTextAttributes, setLineAttributes } from "../../utils/d3_utils"
import { scaleBand } from "d3-scale"
import * as styles from "./styles"
import {
  AxisClass,
  CategoricalAxisOptions,
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

class CategoricalAxis implements AxisClass<string> {
  computed: any // @TODO typing
  data: string[]
  el: D3Selection
  events: EventBus
  isXAxis: boolean
  position: AxisPosition
  previous: any // @TODO typing
  sort: boolean = true
  state: State
  stateWriter: StateWriter
  type: "time" | "quant" | "categorical" = "categorical"

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection, position: AxisPosition) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.position = position
    this.isXAxis = position[0] === "x"
    this.el = insertElements(el, position, this.state.current.get("computed").canvas.drawingDims)
    // this.el.on("mouseenter", this.onComponentHover(this))  }
  }

  // Categorical axis supports everything that supports ".toString()"
  validate(value: any): boolean {
    return !isNil(value)
  }

  updateOptions(options: CategoricalAxisOptions): void {
    forEach.convert({ cap: false })((option: any, key: string): void => {
      ;(this as any)[key] = option
    })(options)
  }

  update(options: CategoricalAxisOptions, data: string[]): void {
    this.updateOptions(options)
    this.data = flow(
      filter(this.validate),
      sortBy((d: string, i: number): any => (this.sort ? d.toString().toUpperCase() : i))
    )(data)
  }

  draw(): void {
    this.drawTicks()
    this.drawBorder()
    positionBackgroundRect(this.el, this.state.current.get("config").duration)
  }

  compute(): void {
    this.previous = this.computed
    const computed: Object<any> = {}
    computed.range = this.computeRange()
    computed.ticks = this.data
    // @TODO offset ticks to account for bars
    computed.scale = scaleBand()
      .range(computed.range)
      .domain(computed.ticks)
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
      : [
          computed.canvas.drawingContainerDims.height - margin("x1"),
          margin("x2") || (config[this.position] as YAxisConfig).minTopOffsetTopTick
        ]
  }

  drawTicks(): void {
    const config: ChartConfig = this.state.current.get("config")
    const attributes: any = this.getAttributes()
    const startAttributes: any = this.getStartAttributes(attributes)

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

  getAttributes(): any {
    const tickOffset: number = this.state.current.get("config")[this.position].tickOffset
    return {
      dx: this.isXAxis ? 0 : tickOffset,
      dy: this.isXAxis ? tickOffset : "-0.4em",
      text: identity,
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

export default CategoricalAxis
