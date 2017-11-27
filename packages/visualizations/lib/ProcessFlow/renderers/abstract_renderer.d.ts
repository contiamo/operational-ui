import { IConfig, IEvents, IFocus, IFocusElement, IState, TElementSelection, TLink, TLinkSelection, TNode, TNodeSelection, TScale, TSeriesEl } from "../typings";
declare abstract class AbstractRenderer {
    config: IConfig;
    data: TNode[] | TLink[];
    el: TSeriesEl;
    events: IEvents;
    state: IState;
    type: string;
    focusElementAccessor: string;
    constructor(state: IState, events: IEvents, el: TSeriesEl);
    onMouseOver(d: TLink | TNode, element: any): void;
    mouseOver(element: TElementSelection, d: TLink | TNode, hideLabel?: boolean): void;
    focusElement(focusElement: IFocusElement): void;
    highlightPath(focusElement: IFocusElement): void;
    highlight(element: TElementSelection, d: TLink | TNode, keepCurrent?: boolean): void;
    removeHighlights(): void;
    abstract focusPoint(element: TElementSelection, d: TLink | TNode): IFocus;
    onMouseOut(d: TLink | TNode, el: HTMLElement): void;
    draw(data: TNode[] | TLink[]): void;
    abstract updateDraw(): void;
    exit(elementGroups: TNodeSelection | TLinkSelection): void;
    abstract enterAndUpdate(enterEls: TNodeSelection | TLinkSelection): void;
    sizeScale(range: [number, number]): TScale;
}
export default AbstractRenderer;
