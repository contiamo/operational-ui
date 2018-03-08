import AbstractRenderer from "./abstract_renderer";
import "d3-transition";
import { ComputedDatum, Datum } from "../typings";
declare class Polar extends AbstractRenderer {
    minSegmentWidth: number;
    onTransitionEnd(): void;
    fitToCanvas(): void;
    computeOuter(width: number, height: number, scaleFactor?: number): any;
    computeInner(outerRadius: (d: Datum) => number): number;
    hoverOuter(radius: any): any;
    angleValue(d: Datum): number;
    computeTranslate(): [number, number];
    totalForPercentages(): number;
    centerDisplayString(): string[];
    totalYOffset(): string;
    arcTween(d: ComputedDatum, i: number): (t: number) => string;
    removeArcTween(d: ComputedDatum, i: number): (t: number) => string;
    angleRange(): [number, number];
}
export default Polar;
