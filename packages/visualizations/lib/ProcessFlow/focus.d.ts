import { D3Selection, EventBus, Focus, State, StateWriter } from "./typings";
declare class ProcessFlowFocus implements Focus {
    private el;
    private state;
    private stateWriter;
    private events;
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
