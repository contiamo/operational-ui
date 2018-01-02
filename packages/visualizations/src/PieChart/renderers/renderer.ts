import Donut from "./donut"
// import Polar from "./polar"
// import Gauge from "./gauge"
import { IObject } from "../typings"

// Factory Class
class Renderer {
  constructor(state: any, events: any, el: any, options: IObject) {
    switch (options.type) {
      case "donut":
        return new Donut(state, events, el, options)
      // case "polar":
      //   return new Polar(state, events, el)
      // case "gauge":
      //   return new Gauge(state, events, el)
      default:
        throw new Error("invalid render type '" + options.type + "' specified")
    }
  }
}

export default Renderer
