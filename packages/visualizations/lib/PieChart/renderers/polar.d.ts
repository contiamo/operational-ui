import AbstractRenderer from "./abstract_renderer";
import "d3-transition";
import { TDatum } from "../typings";
declare class Polar extends AbstractRenderer {
    minSegmentWidth: number;
    onTransitionEnd(): void;
    fitToCanvas(): void;
    computeOuter(width: number, height: number, scaleFactor: number): any;
    computeInner(outerRadius: (d: TDatum) => number): number;
    hoverOuter(radius: any): any;
    angleValue(d: TDatum): number;
    computeTranslate(): [number, number];
    totalForPercentages(): number;
    centerDisplayString(): string[];
    totalYOffset(): string;
    arcTween(d: TDatum, i: number): (t: number) => string;
    removeArcTween(d: TDatum, i: number): (t: number) => string;
    angleRange(): [number, number];
}
export default Polar;
