import { IState, TStateWriter, TEvents, TSeriesEl } from "./typings";
declare abstract class AbstractFocus {
    el: TSeriesEl;
    focus: any;
    state: IState;
    stateWriter: TStateWriter;
    events: TEvents;
    constructor(state: IState, stateWriter: TStateWriter, events: TEvents, el: TSeriesEl);
    remove(): void;
    refresh(): void;
}
export default AbstractFocus;
