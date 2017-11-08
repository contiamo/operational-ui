import * as d3 from "d3-selection";
import { IState, TStateWriter, TEvents, TSeriesEl } from "./typings";
declare abstract class AbstractCanvas {
    container: d3.Selection<Element, {}, null, undefined>;
    el: TSeriesEl;
    events: TEvents;
    focusEl: any;
    protected elements: any;
    protected state: IState;
    stateWriter: TStateWriter;
    constructor(state: IState, stateWriter: TStateWriter, events: TEvents, context: any);
    abstract createEl(): TSeriesEl;
    insertContainer(context: any): void;
    insertEl(): void;
    insertFocusLabel(): void;
    createInitialElements(): void;
    elementFor(component: string): any;
    prefixedId(id: string): string;
    listenToMouseOver(): void;
    rootElement(): Node;
    abstract mouseOverElement(): any;
    trackMouseMove(): void;
    stopMouseMove(): void;
    seriesElements(): string[] | string[][];
    insertSeries(): {
        [key: string]: any[];
    };
    draw(): void;
    margin(side: string): number;
    resize(computed: any): void;
    remove(): void;
}
export default AbstractCanvas;
