import Canvas from "./canvas";
import { IEvents, IObject, IState, TD3Selection, TSeriesEl, TStateWriter } from "./typings";
declare abstract class DrawingCanvas extends Canvas {
    drawingContainer: TD3Selection;
    protected elements: IObject;
    protected legendMap: IObject;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element);
    insertEl(): TSeriesEl;
    insertDrawingContainer(): TD3Selection;
    mouseOverElement(): TD3Selection;
    prefixedId(id: string): string;
    appendDrawingGroup(): void;
    appendDrawingClip(): void;
    appendYRulesClip(): void;
    appendBackground(): void;
    appendRules(axes: string[], axesMap: IObject): void;
    appendAxes(axes: string[], axesMap: IObject): void;
    appendSeriesDrawingGroups(seriesElements: string[] | string[][]): void;
    insertLegend(position: string, float: string): void;
    insertLegendBefore(element: TD3Selection): void;
    insertLegendAfter(element: TD3Selection): void;
    drawingContainerDims(): {
        height: number;
        width: number;
    };
    abstract totalLegendHeight(): number;
    drawingClipDefinitionId(): string;
    yRulesDefinitionId(): string;
    shadowDefinitionId(): string;
    draw(): void;
    resize(): void;
    remove(): void;
}
export default DrawingCanvas;
