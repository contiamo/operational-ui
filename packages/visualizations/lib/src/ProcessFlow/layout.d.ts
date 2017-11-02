import { TNode, IState } from "./typings";
declare class Layout {
    nodes: TNode[];
    state: IState;
    constructor(state: IState);
    computeLayout(nodes: TNode[]): void;
    computeNodeYPositions(): void;
    shiftNodesToRight(x: number): any;
    isSourceDirectlyAbove(node: TNode): (xValue: number) => boolean;
    placeNode(used: number[], x: number, node: TNode): void;
    singleSourceAbove(sourcePositions: number[]): any;
    xPositionAvailable(nodePositions: number[]): (x: number) => boolean;
    calculateXPosition(sourcePositions: number[], possiblePositions: number[]): number;
    computeNodeXPositions(): void;
}
export default Layout;
