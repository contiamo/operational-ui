import { IObject, IState, TD3Selection } from "./typings";
declare class ComponentFocus {
    el: TD3Selection;
    events: any;
    isMouseOver: boolean;
    label: TD3Selection;
    state: IState;
    type: string;
    uid: string;
    constructor(state: IState, el: TD3Selection, events: any, payload: IObject);
    onMouseOver(): void;
    onMouseOut(): void;
    onClick(configOptions: IObject): () => void;
    remove(): void;
}
export default ComponentFocus;
