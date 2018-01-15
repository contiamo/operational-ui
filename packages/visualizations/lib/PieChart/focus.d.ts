import AbstractDrawingFocus from "../utils/focus";
import { TDatum, IObject } from "./typings";
declare class Focus extends AbstractDrawingFocus {
    onElementHover(payload: {
        focusPoint: IObject;
        d: TDatum;
    }): void;
}
export default Focus;
