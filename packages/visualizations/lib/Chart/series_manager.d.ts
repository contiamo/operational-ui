import Series from "./series/series";
import { Accessor, D3Selection, EventBus, Object, RangeRendererOptions, RendererOptions, SeriesAccessor, SeriesManager, State, StateWriter } from "./typings";
declare class ChartSeriesManager implements SeriesManager {
    el: D3Selection;
    events: EventBus;
    key: SeriesAccessor<string>;
    oldSeries: Series[];
    renderAs: Accessor<Object<any> | RendererOptions<any>, (RendererOptions<any> | RangeRendererOptions)[]>;
    series: Series[];
    state: State;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection);
    assignData(): void;
    private prepareData();
    private computeBarIndices(data);
    private handleGroupedSeries(type, compute);
    private computeRange(range, index);
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
