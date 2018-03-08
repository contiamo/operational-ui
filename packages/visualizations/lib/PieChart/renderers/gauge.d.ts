import AbstractRenderer from "./abstract_renderer";
import { ComputedDatum, LegendDatum, Object } from "../typings";
declare class Gauge extends AbstractRenderer {
    comparison: Object<any>;
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
    onMouseOver(d: ComputedDatum): void;
    totalForPercentages(): number;
    computeTranslate(): [number, number];
    angleRange(): [number, number];
    totalYOffset(): string;
    arcTween(d: ComputedDatum, i: number): (t: number) => string;
    lineTween(comparison: Object<any>): (t: number) => string;
    dataForLegend(): LegendDatum[];
}
export default Gauge;
