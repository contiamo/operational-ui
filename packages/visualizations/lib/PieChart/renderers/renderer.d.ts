import { IEvents, IObject, IState, TD3Selection } from "../typings";
declare class Renderer {
    constructor(state: IState, events: IEvents, el: TD3Selection, options: IObject);
}
export default Renderer;
