import { Canvas, EventBus, State, StateWriter } from "./typings";
declare class ProcessFlowCanvas implements Canvas {
    private chartContainer;
    private el;
    private events;
    private state;
    private elMap;
    private stateWriter;
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
