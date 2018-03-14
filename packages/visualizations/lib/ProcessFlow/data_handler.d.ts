import { Data, State, StateWriter } from "./typings";
declare class DataHandler {
    private journeys;
    private nodes;
    private links;
    private nodeAccessors;
    private linkAccessors;
    private state;
    private stateWriter;
    private layout;
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
