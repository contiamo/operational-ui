import AbstractFacade from "../utils/abstract_facade";
import Canvas from "./canvas";
import Series from "./series";
import { IKeyValueObject, INestedKeyValueObject } from "./typings";
declare class ProcessFlow extends AbstractFacade {
    series: Series;
    canvas: Canvas;
    defaultConfig(): IKeyValueObject;
    defaultAccessors(): INestedKeyValueObject;
    visualizationName(): string;
    insertCanvas(): void;
    initializeComponents(): void;
    initializeSeries(): void;
    draw(): Element;
}
export default ProcessFlow;
