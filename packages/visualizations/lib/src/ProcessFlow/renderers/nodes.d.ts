import AbstractRenderer from "./abstract_renderer";
import "d3-transition";
import { TNode, TScale, IFocus, TNodeSelection } from "../typings";
declare class Nodes extends AbstractRenderer {
    type: string;
    focusElementAccessor: string;
    data: TNode[];
    updateDraw(): void;
    nodeBorderScale(scale: TScale): TScale;
    enterAndUpdate(nodeGroups: TNodeSelection): void;
    getNodeBoundingRect(el: any): SVGRect;
    getNodeLabelX(d: TNode, el: any): number;
    getNodeLabelY(d: TNode, el: any): number;
    updateNodeLabels(nodeGroups: any): void;
    focusPoint(element: any, d: TNode): IFocus;
}
export default Nodes;
