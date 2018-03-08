import { ClickPayload, D3Selection, EventBus, State, StateWriter } from "./typings";
declare class RootLabel {
    el: D3Selection;
    events: EventBus;
    state: State;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection);
    update(payload: ClickPayload): void;
}
export default RootLabel;
