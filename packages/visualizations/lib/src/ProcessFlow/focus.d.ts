import AbstractFocus from "../utils/abstract_drawing_focus";
import { IFocus, IBreakdown, TNode, TD3SelectionNoData } from "./typings";
export interface IBreakdowns {
    inputs: IBreakdown[];
    outputs: IBreakdown[];
    startsHere: IBreakdown[];
    endsHere: IBreakdown[];
}
export declare type TContainerMethod = (container: TD3SelectionNoData) => TD3SelectionNoData;
declare class Focus extends AbstractFocus {
    uid: string;
    onElementHover(): (payload: {
        focusPoint: IFocus;
        d: any;
    }) => void;
    computeBreakdowns(node: TNode): IBreakdowns;
    computeBreakdownTotal(breakdowns: IBreakdown[]): number;
    addBreakdownContainer(content: TD3SelectionNoData): TD3SelectionNoData;
    addBreakdownTitle(title: string, subtitle?: string): TContainerMethod;
    appendBreakdown(container: TD3SelectionNoData): (item: IBreakdown) => void;
    addBreakdownBars(breakdownItems: IBreakdown[]): TContainerMethod;
    addBreakdownComment(comment: string): TContainerMethod;
}
export default Focus;
