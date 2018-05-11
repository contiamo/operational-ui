import { D3Selection, EventBus, Legend, LegendDatum, State, StateWriter } from "../typings";
declare class ChartLegend implements Legend {
    private data;
    private events;
    private legend;
    private state;
    private stateWriter;
    el: D3Selection;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection);
    setData(data: LegendDatum[]): void;
    draw(): void;
    setWidth(width: number): void;
    remove(): void;
}
export default ChartLegend;
