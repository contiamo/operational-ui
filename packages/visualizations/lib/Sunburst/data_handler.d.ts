import { Datum, State, StateWriter } from "./typings";
declare class DataHandler {
    color: (d: Datum) => string;
    data: Datum[];
    name: (d: Datum) => string;
    state: State;
    stateWriter: StateWriter;
    topNode: Datum;
    total: number;
    value: (d: Datum) => number;
    constructor(state: State, stateWriter: StateWriter);
    private assignAccessors();
    prepareData(): Datum[];
    private assignColors(node);
    private assignNames(node);
    private assignValues(node);
    private checkDataValidity();
}
export default DataHandler;
