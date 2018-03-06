import { Focus, IEvents, IObject, IState, TD3Selection, TDatum, TSeriesEl, TStateWriter } from "./typings";
declare class SunburstFocus implements Focus {
    el: TSeriesEl;
    state: IState;
    stateWriter: TStateWriter;
    events: IEvents;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TD3Selection);
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
