import AbstractRenderer from "./abstract_renderer";
import { TDatum } from "../typings";
declare class Donut extends AbstractRenderer {
    computeTranslate(): [number, number];
    totalForPercentages(): number;
    centerDisplayString(): string[];
    totalYOffset(): string;
    arcTween(d: TDatum, i: number): (t: number) => string;
    angleRange(): [number, number];
}
export default Donut;
