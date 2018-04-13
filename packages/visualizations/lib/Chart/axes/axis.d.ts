import { AxisPosition, AxisType, D3Selection, EventBus, State, StateWriter } from "../typings";
declare class Axis {
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection, type: AxisType, position: AxisPosition);
}
export default Axis;
