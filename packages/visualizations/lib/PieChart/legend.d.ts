import { D3Selection, EventBus, Legend, State, StateWriter } from "./typings";
declare class PieChartLegend implements Legend {
    events: EventBus;
    legend: D3Selection;
    state: State;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection);
    draw(): void;
    private updateComparisonLegend();
    private data();
    private onComponentHover(d, el);
    private currentOptions(datum);
    private updateDimensions();
    remove(): void;
}
export default PieChartLegend;
