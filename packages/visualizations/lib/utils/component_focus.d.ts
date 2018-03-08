import { ComponentHoverPayload, D3Selection, EventBus, Object, State } from "./typings";
declare class ComponentFocus {
    el: D3Selection;
    events: EventBus;
    state: State;
    constructor(state: State, el: D3Selection, events: EventBus);
    onComponentHover(payload: ComponentHoverPayload): void;
    draw(payload: ComponentHoverPayload): void;
    onMouseOut(): void;
    onClick(configOptions: Object<any>): () => void;
    remove(): void;
}
export default ComponentFocus;
