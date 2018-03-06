import ComponentFocus from "../utils/component_focus";
import { Focus, IEvents, IObject, IState, TSeriesEl, TStateWriter } from "./typings";
declare class PieChartFocus implements Focus {
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
export default PieChartFocus;
