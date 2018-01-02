import AbstractLegend from "../utils/legend"
import { filter, find, forEach, get, groupBy, keys, map } from "lodash/fp"
import { IObject } from "./typings"

class Legend extends AbstractLegend {
  data(): any {
    return this.state.current.get("computed").series.data
  }

  dataKey(d: string): string {
    return this.state.current.get("computed").series.keyAccessor(d)
  }

  colorAccessor(d: string): string {
    return this.state.current.get("computed").series.colorAccessor(d)
  }

  labelAccessor(d: string): string {
    return this.state.current.get("computed").series.keyAccessor(d)
  }
}

export default Legend
