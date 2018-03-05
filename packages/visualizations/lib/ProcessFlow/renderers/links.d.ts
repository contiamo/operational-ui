import "d3-transition";
import { IConfig, IEvents, IFocus, IFocusElement, IState, TLink, TLinkSelection, TScale, TSeriesEl } from "../typings";
declare class Links {
    config: IConfig;
    data: TLink[];
    el: TSeriesEl;
    events: IEvents;
    state: IState;
    constructor(state: IState, events: IEvents, el: TSeriesEl);
    onMouseOver(d: TLink, element: HTMLElement): void;
    mouseOver(element: TLinkSelection, d: TLink, hideLabel?: boolean): void;
    focusElement(focusElement: IFocusElement): void;
    highlight(element: TLinkSelection, d: TLink, keepCurrent?: boolean): void;
    removeHighlights(): void;
    focusPoint(element: TLinkSelection, d: TLink): IFocus;
    onMouseOut(): void;
    draw(data: TLink[]): void;
    borderScale(scale: TScale): TScale;
    enterAndUpdate(groups: TLinkSelection): void;
    startPath(link: TLink): string;
}
export default Links;
