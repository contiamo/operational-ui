import AbstractFocus from "../utils/focus";
import { IEvents, IObject, IState, TDatum, TStateWriter } from "./typings";
declare class Focus extends AbstractFocus {
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, els: IObject);
    onElementHover(payload: {
        focusPoint: IObject;
        d: TDatum;
    }): void;
    percentageString(datum: TDatum): string;
    singlePercentageString(datum: TDatum, comparison: TDatum): string;
}
export default Focus;
