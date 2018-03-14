import Layout from "./layout";
import { Data, Journey, LinkAccessors, NodeAccessors, State, StateWriter, TLink, TNode } from "./typings";
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
    private initializeNodes(nodeAttrs);
    private findNode(nodeId);
    private addNode(attrs);
    private calculateNodeSizes();
    private calculateStartsAndEnds();
    private initializeLinks();
    private findLink(sourceId, targetId);
    private addLink(attrs);
    private computeLinks();
    private xGridSpacing();
    private yGridSpacing(nRows);
    private positionNodes();
}
export default DataHandler;
