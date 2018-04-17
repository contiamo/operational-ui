import { Datum, State, StateWriter } from "./typings";
declare class DataHandler {
    private color;
    private data;
    private id;
    private name;
    private state;
    private stateWriter;
    private total;
    private value;
    topNode: Datum;
    constructor(state: State, stateWriter: StateWriter);
    private assignAccessors();
    prepareData(): Datum[];
    private assignColors(node);
    private assignNames(node);
    private assignIDs(node);
    private assignValues(node);
    private checkDataValidity();
}
export default DataHandler;
