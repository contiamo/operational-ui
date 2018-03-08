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
    assignAccessors(): void;
    prepareData(): Datum[];
    assignColors(node: any): void;
    assignNames(node: any): void;
    assignValues(node: any): void;
    checkDataValidity(): void;
}
export default DataHandler;
