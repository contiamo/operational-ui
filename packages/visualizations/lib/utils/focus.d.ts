import { IEvents, IState, TSeriesEl, TStateWriter } from "./typings";
declare abstract class Focus {
    el: TSeriesEl;
    state: IState;
    stateWriter: TStateWriter;
    events: IEvents;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TSeriesEl);
    abstract onElementHover(payload: {
        focusPoint: any;
        d: any;
    }): void;
    onElementOut(): void;
    onMouseLeave(): void;
    remove(): void;
}
export default Focus;
