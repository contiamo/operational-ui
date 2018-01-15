import AbstractLegend from "../utils/legend";
import { IObject } from "./typings";
declare class Legend extends AbstractLegend {
    data(): IObject[];
    dataKey(d: IObject): string;
    colorAccessor(d: IObject): string;
    labelAccessor(d: IObject): string;
    updateComparisonLegend(): void;
    currentOptions(datum: IObject): IObject;
}
export default Legend;
