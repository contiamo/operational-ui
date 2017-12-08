import { IState, TNode } from "./typings";
declare class Layout {
    nodes: TNode[];
    state: IState;
    constructor(state: IState);
    computeLayout(nodes: TNode[]): void;
    computeNodeYPositions(): void;
    placeMultipleSourceNodes(nodesInRow: TNode[], nodePositions: number[]): void;
    computeNodeXPositions(): void;
}
export default Layout;
