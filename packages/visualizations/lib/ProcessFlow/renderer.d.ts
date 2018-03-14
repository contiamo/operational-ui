import { Data, EventBus, SeriesEl, State } from "./typings";
declare class Renderer {
    private links;
    private nodes;
    private state;
    private el;
    private events;
    constructor(state: State, events: EventBus, el: SeriesEl);
    draw(data: Data): void;
    private focusElement(focusElement);
    private highlightPath(focusElement);
    close(): void;
}
export default Renderer;
