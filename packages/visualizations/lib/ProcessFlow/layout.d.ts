import { State, TNode } from "./typings";
declare class Layout {
    nodes: TNode[];
    state: State;
    constructor(state: State);
    computeLayout(nodes: TNode[]): void;
    computeNodeYPositions(): void;
    placeMultipleSourceNodes(nodesInRow: TNode[], nodePositions: number[]): void;
    computeNodeXPositions(): void;
}
export default Layout;
