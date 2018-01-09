import { IEvents, IObject, IState, TD3Selection } from "./typings";
declare class ComponentFocus {
    el: TD3Selection;
    events: IEvents;
    isMouseOver: boolean;
    label: TD3Selection;
    state: IState;
    type: string;
    uid: string;
    constructor(state: IState, el: TD3Selection, events: IEvents, payload: IObject);
    onMouseOver(): void;
    onMouseOut(): void;
    onClick(configOptions: IObject): () => void;
    remove(): void;
}
export default ComponentFocus;
