import Layout from "./layout";
import { TNode, TLink, IJourney, IData, ILinkAttrs, IState, TStateWriter, INodeAccessors, ILinkAccessors } from "./typings";
declare class DataHandler {
    journeys: IJourney[];
    nodes: TNode[];
    links: TLink[];
    nodeAccessors: INodeAccessors;
    linkAccessors: ILinkAccessors;
    state: IState;
    stateWriter: TStateWriter;
    layout: Layout;
    constructor(state: IState, stateWriter: TStateWriter);
    prepareData(): IData;
    initializeNodes(nodeAttrs: {}[]): void;
    findNode(nodeId: string): TNode;
    addNode(attrs: {}): TNode;
    calculateNodeSizes(): void;
    calculateStartsAndEnds(): void;
    initializeLinks(): void;
    findLink(sourceId: string, targetId: string): TLink;
    addLink(attrs: ILinkAttrs): TLink;
    computeLinks(): void;
    xGridSpacing(): number;
    yGridSpacing(nRows: number): number;
    positionNodes(): void;
}
export default DataHandler;
