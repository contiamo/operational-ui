import Nodes from "./renderers/nodes";
import Links from "./renderers/links";
import { IState, IEvents, TSeriesEl, IData } from "./typings";
declare class Renderer {
    links: Links;
    nodes: Nodes;
    state: IState;
    el: TSeriesEl;
    constructor(state: IState, events: IEvents, el: TSeriesEl);
    draw(data: IData): void;
    close(): void;
}
export default Renderer;
