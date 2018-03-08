import { D3Selection, EventBus, RendererOptions, State } from "../typings";
declare class Renderer {
    constructor(state: State, events: EventBus, el: D3Selection, options: RendererOptions);
}
export default Renderer;
