import { D3Selection, EventBus, Focus, HoverPayload, Object, SeriesEl, State, StateWriter, TNode } from "./typings";
declare class ProcessFlowFocus implements Focus {
    el: SeriesEl;
    state: State;
    stateWriter: StateWriter;
    events: EventBus;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection);
    onElementHover(payload: HoverPayload): void;
    appendContent(container: D3Selection, content: Object<any>[]): void;
    addNodeBreakdowns(content: SeriesEl, datum: TNode): void;
    addSingleNodeVisitsComment(content: SeriesEl, datum: TNode): void;
    getDrawingDimensions(): {
        xMax: number;
        xMin: number;
        yMax: number;
        yMin: number;
    };
    onElementOut(): void;
    onMouseLeave(): void;
    remove(): void;
}
export default ProcessFlowFocus;
