import { D3Selection, EventBus, State, StateWriter } from "./typings";
export declare const approxZero: (y: (x: number) => number, initialX: number) => number;
declare class RootLabel {
    private el;
    private events;
    private state;
    private stateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection);
    private update(payload);
}
export default RootLabel;
