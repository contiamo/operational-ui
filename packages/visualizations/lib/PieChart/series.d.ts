import AbstractRenderer from "./renderers/abstract_renderer";
import { Data, EventBus, RendererOptions, SeriesEl, State, StateWriter } from "./typings";
declare class Series {
    attributes: Data;
    data: Data;
    drawn: boolean;
    el: SeriesEl;
    events: EventBus;
    renderAs: () => RendererOptions[];
    renderer: AbstractRenderer;
    state: State;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: SeriesEl);
    assignData(): void;
    prepareData(): void;
    assignAccessors(): void;
    updateRenderer(): void;
    createRenderer(options: RendererOptions): any;
    draw(): void;
}
export default Series;
