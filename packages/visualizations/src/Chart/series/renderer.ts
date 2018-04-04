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
  constructor(
    state: State,
    events: EventBus,
    el: D3Selection,
    data: Datum[],
    options: RendererOptions<any>,
    series: any
  ) {
    switch (options.type) {
      case "area":
        return new Area(state, events, el.select("g.series-area"), data, options, series)
      case "bars":
        return new Bars(state, events, el.select("g.series-bars"), data, options, series)
      case "flag":
        return new Flag(state, events, el.select("g.series-flag"), data, options)
      case "line":
        return new Line(state, events, el.select("g.series-line"), data, options, series)
      case "range":
        return new Range(state, events, el.select("g.series-range"), data, options)
      case "symbol":
        return new Symbol(state, events, el.select("g.series-symbol"), data, options, series)
      case "text":
        return new Text(state, events, el.select("g.series-text"), data, options, series)
    }
  }
}

export default Renderer
