import { compact, get, map } from "lodash/fp"

import {
  BarsRendererAccessors,
  D3Selection,
  Datum,
  EventBus,
  RendererClass,
  RendererOptions,
  RendererType,
  State
} from "../../typings"

class Bars implements RendererClass<BarsRendererAccessors> {
  data: Datum[]
  el: D3Selection
  events: EventBus
  options: RendererOptions<BarsRendererAccessors>
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

  dataForAxis(axis: "x" | "y"): any[] {
    const data: any[] = map(get(axis))(this.data)
      .concat(map(get(`${axis}0`))(this.data))
      .concat(map(get(`${axis}1`))(this.data))
    return compact(data)
  }

  draw(): void {}
}

export default Bars
