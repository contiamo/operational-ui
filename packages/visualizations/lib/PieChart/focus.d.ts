import ComponentFocus from "../utils/component_focus";
import { D3Selection, EventBus, Focus, HoverPayload, Object, SeriesEl, State, StateWriter } from "./typings";
declare class PieChartFocus implements Focus {
    el: SeriesEl;
    componentFocus: ComponentFocus;
    state: State;
    stateWriter: StateWriter;
    events: EventBus;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, els: Object<D3Selection>);
    onElementHover(payload: HoverPayload): void;
    onElementOut(): void;
    onMouseLeave(): void;
    remove(): void;
}
export default PieChartFocus;
