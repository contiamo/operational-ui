import { Canvas, TD3Selection, IState, TStateWriter, IEvents, IObject, TSeriesEl } from "./typings";
declare class SunburstCanvas implements Canvas {
    breadcrumb: TD3Selection;
    chartContainer: TD3Selection;
    el: TSeriesEl;
    events: IEvents;
    rootLabel: TD3Selection;
    protected state: IState;
    protected elMap: IObject;
    stateWriter: TStateWriter;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element);
    insertChartContainer(context: Element): TD3Selection;
    insertBreadcrumb(): TD3Selection;
    insertEl(): TSeriesEl;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onClick(): void;
    insertRootLabel(): TD3Selection;
    insertFocus(): TD3Selection;
    draw(): void;
    drawingDims(): IObject;
    remove(): void;
    elementFor(component: string): any;
}
export default SunburstCanvas;
