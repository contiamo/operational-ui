import { Canvas, D3Selection, EventBus, State, StateWriter } from "./typings";
declare class PieChartCanvas implements Canvas {
    private drawingContainer;
    private elements;
    private chartContainer;
    private el;
    private events;
    private state;
    private elMap;
    private stateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, context: Element);
    private renderChartContainer(context);
    private onMouseEnter();
    private onMouseLeave();
    private onClick();
    private renderLegend();
    private renderDrawingContainer();
    private renderEl();
    private renderDrawingGroup();
    private renderFocusElements();
    private renderFocusLabel();
    private renderComponentFocus();
    private drawingContainerDims();
    draw(): void;
    remove(): void;
    elementFor(component: string): D3Selection;
}
export default PieChartCanvas;
