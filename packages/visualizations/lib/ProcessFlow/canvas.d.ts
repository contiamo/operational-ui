import { Canvas, D3Selection, EventBus, Object, SeriesEl, State, StateWriter } from "./typings";
declare class ProcessFlowCanvas implements Canvas {
    chartContainer: D3Selection;
    el: SeriesEl;
    events: EventBus;
    protected state: State;
    protected elMap: Object<D3Selection>;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, context: Element);
    private renderChartContainer(context);
    private renderEl();
    private onMouseEnter();
    private onMouseLeave();
    private onClick();
    private renderFocus();
    private renderDrawingGroups();
    draw(): void;
    remove(): void;
    elementFor(component: string): any;
}
export default ProcessFlowCanvas;
