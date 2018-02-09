import { TD3Selection, TDatum, IObject, IState, TStateWriter, IEvents } from "./typings";
declare class Breadcrumb {
    el: TD3Selection;
    events: IEvents;
    state: IState;
    stateWriter: TStateWriter;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TD3Selection);
    updateHoverPath(payload: IObject): void;
    label(d: any, i: number): string;
    truncateNodeArray(nodeArray: TDatum[]): (TDatum | string)[];
    update(nodeArray: TDatum[]): void;
    onClick(d: TDatum | string): void;
}
export default Breadcrumb;
