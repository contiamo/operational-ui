import ComponentFocus from "./component_focus";
import { IEvents, IObject, IState, TD3Selection, TSeriesEl, TStateWriter } from "./typings";
declare abstract class Focus {
    componentEl: TD3Selection;
    el: TSeriesEl;
    focus: ComponentFocus;
    state: IState;
    stateWriter: TStateWriter;
    events: IEvents;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, els: IObject);
    onComponentHover(payload: {
        component: TD3Selection;
        options: IObject;
    }): void;
    onComponentLeave(): void;
    removeComponentFocus(options?: IObject): void;
    abstract onElementHover(payload: {
        focusPoint: IObject;
        d: IObject;
    }): void;
    onElementOut(): void;
    onMouseLeave(): void;
    remove(): void;
}
export default Focus;
