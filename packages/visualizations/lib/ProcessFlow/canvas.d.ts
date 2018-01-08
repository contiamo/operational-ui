import AbstractCanvas from "../utils/canvas";
import { IEvents, IState, TSeriesEl, TStateWriter } from "./typings";
declare class Canvas extends AbstractCanvas {
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element);
    createEl(): TSeriesEl;
    appendDrawingGroups(): void;
    mouseOverElement(): TSeriesEl;
}
export default Canvas;
