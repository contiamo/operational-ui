import { EventBus, SeriesEl, State, StateWriter } from "./typings";
declare class Series {
    private data;
    private dataHandler;
    private drawn;
    private el;
    private events;
    private renderer;
    private state;
    private stateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: SeriesEl);
    prepareData(): void;
    draw(): void;
}
export default Series;
