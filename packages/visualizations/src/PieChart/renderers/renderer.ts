import Donut from "./donut"
import Polar from "./polar"
import Gauge from "./gauge"
import { IEvents, IObject, IState, TD3Selection } from "../typings"

// Factory Class
class Renderer {
  constructor(state: IState, events: IEvents, el: TD3Selection, options: IObject) {
    switch (options.type) {
      case "donut":
        return new Donut(state, events, el, options)
      case "polar":
        return new Polar(state, events, el, options)
      case "gauge":
        return new Gauge(state, events, el, options)
      default:
        throw new Error("invalid render type '" + options.type + "' specified")
    }
  }
}

export default Renderer
