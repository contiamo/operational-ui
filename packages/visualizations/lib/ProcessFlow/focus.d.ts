import { D3Selection, EventBus, Focus, SeriesEl, State, StateWriter } from "./typings";
declare class ProcessFlowFocus implements Focus {
    el: SeriesEl;
    state: State;
    stateWriter: StateWriter;
    events: EventBus;
    constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection);
    private onElementHover(payload);
    private appendContent(container, content);
    private addNodeBreakdowns(content, datum);
    private addSingleNodeVisitsComment(content, datum);
    private getDrawingDimensions();
    private onElementOut();
    private onMouseLeave();
    remove(): void;
}
export default ProcessFlowFocus;
