import AbstractRenderer from "./abstract_renderer";
import "d3-transition";
import { IFocus, TLink, TLinkSelection, TScale } from "../typings";
declare class Links extends AbstractRenderer {
    type: string;
    focusElementAccessor: string;
    data: TLink[];
    updateDraw(): void;
    linkBorderScale(scale: TScale): TScale;
    enterAndUpdate(linkGroups: TLinkSelection): void;
    linkStartPath(link: TLink): string;
    linkPath(link: TLink): string;
    highlight(element: TLinkSelection, d: TLink): void;
    focusPoint(element: TLinkSelection, d: TLink): IFocus;
}
export default Links;
