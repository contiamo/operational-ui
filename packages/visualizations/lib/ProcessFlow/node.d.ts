import { NodeAttrs, NodeAccessors, TLink } from "./typings";
declare class Node {
    accessors: NodeAccessors;
    attributes: NodeAttrs;
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
    constructor(nodeAttributes: NodeAttrs, accessors: NodeAccessors);
    private assignAttributes(nodeAttributes);
    private assignAccessors();
}
export default Node;
