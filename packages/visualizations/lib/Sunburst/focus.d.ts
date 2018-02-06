import AbstractFocus from "../utils/focus";
import { TDatum, IObject } from "./typings";
declare class Focus extends AbstractFocus {
    onElementHover(payload: {
        focusPoint: IObject;
        d: TDatum;
    }): void;
    percentageString(datum: TDatum): string;
    singlePercentageString(datum: TDatum, comparison: TDatum): string;
}
export default Focus;
