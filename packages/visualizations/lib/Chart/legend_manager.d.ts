import ChartLegend from "./legend/legend";
import { D3Selection, EventBus, Object, State, StateWriter } from "./typings";
declare class LegendManager {
    legends: Object<Object<ChartLegend>>;
    state: State;
    stateWriter: StateWriter;
    events: EventBus;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, els: Object<Object<D3Selection>>);
    draw(): void;
    private arrangeTopLegends();
    private calculateMaxWidth(legend);
}
export default LegendManager;
