import { IDefaultConfig, IKeyValueObject, INestedKeyValueObject, IState, TEvents, TSeriesEl, TStateWriter } from "../utils/typings";
import * as d3 from "d3-selection";
import Nodes from "./node";
import Link from "./link";
export { IDefaultConfig, IKeyValueObject, INestedKeyValueObject, IState, TEvents, TSeriesEl, TStateWriter };
export declare type TNode = Nodes;
export declare type TLink = Link;
export declare type TNodeSelection = d3.Selection<d3.BaseType, TNode, d3.BaseType, any>;
export declare type TLinkSelection = d3.Selection<d3.BaseType, TLink, d3.BaseType, any>;
export declare type TAccessors = any;
export declare type TScale = (size: number) => number;
export interface IFocusElement {
    type: "node" | "link";
    matchers: IKeyValueObject;
}
export interface IConfig {
    borderColor: string;
    duration: number;
    focusElement?: IFocusElement;
    height: number;
    hidden: boolean;
    highlightColor: string;
    horizontalNodeSpacing: number;
    labelOffset: number;
    linkBorderWidth: number;
    maxLinkWidth: number;
    maxNodeSize: number;
    minLinkWidth: number;
    minNodeSize: number;
    nodeBorderWidth: number;
    showLinkFocusLabels: boolean;
    showNodeFocusLabels: boolean;
    uid: string;
    verticalNodeSpacing: number;
    visualizationName: string;
    width: number;
}
export interface IJourney {
    size: number;
    path: string[];
}
export interface ILinkAttrs {
    dash?: number;
    focusLabel?: any;
    label?: string;
    size: number;
    source: TNode;
    sourceId: string;
    stroke?: string;
    target: TNode;
    targetId: string;
}
export interface INodeAttrs {
    color?: string;
    shape?: string;
    size?: number;
    stroke?: string;
    id?: string;
    label?: string;
    labelPosition?: string;
}
export interface IInputData {
    journeys?: IJourney[];
    nodes?: any[];
    nodeAccessors?: any;
    linkAccessors?: any;
    el?: any;
}
export interface IData {
    journeys: IJourney[];
    nodes: TNode[];
    links: TLink[];
}
export interface IFocus {
    offset: number;
    type: string;
    x: number;
    y: number;
    id: string;
}
export interface IBreakdown {
    label?: string;
    size: number;
    percentage: number;
}
export declare type TD3SelectionNoData = d3.Selection<d3.BaseType, null, Window, null>;
