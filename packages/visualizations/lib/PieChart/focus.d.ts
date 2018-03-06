import ComponentFocus from "../utils/component_focus";
import { IEvents, IObject, IState, TSeriesEl, TStateWriter } from "./typings";
declare class Focus {
    el: TSeriesEl;
    componentFocus: ComponentFocus;
    state: IState;
    stateWriter: TStateWriter;
    events: IEvents;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, els: IObject);
    onElementHover(payload: {
        focusPoint: IObject;
        d: IObject;
    }): void;
    onElementOut(): void;
    onMouseLeave(): void;
    remove(): void;
}
export default Focus;
