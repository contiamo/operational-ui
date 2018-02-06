import { TD3Selection, TDatum, IObject, IState, TStateWriter, IEvents } from "./typings";
declare class Breadcrumb {
    el: TD3Selection;
    events: IEvents;
    state: IState;
    stateWriter: TStateWriter;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TD3Selection);
    updateHoverPath(payload: IObject): void;
    breadcrumbPoints(d: any, i: number): string;
    label(d: TDatum, i: number): string;
    update(nodeArray: any[]): void;
    onClick(d: TDatum): void;
}
export default Breadcrumb;
