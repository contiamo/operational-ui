import { Canvas, D3Selection, EventBus, Object, SeriesEl, State, StateWriter } from "./typings";
declare class SunburstCanvas implements Canvas {
    breadcrumb: D3Selection;
    chartContainer: D3Selection;
    el: SeriesEl;
    events: EventBus;
    rootLabel: D3Selection;
    protected state: State;
    protected elMap: Object<D3Selection>;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, context: Element);
    insertChartContainer(context: Element): D3Selection;
    insertBreadcrumb(): D3Selection;
    insertEl(): SeriesEl;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onClick(): void;
    insertRootLabel(): D3Selection;
    insertFocus(): D3Selection;
    draw(): void;
    drawingDims(): Object<number>;
    remove(): void;
    elementFor(component: string): D3Selection;
}
export default SunburstCanvas;
