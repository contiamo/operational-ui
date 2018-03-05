import Nodes from "./renderers/nodes";
import Links from "./renderers/links";
import { IFocusElement, IState, IEvents, TSeriesEl, IData } from "./typings";
declare class Renderer {
    links: Links;
    nodes: Nodes;
    state: IState;
    el: TSeriesEl;
    events: IEvents;
    constructor(state: IState, events: IEvents, el: TSeriesEl);
    draw(data: IData): void;
    focusElement(focusElement: IFocusElement): void;
    highlightPath(focusElement: IFocusElement): void;
    close(): void;
}
export default Renderer;
