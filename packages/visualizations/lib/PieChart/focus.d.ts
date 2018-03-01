import AbstractDrawingFocus from "../utils/focus";
import { IObject } from "./typings";
declare class Focus extends AbstractDrawingFocus {
    onElementHover(payload: {
        focusPoint: IObject;
        d: IObject;
    }): void;
}
export default Focus;
