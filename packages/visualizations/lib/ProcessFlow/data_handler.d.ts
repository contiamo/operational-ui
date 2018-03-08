import Layout from "./layout";
import { Data, Journey, LinkAccessors, LinkAttrs, NodeAccessors, State, StateWriter, TLink, TNode } from "./typings";
declare class DataHandler {
    journeys: Journey[];
    nodes: TNode[];
    links: TLink[];
    nodeAccessors: NodeAccessors;
    linkAccessors: LinkAccessors;
    state: State;
    stateWriter: StateWriter;
    layout: Layout;
    constructor(state: State, stateWriter: StateWriter);
    prepareData(): Data;
    initializeNodes(nodeAttrs: {}[]): void;
    findNode(nodeId: string): TNode;
    addNode(attrs: {}): TNode;
    calculateNodeSizes(): void;
    calculateStartsAndEnds(): void;
    initializeLinks(): void;
    findLink(sourceId: string, targetId: string): TLink;
    addLink(attrs: LinkAttrs): TLink;
    computeLinks(): void;
    xGridSpacing(): number;
    yGridSpacing(nRows: number): number;
    positionNodes(): void;
}
export default DataHandler;
