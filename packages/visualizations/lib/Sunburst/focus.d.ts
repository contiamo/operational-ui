import { Focus, IEvents, IObject, IState, TDatum, TSeriesEl, TStateWriter } from "./typings";
declare class SunburstFocus implements Focus {
    el: TSeriesEl;
    state: IState;
    stateWriter: TStateWriter;
    events: IEvents;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, els: IObject);
    onElementHover(payload: {
        focusPoint: IObject;
        d: TDatum;
        hideLabel?: boolean;
    }): void;
    percentageString(datum: TDatum): string;
    singlePercentageString(datum: TDatum, comparison: TDatum): string;
    onElementOut(): void;
    onMouseLeave(): void;
    remove(): void;
}
export default SunburstFocus;
