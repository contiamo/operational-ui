import AbstractDrawingCanvas from "../utils/drawing_canvas";
import { TD3Selection, IState, TStateWriter, IEvents } from "./typings";
declare class Canvas extends AbstractDrawingCanvas {
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element);
    createEl(): TD3Selection;
    appendShadows(): void;
    totalLegendHeight(): number;
}
export default Canvas;
