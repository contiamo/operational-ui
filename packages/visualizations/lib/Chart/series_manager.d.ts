import Series from "./series/series";
import { Accessor, D3Selection, EventBus, Object, RendererOptions, SeriesAccessor, SeriesManager, State, StateWriter } from "./typings";
declare class ChartSeriesManager implements SeriesManager {
    el: D3Selection;
    events: EventBus;
    key: SeriesAccessor<string>;
    oldSeries: Series[];
    renderAs: Accessor<Object<any> | RendererOptions, RendererOptions[]>;
    series: Series[];
    state: State;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection);
    assignData(): void;
    private prepareData();
    private computeBarIndices(data);
    private handleGroupedSeries(type, compute);
    private computeRange(range, index);
    private computeStack(stack, index);
    private get(key);
    private remove(key);
    private removeAllExcept(keys);
    private dataForLegends();
    private dataForAxes();
    private barSeries();
    private axesWithFlags();
    private create(options);
    draw(): void;
}
export default ChartSeriesManager;
