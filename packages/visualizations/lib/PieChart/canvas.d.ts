import { Canvas, TD3Selection, IState, TStateWriter, TSeriesEl, IEvents, IObject } from "./typings";
declare class PieChartCanvas implements Canvas {
    drawingContainer: TD3Selection;
    protected elements: IObject;
    chartContainer: TD3Selection;
    el: TSeriesEl;
    events: IEvents;
    protected state: IState;
    protected elMap: IObject;
    stateWriter: TStateWriter;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element);
    insertChartContainer(context: Element): TD3Selection;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onClick(): void;
    insertLegend(): void;
    insertDrawingContainer(): TD3Selection;
    insertEl(): TSeriesEl;
    appendShadows(): void;
    prefixedId(id: string): string;
    shadowDefinitionId(): string;
    appendDrawingGroup(): void;
    insertFocusElements(): void;
    insertFocusLabel(): TD3Selection;
    insertComponentFocus(): TD3Selection;
    draw(): void;
    drawingContainerDims(): {
        height: number;
        width: number;
    };
    remove(): void;
    elementFor(component: string): any;
}
export default PieChartCanvas;
