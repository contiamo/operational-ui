import {
  AreaRendererAccessors,
  D3Selection,
  Datum,
  EventBus,
  RendererClass,
  RendererOptions,
  RendererType,
  State
} from "../../typings"

class Area implements RendererClass<AreaRendererAccessors> {
  data: Datum[]
  el: D3Selection
  events: EventBus
  options: RendererOptions<AreaRendererAccessors>
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

export default Area
