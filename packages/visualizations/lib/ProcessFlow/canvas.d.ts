import { Canvas, D3Selection, EventBus, Object, SeriesEl, State, StateWriter } from "./typings";
declare class ProcessFlowCanvas implements Canvas {
    chartContainer: D3Selection;
    el: SeriesEl;
    events: EventBus;
    protected state: State;
    protected elMap: Object<D3Selection>;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, context: Element);
    insertChartContainer(context: Element): D3Selection;
    insertEl(): SeriesEl;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onClick(): void;
    insertFocus(): void;
    appendDrawingGroups(): void;
    draw(): void;
    remove(): void;
    elementFor(component: string): any;
}
export default ProcessFlowCanvas;
