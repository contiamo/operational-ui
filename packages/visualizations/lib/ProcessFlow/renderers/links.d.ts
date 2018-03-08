import "d3-transition";
import { EventBus, FocusElement, FocusPoint, LinkSelection, ProcessFlowConfig, Scale, SeriesEl, State, TLink } from "../typings";
declare class Links {
    config: ProcessFlowConfig;
    data: TLink[];
    el: SeriesEl;
    events: EventBus;
    state: State;
    constructor(state: State, events: EventBus, el: SeriesEl);
    onMouseOver(d: TLink, element: HTMLElement): void;
    mouseOver(element: LinkSelection, d: TLink, hideLabel?: boolean): void;
    focusElement(focusElement: FocusElement): void;
    highlight(element: LinkSelection, d: TLink, keepCurrent?: boolean): void;
    removeHighlights(): void;
    focusPoint(element: LinkSelection, d: TLink): FocusPoint;
    onMouseOut(): void;
    draw(data: TLink[]): void;
    borderScale(scale: Scale): Scale;
    enterAndUpdate(groups: LinkSelection): void;
    startPath(link: TLink): string;
}
export default Links;
