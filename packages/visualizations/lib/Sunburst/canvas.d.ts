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
    renderChartContainer(context: Element): D3Selection;
    renderBreadcrumb(): D3Selection;
    renderEl(): SeriesEl;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onClick(): void;
    renderRootLabel(): D3Selection;
    renderFocus(): D3Selection;
    draw(): void;
    drawingDims(): Object<number>;
    remove(): void;
    elementFor(component: string): D3Selection;
}
export default SunburstCanvas;
