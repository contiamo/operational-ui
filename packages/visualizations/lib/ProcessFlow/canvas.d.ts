import AbstractCanvas from "../utils/canvas";
import { IEvents, IState, TD3Selection, TSeriesEl, TStateWriter } from "./typings";
declare class Canvas extends AbstractCanvas {
    focusEl: TD3Selection;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element);
    createEl(): TSeriesEl;
    insertFocusLabel(): TD3Selection;
    appendDrawingGroups(): void;
    mouseOverElement(): TSeriesEl;
}
export default Canvas;
