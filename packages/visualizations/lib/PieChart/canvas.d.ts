import AbstractDrawingCanvas from "../utils/drawing_canvas";
import { TD3Selection, IState, TStateWriter, IEvents, IMousePosition } from "./typings";
declare class Canvas extends AbstractDrawingCanvas {
    mousePosition: IMousePosition;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element);
    createEl(): TD3Selection;
    appendShadows(): void;
    initialMousePosition(): IMousePosition;
    trackMouseMove(): void;
    stopMouseMove(): void;
    totalLegendHeight(): number;
}
export default Canvas;
