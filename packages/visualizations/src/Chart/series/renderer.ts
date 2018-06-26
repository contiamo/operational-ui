import { D3Selection, Datum, EventBus, SingleRendererOptions, State } from "../typings"
import Area from "./renderers/area"
import Bars from "./renderers/bars"
import Flag from "./renderers/flag"
import Line from "./renderers/line"
import Symbol from "./renderers/symbol"
import Text from "./renderers/text"

class Renderer {
  constructor(
    state: State,
    events: EventBus,
    el: D3Selection,
    data: Datum[],
    options: SingleRendererOptions<any>,
    series: any,
  ) {
    switch (options.type) {
      case "area":
        return new Area(state, events, el.select("g.series-area"), data, options, series)
      case "bars":
        return new Bars(state, events, el.select("g.series-bars"), data, options, series)
      case "flag":
        return new Flag(state, events, el.select("g.series-flag"), data, options, series)
      case "line":
        return new Line(state, events, el.select("g.series-line"), data, options, series)
      case "symbol":
        return new Symbol(state, events, el.select("g.series-symbol"), data, options, series)
      case "text":
        return new Text(state, events, el.select("g.series-text"), data, options, series)
      default:
        throw new Error(`No "${options.type}" renderer is available.`)
    }
  }
}

export default Renderer
