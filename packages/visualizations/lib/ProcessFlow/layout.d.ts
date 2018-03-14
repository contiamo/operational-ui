import { State, TNode } from "./typings";
declare class Layout {
    private state;
    nodes: TNode[];
    constructor(state: State);
    computeLayout(nodes: TNode[]): void;
    private computeNodeYPositions();
    private placeMultipleSourceNodes(nodesInRow, nodePositions);
    private computeNodeXPositions();
}
export default Layout;
