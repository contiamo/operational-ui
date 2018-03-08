import { ClickPayload, D3Selection, Datum, EventBus, HoverPayload, State, StateWriter } from "./typings";
declare class Breadcrumb {
    el: D3Selection;
    events: EventBus;
    state: State;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection);
    updateHoverPath(payload: HoverPayload | ClickPayload): void;
    label(d: any, i: number): string;
    truncateNodeArray(nodeArray: Datum[]): (Datum | string)[];
    backgroundColor(d: any): string;
    labelColor(d: Datum): string;
    update(nodeArray: Datum[]): void;
    onClick(d: Datum | string): void;
}
export default Breadcrumb;
