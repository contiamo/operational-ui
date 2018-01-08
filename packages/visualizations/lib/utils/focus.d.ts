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
        component: any;
        options: any;
    }): void;
    onComponentLeave(): void;
    removeComponentFocus(options?: any): void;
    abstract onElementHover(payload: {
        focusPoint: any;
        d: any;
    }): void;
    onElementOut(): void;
    onMouseLeave(): void;
    remove(): void;
}
export default Focus;
