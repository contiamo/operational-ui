import { defaults, filter, flow, forEach, isDate, last, omit, sortBy } from "lodash/fp"
import { axisPosition, insertElements, positionBackgroundRect } from "./axis_utils"
import {
  AxisClass,
  AxisOptions,
  AxisPosition,
  D3Selection,
  EventBus,
  Object,
  State,
  StateWriter,
  XAxisConfig,
  YAxisConfig
} from "../typings"

class TimeAxis implements AxisClass<Date> {
  computed: any // @TODO typing
  data: Date[]
  el: D3Selection
  events: EventBus
  // @TODO Should the interval be automatically detected, or assume it will always be provided?
  interval: "hour" | "day" | "week" | "month" | "quarter" | "year" = "day"
  isXAxis: boolean
  position: AxisPosition
  previous: any // @TODO typing
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

  updateOptions(options: AxisOptions): void {
    forEach.convert({ cap: false })((option: any, key: string): void => {
      ;(this as any)[key] = option
    })(options)
  }

  update(options: AxisOptions, data: Date[]): void {
    this.updateOptions(options)
    this.data = flow(filter(this.validate), sortBy((value: Date): number => value.valueOf()))(data)
  }

  draw(): void {
    this.compute()
    this.drawTicks()
    this.drawBorder()
    positionBackgroundRect(this.el, this.state.current.get("config").duration)
  }

  compute(): void {
    this.previous = this.computed
    const computed: Object<any> = this.computeInitial()
    // @TODO
    // computed.ticks = ?
    // computed.scale = ?
    this.computed = computed
  }

  computeInitial(): Object<any> {
    const options: XAxisConfig | YAxisConfig = this.state.current.get("config")[this.position]
    const computed: Object<any> = {}
    // @TODO
    // computed.range = ?
    // computed.domain = ?
    // computed.steps = ?
    return computed
  }

  computeAligned(computed: Object<any>): void {
    this.previous = this.computed
    // @TODO
    // computed.domain = ?
    // computed.scale = ?
    // computed.ticks = ?
    // computed.baseline = ? Is this necessary?
    this.computed = computed
    // this.previous = defaults(this.previous, this.computed)
  }

  drawTicks(): void {}

  drawBorder(): void {}

  remove(): void {}
}

export default TimeAxis
