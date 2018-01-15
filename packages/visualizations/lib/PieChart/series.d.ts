import AbstractRenderer from "./renderers/abstract_renderer";
import { TDatum, IEvents, IObject, IState, TSeriesEl, TStateWriter } from "./typings";
declare class Series {
    attributes: IObject;
    data: TDatum[];
    drawn: boolean;
    el: TSeriesEl;
    events: IEvents;
    renderAs: () => IObject[];
    renderer: AbstractRenderer;
    state: IState;
    stateWriter: TStateWriter;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TSeriesEl);
    assignData(): void;
    prepareData(): void;
    assignAccessors(): void;
    updateRenderer(): void;
    createRenderer(options: IObject): any;
    hasData(): boolean;
    draw(): void;
}
export default Series;
