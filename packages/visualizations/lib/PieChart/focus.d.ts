import ComponentFocus from "../utils/component_focus";
import { D3Selection, EventBus, Focus, Object, SeriesEl, State, StateWriter } from "./typings";
declare class PieChartFocus implements Focus {
    el: SeriesEl;
    componentFocus: ComponentFocus;
    state: State;
    stateWriter: StateWriter;
    events: EventBus;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, els: Object<D3Selection>);
    private onElementHover(payload);
    private onElementOut();
    private onMouseLeave();
    remove(): void;
}
export default PieChartFocus;
