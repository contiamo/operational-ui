import { AxisPosition, AxisType, D3Selection, EventBus, State, StateWriter } from "../typings"
import QuantAxis from "../axes/quant_axis"
import TimeAxis from "../axes/time_axis"
import CategoricalAxis from "../axes/categorical_axis"

class Axis {
  constructor(
    state: State,
    stateWriter: StateWriter,
    events: EventBus,
    el: D3Selection,
    type: string,
    position: AxisPosition,
  ) {
    switch (type) {
      case "quant":
        return new QuantAxis(state, stateWriter, events, el, position)
      case "time":
        return new TimeAxis(state, stateWriter, events, el, position)
      case "categorical":
        return new CategoricalAxis(state, stateWriter, events, el, position)
      default:
        throw new Error(`Invalid axis type ${type}`)
    }
  }
}

export default Axis
