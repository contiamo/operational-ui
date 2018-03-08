import { D3Selection, Datum, EventBus, Focus, HoverPayload, SeriesEl, State, StateWriter } from "./typings";
declare class SunburstFocus implements Focus {
    el: SeriesEl;
    state: State;
    stateWriter: StateWriter;
    events: EventBus;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection);
    onElementHover(payload: HoverPayload): void;
    percentageString(datum: Datum): string;
    singlePercentageString(datum: Datum, comparison: Datum): string;
    onElementOut(): void;
    onMouseLeave(): void;
    remove(): void;
}
export default SunburstFocus;
