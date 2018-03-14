import { D3Selection, EventBus, Legend, State, StateWriter } from "./typings";
declare class PieChartLegend implements Legend {
    private events;
    private legend;
    private state;
    private stateWriter;
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
