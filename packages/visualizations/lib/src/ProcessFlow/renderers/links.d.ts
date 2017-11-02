import AbstractRenderer from "./abstract_renderer";
import "d3-transition";
import { TLink, TScale, IFocus, TLinkSelection } from "../typings";
declare class Links extends AbstractRenderer {
    type: string;
    focusElementAccessor: string;
    data: TLink[];
    updateDraw(): void;
    linkBorderScale(scale: TScale): TScale;
    enterAndUpdate(linkGroups: TLinkSelection): void;
    linkStartPath(link: TLink): string;
    linkPath(link: TLink): string;
    highlight(element: any, d: TLink): void;
    focusPoint(element: any, d: TLink): IFocus;
}
export default Links;
