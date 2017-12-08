import AbstractRenderer from "./abstract_renderer";
import "d3-transition";
import { IFocus, TNode, TNodeSelection, TScale } from "../typings";
declare class Nodes extends AbstractRenderer {
    type: string;
    focusElementAccessor: string;
    data: TNode[];
    updateDraw(): void;
    nodeBorderScale(scale: TScale): TScale;
    translate(d: TNode): string;
    rotate(d: TNode): string;
    enterAndUpdate(nodeGroups: TNodeSelection): void;
    getNodeBoundingRect(el: HTMLElement): SVGRect;
    getNodeLabelX(d: TNode, el: HTMLElement): number;
    getNodeLabelY(d: TNode, el: HTMLElement): number;
    getLabelText(d: TNode): string;
    updateNodeLabels(): void;
    focusPoint(element: TNodeSelection, d: TNode): IFocus;
}
export default Nodes;
