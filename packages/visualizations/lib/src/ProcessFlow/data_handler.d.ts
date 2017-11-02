import Layout from "./layout";
import { TNode, TLink, IJourney, IData, IInputData, ILinkAttrs, TAccessors, IState, TStateWriter } from "./typings";
declare class DataHandler {
    journeys: IJourney[];
    nodes: TNode[];
    links: TLink[];
    nodeAccessors: TAccessors;
    linkAccessors: TAccessors;
    state: IState;
    stateWriter: TStateWriter;
    layout: Layout;
    constructor(state: IState, stateWriter: TStateWriter);
    prepareData(): IData;
    initializeNodes(data: IInputData): void;
    findNode(nodeId: string): TNode;
    setNodeAccessors(accessors: TAccessors): void;
    addNode(attrs: {}): TNode;
    calculateNodeSizes(): void;
    calculateStartsAndEnds(): void;
    initializeLinks(data: IInputData): void;
    findLink(sourceId: string, targetId: string): any;
    setLinkAccessors(accessors: TAccessors): void;
    addLink(attrs: ILinkAttrs): TLink;
    computeLinks(): void;
    xGridSpacing(): number;
    yGridSpacing(nRows: number): number;
    positionNodes(): void;
}
export default DataHandler;
