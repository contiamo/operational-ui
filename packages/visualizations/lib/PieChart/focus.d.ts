import { D3Selection, EventBus, Focus, Object, State, StateWriter } from "./typings";
declare class PieChartFocus implements Focus {
    private el;
    private componentFocus;
    private state;
    private stateWriter;
    private events;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, els: Object<D3Selection>);
    private onElementHover(payload);
    private onElementOut();
    private onMouseLeave();
    remove(): void;
}
export default PieChartFocus;
