import DataHandler from "./data_handler";
import Renderer from "./renderer";
import { IData, IEvents, IState, TSeriesEl, TStateWriter } from "./typings";
declare class Series {
    data: IData;
    dataHandler: DataHandler;
    drawn: boolean;
    el: TSeriesEl;
    events: IEvents;
    renderer: Renderer;
    state: IState;
    stateWriter: TStateWriter;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TSeriesEl);
    prepareData(): void;
    hasData(): boolean;
    draw(): void;
}
export default Series;
