import AbstractFocus from "../utils/focus";
import { TDatum, IObject } from "./typings";
declare class Focus extends AbstractFocus {
    onElementHover(payload: {
        focusPoint: IObject;
        d: TDatum;
    }): void;
}
export default Focus;
