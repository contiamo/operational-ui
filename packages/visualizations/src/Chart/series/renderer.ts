import { D3Selection, Datum, EventBus, RendererOptions, State } from "../typings"
import * as d3 from "d3-selection"
import Area from "./renderers/area"
import Bars from "./renderers/bars"
import Flag from "./renderers/flag"
import Line from "./renderers/line"
import Range from "./renderers/range"
import Symbol from "./renderers/symbol"
import Text from "./renderers/text"

class Renderer {
  constructor(state: State, events: EventBus, el: D3Selection, data: Datum[], options: RendererOptions<any>) {
    switch (options.type) {
      case "area":
        return new Area(state, events, d3.select("g.series-area"), data, options)
      case "bars":
        return new Bars(state, events, d3.select("g.series-bars"), data, options)
      case "flag":
        return new Flag(state, events, d3.select("g.series-flag"), data, options)
      case "line":
        return new Line(state, events, d3.select("g.series-line"), data, options)
      case "range":
        return new Range(state, events, d3.select("g.series-range"), data, options)
      case "symbol":
        return new Symbol(state, events, d3.select("g.series-symbol"), data, options)
      case "text":
        return new Text(state, events, d3.select("g.series-text"), data, options)
    }
  }
}

export default Renderer
