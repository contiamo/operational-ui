import { LinkAccessors, LinkAttrs, TNode } from "./typings";
declare class Link {
    accessors: LinkAccessors;
    attributes: LinkAttrs;
    dash: () => string;
    label: () => string;
    size: () => number;
    source: () => TNode;
    sourceId: () => string;
    stroke: () => string;
    target: () => TNode;
    targetId: () => string;
    constructor(linkAttributes: LinkAttrs, accessors: LinkAccessors);
    private assignAttributes(linkAttributes);
    private assignAccessors();
}
export default Link;
