import AbstractRenderer from "./abstract_renderer";
import { IObject, TDatum } from "../typings";
declare class Gauge extends AbstractRenderer {
    comparison: IObject;
    extent: string;
    target: number;
    checkData(): void;
    computeOuter(width: number, height: number): number;
    runningTotal(): number[];
    fillGaugeExtent(): void;
    centerDisplayString(): string[];
    compute(): void;
    updateDraw(): void;
    updateComparison(): void;
    onMouseOver(d: TDatum): void;
    totalForPercentages(): number;
    computeTranslate(): [number, number];
    angleRange(): [number, number];
    totalYOffset(): string;
    arcTween(d: TDatum, i: number): (t: number) => string;
    lineTween(comparison: IObject): (t: number) => string;
    dataForLegend(): IObject[];
}
export default Gauge;
