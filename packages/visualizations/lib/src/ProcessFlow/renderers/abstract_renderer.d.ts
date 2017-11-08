import { IFocusElement } from "../typings";
import { IConfig, IFocus, TEvents, TLink, TLinkSelection, TNode, TNodeSelection, TScale, TSeriesEl, IState } from "../typings";
declare abstract class AbstractRenderer {
    config: IConfig;
    data: TNode[] | TLink[];
    el: TSeriesEl;
    events: TEvents;
    state: IState;
    type: string;
    focusElementAccessor: string;
    constructor(state: IState, events: TEvents, el: TSeriesEl);
    onMouseOver(ctx: AbstractRenderer): (d: TLink | TNode) => void;
    mouseOver(element: any, d: TLink | TNode): void;
    focusElement(): (elementInfo: IFocusElement) => void;
    highlight(element: any, d: TLink | TNode): void;
    removeHighlights(): void;
    abstract focusPoint(element: any, d: TLink | TNode): IFocus;
    onMouseOut(ctx: AbstractRenderer, focusPoint: IFocus): any;
    draw(data: TNode[] | TLink[]): void;
    abstract updateDraw(): void;
    exit(elementGroups: TNodeSelection | TLinkSelection): void;
    abstract enterAndUpdate(enterEls: TNodeSelection | TLinkSelection): void;
    sizeScale(range: [number, number]): TScale;
}
export default AbstractRenderer;
