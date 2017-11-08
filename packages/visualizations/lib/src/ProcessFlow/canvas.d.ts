import AbstractCanvas from "../utils/abstract_canvas";
import { TSeriesEl } from "./typings";
declare class Canvas extends AbstractCanvas {
    createEl(): TSeriesEl;
    createInitialElements(): void;
    insertDrawingGroups(): void;
    draw(): void;
    mouseOverElement(): any;
}
export default Canvas;
