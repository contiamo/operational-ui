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
    assignAttributes(linkAttributes: LinkAttrs): LinkAttrs;
    assignAccessors(): void;
}
export default Link;
