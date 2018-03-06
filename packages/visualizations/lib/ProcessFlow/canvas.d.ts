import { Canvas, IEvents, IObject, IState, TD3Selection, TSeriesEl, TStateWriter } from "./typings";
declare class ProcessFlowCanvas implements Canvas {
    chartContainer: TD3Selection;
    el: TSeriesEl;
    events: IEvents;
    protected elements: IObject;
    protected state: IState;
    protected elMap: IObject;
    stateWriter: TStateWriter;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element);
    insertChartContainer(context: Element): TD3Selection;
    insertEl(): TSeriesEl;
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
