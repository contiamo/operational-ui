import { EventBus, SeriesEl, State, StateWriter } from "./typings";
declare class Series {
    private attributes;
    private data;
    private drawn;
    private el;
    private events;
    private renderAs;
    private renderer;
    private state;
    private stateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: SeriesEl);
    assignData(): void;
    private prepareData();
    private assignAccessors();
    private updateRenderer();
    private createRenderer(options);
    draw(): void;
}
export default Series;
