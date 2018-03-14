import { Data, EventBus, Renderer as RendererInterface, RendererOptions, SeriesEl, State, StateWriter } from "./typings";
declare class Series {
    attributes: any;
    data: Data;
    drawn: boolean;
    el: SeriesEl;
    events: EventBus;
    renderAs: () => RendererOptions[];
    renderer: RendererInterface;
    state: State;
    stateWriter: StateWriter;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: SeriesEl);
    assignData(): void;
    private prepareData();
    private assignAccessors();
    private updateRenderer();
    private createRenderer(options);
    draw(): void;
}
export default Series;
