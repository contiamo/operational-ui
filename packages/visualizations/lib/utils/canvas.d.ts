import { IEvents, IObject, IState, TD3Selection, TSeriesEl, TStateWriter } from "./typings";
declare abstract class Canvas {
    container: TD3Selection;
    el: TSeriesEl;
    events: IEvents;
    protected elements: IObject;
    protected state: IState;
    protected elMap: IObject;
    stateWriter: TStateWriter;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element);
    insertContainer(context: Element): TD3Selection;
    abstract createEl(): TSeriesEl;
    insertEl(): TSeriesEl;
    abstract mouseOverElement(): TD3Selection;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onClick(): void;
    listenToMouseOver(): void;
    elementFor(component: string): any;
    trackMouseMove(): void;
    stopMouseMove(): void;
    draw(): void;
    remove(): void;
}
export default Canvas;
