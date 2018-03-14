import { Canvas, D3Selection, EventBus, State, StateWriter } from "./typings";
declare class SunburstCanvas implements Canvas {
    private breadcrumb;
    private chartContainer;
    private el;
    private elMap;
    private events;
    private rootLabel;
    private state;
    private stateWriter;
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
