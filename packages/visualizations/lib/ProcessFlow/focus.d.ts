import { IEvents, IFocus, IObject, IState, TD3Selection, TLink, TNode, TSeriesEl, TStateWriter } from "./typings";
declare class Focus {
    el: TSeriesEl;
    state: IState;
    stateWriter: TStateWriter;
    events: IEvents;
    constructor(state: IState, stateWriter: TStateWriter, events: IEvents, els: IObject);
    onElementHover(payload: {
        focusPoint: IFocus;
        d: TNode | TLink;
        hideLabel: boolean;
    }): void;
    appendContent(container: TD3Selection, content: IObject[]): void;
    addNodeBreakdowns(content: TSeriesEl, datum: TNode): void;
    addSingleNodeVisitsComment(content: TSeriesEl, datum: TNode): void;
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
export default Focus;
