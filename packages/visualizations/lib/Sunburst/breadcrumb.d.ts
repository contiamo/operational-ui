import { D3Selection, EventBus, State, StateWriter } from "./typings";
declare class Breadcrumb {
    el: D3Selection;
    events: EventBus;
    state: State;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection);
    private updateHoverPath(payload);
    private label(d, i);
    private truncateNodeArray(nodeArray);
    private backgroundColor(d);
    private labelColor(d);
    private update(nodeArray);
    private onClick(d);
}
export default Breadcrumb;
