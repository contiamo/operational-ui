import AbstractRenderer from "./abstract_renderer";
import { ComputedDatum } from "../typings";
declare class Donut extends AbstractRenderer {
    computeTranslate(): [number, number];
    totalForPercentages(): number;
    centerDisplayString(): string[];
    totalYOffset(): string;
    arcTween(d: ComputedDatum): (t: number) => string;
    angleRange(): [number, number];
}
export default Donut;
