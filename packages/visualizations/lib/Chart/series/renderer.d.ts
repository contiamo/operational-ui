import { D3Selection, Datum, EventBus, SingleRendererOptions, State } from "../typings";
declare class Renderer {
    constructor(state: State, events: EventBus, el: D3Selection, data: Datum[], options: SingleRendererOptions<any>, series: any);
}
export default Renderer;
