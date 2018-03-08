import { Canvas, D3Selection, EventBus, Object, SeriesEl, State, StateWriter } from "./typings";
declare class PieChartCanvas implements Canvas {
    drawingContainer: D3Selection;
    protected elements: Object<D3Selection>;
    chartContainer: D3Selection;
    el: SeriesEl;
    events: EventBus;
    protected state: State;
    protected elMap: Object<D3Selection>;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, context: Element);
    insertChartContainer(context: Element): D3Selection;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onClick(): void;
    insertLegend(): void;
    insertDrawingContainer(): D3Selection;
    insertEl(): SeriesEl;
    appendShadows(): void;
    prefixedId(id: string): string;
    shadowDefinitionId(): string;
    appendDrawingGroup(): void;
    insertFocusElements(): void;
    insertFocusLabel(): D3Selection;
    insertComponentFocus(): D3Selection;
    draw(): void;
    drawingContainerDims(): {
        height: number;
        width: number;
    };
    remove(): void;
    elementFor(component: string): D3Selection;
}
export default PieChartCanvas;
