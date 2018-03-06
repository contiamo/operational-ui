import * as d3 from "d3-selection";
import Nodes from "./node";
import Link from "./link";
import { IObject, Focus } from "../utils/typings";
export { IChartStateObject, IEvents, IObject, IState, Partial, TD3Selection, TSeriesEl, TStateWriter, Canvas } from "../utils/typings";
export declare type TLink = Link;
export declare type TNode = Nodes;
export declare type TLinkSelection = d3.Selection<any, TLink, d3.BaseType, any>;
export declare type TNodeSelection = d3.Selection<any, TNode, d3.BaseType, any>;
export declare type TScale = (size: number) => number;
export interface IFocusElement {
    type?: "node" | "link" | "path";
    matchers?: IObject;
    hideLabel?: boolean;
}
export interface IJourney {
    size: number;
    path: string[];
}
export interface ILinkAttrs {
    content?: IObject[];
    dash?: string;
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
    content?: IObject[];
    shape?: string;
    size?: number;
    stroke?: string;
    id?: string;
    label?: string;
    labelPosition?: string;
}
export interface IDataAccessors {
    nodes: (d: any) => any;
    journeys: (d: any) => any;
}
export interface INodeAccessors {
    color: (d: INodeAttrs) => string;
    content: (d: INodeAttrs) => IObject[];
    shape: (d: INodeAttrs) => string;
    size: (d: INodeAttrs) => number;
    stroke: (d: INodeAttrs) => string;
    id: (d: INodeAttrs) => string;
    label: (d: INodeAttrs) => string;
    labelPosition: (d: INodeAttrs) => string;
}
export interface ILinkAccessors {
    content: (d: ILinkAttrs) => IObject[];
    dash: (d: ILinkAttrs) => string;
    label: (d: ILinkAttrs) => string;
    size: (d: ILinkAttrs) => number;
    stroke: (d: ILinkAttrs) => string;
    source: (d: ILinkAttrs) => TNode | undefined;
    sourceId: (d: ILinkAttrs) => string | undefined;
    target: (d: ILinkAttrs) => TNode | undefined;
    targetId: (d: ILinkAttrs) => string | undefined;
}
export interface IAccessors {
    data: IDataAccessors;
    node: INodeAccessors;
    link: ILinkAccessors;
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
    numberFormatter: (x: number) => string;
    showLinkFocusLabels: boolean;
    showNodeFocusLabels: boolean;
    uid: string;
    verticalNodeSpacing: number;
    visualizationName: string;
    width: number;
}
export interface IInputData {
    journeys?: IJourney[];
    nodes?: any[];
}
export interface IComputedState {
    canvas: IObject;
    focus: IObject;
    series: IObject;
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
export declare type Focus = Focus<IFocus, TNode | TLink>;
export interface Components {
    focus: Focus<IFocus, TNode | TLink>;
}
