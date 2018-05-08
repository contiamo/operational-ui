import { D3Selection, Datum, EventBus, RendererOptions, State } from "../typings";
declare class Renderer {
    constructor(state: State, events: EventBus, el: D3Selection, data: Datum[], options: RendererOptions<any>, series: any);
}
export default Renderer;
