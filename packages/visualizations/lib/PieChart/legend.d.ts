import { Legend, IEvents, IObject, IState, TStateWriter, TD3Selection } from "./typings";
declare class PieChartLegend implements Legend {
    events: IEvents;
    legend: TD3Selection;
    state: IState;
    stateWriter: TStateWriter;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TD3Selection);
    draw(): void;
    updateComparisonLegend(): void;
    data(): IObject[];
    onComponentHover(d: IObject, el: HTMLElement): void;
    currentOptions(datum: IObject): IObject;
    updateDimensions(): void;
    remove(): void;
}
export default PieChartLegend;
