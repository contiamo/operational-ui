import { ILinkAccessors, ILinkAttrs, TNode } from "./typings";
declare class Link {
    accessors: ILinkAccessors;
    attributes: ILinkAttrs;
    dash: () => string;
    label: () => string;
    size: () => number;
    source: () => TNode;
    sourceId: () => string;
    stroke: () => string;
    target: () => TNode;
    targetId: () => string;
    constructor(linkAttributes: ILinkAttrs, accessors: ILinkAccessors);
    assignAttributes(linkAttributes: ILinkAttrs): ILinkAttrs;
    assignAccessors(): void;
}
export default Link;
