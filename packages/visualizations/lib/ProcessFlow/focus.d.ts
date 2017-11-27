import AbstractFocus from "../utils/focus";
import { IFocus, IObject, TD3Selection, TLink, TNode, TSeriesEl } from "./typings";
declare class Focus extends AbstractFocus {
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
}
export default Focus;
