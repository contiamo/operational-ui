import { IState, TDatum, TStateWriter } from "./typings";
declare class DataHandler {
    color: (d: TDatum) => string;
    data: TDatum[];
    name: (d: TDatum) => string;
    state: IState;
    stateWriter: TStateWriter;
    topNode: TDatum;
    total: number;
    value: (d: TDatum) => number;
    constructor(state: IState, stateWriter: TStateWriter);
    assignAccessors(): void;
    prepareData(): TDatum[];
    assignColors(node: any): void;
    assignNames(node: any): void;
    assignValues(node: any): void;
    checkDataValidity(): void;
}
export default DataHandler;
