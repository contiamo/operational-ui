import { D3Selection, EventBus, Focus, SeriesEl, State, StateWriter } from "./typings";
declare class SunburstFocus implements Focus {
    el: SeriesEl;
    state: State;
    stateWriter: StateWriter;
    events: EventBus;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection);
    private onElementHover(payload);
    private percentageString(datum);
    private singlePercentageString(datum, comparison);
    private onElementOut();
    private onMouseLeave();
    remove(): void;
}
export default SunburstFocus;
