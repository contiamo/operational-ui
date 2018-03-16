import {
  RangeRendererAccessors,
  D3Selection,
  Datum,
  EventBus,
  RendererClass,
  RendererOptions,
  RendererType,
  State
} from "../../typings"

class Range implements RendererClass<RangeRendererAccessors> {
  data: Datum[]
  el: D3Selection
  events: EventBus
  options: RendererOptions<RangeRendererAccessors>
  state: any
  type: RendererType = "bars"

  constructor(state: State, events: EventBus, el: D3Selection, data: Datum[], options: RendererOptions<any>) {
    this.state = state
    this.events = events
    this.el = el
    this.data = data
    this.options = options
  }

  update(data: Datum[], options: RendererOptions<any>): void {}
}

export default Range
