import { TLink, TAccessors, INodeAttrs } from "./typings";
declare class Node {
    accessors: TAccessors;
    attributes: INodeAttrs;
    x: number;
    y: number;
    sourceLinks: TLink[];
    targetLinks: TLink[];
    journeyStarts: number;
    journeyEnds: number;
    singleNodeJourneys: number;
    constructor(nodeAttributes: INodeAttrs, accessors: TAccessors);
    assignProperties(nodeAttributes: INodeAttrs): void;
    color(): string;
    shape(): string;
    size(): number;
    stroke(): string;
    id(): string;
    label(): string;
    labelPosition(): string;
}
export default Node;
