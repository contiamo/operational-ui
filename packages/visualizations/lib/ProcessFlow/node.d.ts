import { INodeAttrs, INodeAccessors, TLink } from "./typings";
declare class Node {
    accessors: INodeAccessors;
    attributes: INodeAttrs;
    color: () => string;
    id: () => string;
    journeyEnds: number;
    journeyStarts: number;
    label: () => string;
    labelPosition: () => string;
    shape: () => string;
    singleNodeJourneys: number;
    size: () => number;
    sourceLinks: TLink[];
    stroke: () => string;
    targetLinks: TLink[];
    x: number;
    y: number;
    constructor(nodeAttributes: INodeAttrs, accessors: INodeAccessors);
    assignAttributes(nodeAttributes: INodeAttrs): INodeAttrs;
    assignAccessors(): void;
}
export default Node;
