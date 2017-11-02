import Nodes from "./renderers/nodes";
import Links from "./renderers/links";
import { IState, TEvents, TSeriesEl, IData } from "./typings";
declare class Renderer {
    links: Links;
    nodes: Nodes;
    state: IState;
    el: TSeriesEl;
    constructor(state: IState, events: TEvents, el: TSeriesEl);
    draw(data: IData): void;
    close(): any;
}
export default Renderer;
