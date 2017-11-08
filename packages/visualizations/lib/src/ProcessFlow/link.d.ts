import { TNode, ILinkAttrs, TAccessors } from "./typings";
declare class Link {
    accessors: TAccessors;
    attributes: ILinkAttrs;
    constructor(linkAttributes: ILinkAttrs, accessors: TAccessors);
    assignProperties(linkAttributes: ILinkAttrs): void;
    dash(): number;
    focusLabel(): string;
    label(): string;
    size(): number;
    source(): TNode;
    sourceId(): string;
    stroke(): string;
    target(): TNode;
    targetId(): string;
}
export default Link;
