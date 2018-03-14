import "d3-transition";
import { EventBus, FocusElement, LinkSelection, Renderer, SeriesEl, State, TLink } from "../typings";
declare class Links implements Renderer {
    private config;
    private data;
    private el;
    private events;
    private state;
    constructor(state: State, events: EventBus, el: SeriesEl);
    private onMouseOver(d, element);
    private mouseOver(element, d, hideLabel?);
    focusElement(focusElement: FocusElement): void;
    highlight(element: LinkSelection, d: TLink, keepCurrent?: boolean): void;
    private removeHighlights();
    private focusPoint(element, d);
    private onMouseOut();
    draw(data: TLink[]): void;
    private borderScale(scale);
    private enterAndUpdate(groups);
    private startPath(link);
}
export default Links;
