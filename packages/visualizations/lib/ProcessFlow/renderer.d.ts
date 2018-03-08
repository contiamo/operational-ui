import Nodes from "./renderers/nodes";
import Links from "./renderers/links";
import { Data, EventBus, FocusElement, SeriesEl, State } from "./typings";
declare class Renderer {
    links: Links;
    nodes: Nodes;
    state: State;
    el: SeriesEl;
    events: EventBus;
    constructor(state: State, events: EventBus, el: SeriesEl);
    draw(data: Data): void;
    focusElement(focusElement: FocusElement): void;
    highlightPath(focusElement: FocusElement): void;
    close(): void;
}
export default Renderer;
