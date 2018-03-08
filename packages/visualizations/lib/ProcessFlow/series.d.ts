import DataHandler from "./data_handler";
import Renderer from "./renderer";
import { Data, EventBus, SeriesEl, State, StateWriter } from "./typings";
declare class Series {
    data: Data;
    dataHandler: DataHandler;
    drawn: boolean;
    el: SeriesEl;
    events: EventBus;
    renderer: Renderer;
    state: State;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: SeriesEl);
    prepareData(): void;
    hasData(): boolean;
    draw(): void;
}
export default Series;
