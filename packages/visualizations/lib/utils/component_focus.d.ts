import { IEvents, IObject, IState, TD3Selection } from "./typings";
declare class ComponentFocus {
    el: TD3Selection;
    events: IEvents;
    state: IState;
    constructor(state: IState, el: TD3Selection, events: IEvents);
    onComponentHover(payload: {
        component: TD3Selection;
        options: IObject;
    }): void;
    draw(payload: {
        component: TD3Selection;
        options: IObject;
    }): void;
    onMouseOut(): void;
    onClick(configOptions: IObject): () => void;
    remove(): void;
}
export default ComponentFocus;
