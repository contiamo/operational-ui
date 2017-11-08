import Renderer from "./renderer";
import { IState, TStateWriter, TEvents, TSeriesEl } from "./typings";
declare class Series {
    data: any;
    dataHandler: any;
    drawn: boolean;
    el: TSeriesEl;
    events: TEvents;
    renderer: Renderer;
    state: IState;
    stateWriter: TStateWriter;
    constructor(state: IState, stateWriter: TStateWriter, events: TEvents, el: TSeriesEl);
    prepareData(): void;
    hasData(): boolean;
    draw(): void;
}
export default Series;
