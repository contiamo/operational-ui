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
    private renderChartContainer(context);
    private renderBreadcrumb();
    private renderEl();
    private onMouseEnter();
    private onMouseLeave();
    private onClick();
    private renderRootLabel();
    private renderFocus();
    private drawingDims();
    draw(): void;
    remove(): void;
    elementFor(component: string): D3Selection;
}
export default SunburstCanvas;
