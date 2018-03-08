import { ComponentConfigOptions, D3Selection, EventBus, Legend, LegendDatum, State, StateWriter } from "./typings";
declare class PieChartLegend implements Legend {
    events: EventBus;
    legend: D3Selection;
    state: State;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection);
    draw(): void;
    updateComparisonLegend(): void;
    data(): LegendDatum[];
    onComponentHover(d: LegendDatum, el: HTMLElement): void;
    currentOptions(datum: LegendDatum): ComponentConfigOptions;
    updateDimensions(): void;
    remove(): void;
}
export default PieChartLegend;
