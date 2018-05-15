import { D3Selection, EventBus, Focus, State, StateWriter } from "./typings";
declare class SunburstFocus implements Focus {
    private el;
    private state;
    private stateWriter;
    private events;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection);
    private onElementHover(payload);
    private labelPlacement(focusPoint);
    private percentageString(datum);
    private singlePercentageString(datum, comparison);
    private onElementOut();
    private onMouseLeave();
    remove(): void;
}
export default SunburstFocus;
