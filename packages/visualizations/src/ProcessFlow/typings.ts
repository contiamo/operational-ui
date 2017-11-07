// Type definitions for the Contiamo Process Flow visualization
import * as d3 from "d3-selection"
import Nodes from "./node"
import Link from "./link"

import {
  IAccessors,
  IAccessorsObject,
  IDefaultConfig,
  IEvents,
  INestedObject,
  IObject,
  IState,
  Partial,
  TD3Selection,
  TSeriesEl,
  TStateWriter,
} from "../utils/typings"

export {
  IAccessors,
  IAccessorsObject,
  IDefaultConfig,
  IEvents,
  INestedObject,
  IObject,
  IState,
  Partial,
  TD3Selection,
  TSeriesEl,
  TStateWriter,
}

export type TLink = Link
export type TNode = Nodes

export type TAccessors = IObject

export type TElementSelection = d3.Selection<d3.BaseType, TNode | TLink, d3.BaseType, any>
export type TLinkSelection = d3.Selection<any, TLink, d3.BaseType, any>
export type TNodeSelection = d3.Selection<any, TNode, d3.BaseType, any>

// @TODO Import the d3 scale types
export type TScale = (size: number) => number

export interface IFocusElement {
  type: "node" | "link"
  matchers: IObject
}

export interface IConfig extends IDefaultConfig {
  borderColor: string
  focusElement?: IFocusElement
  hidden: boolean
  highlightColor: string
  horizontalNodeSpacing: number
  labelOffset: number
  linkBorderWidth: number
  maxLinkWidth: number
  maxNodeSize: number
  minLinkWidth: number
  minNodeSize: number
  nodeBorderWidth: number
  showLinkFocusLabels: boolean
  showNodeFocusLabels: boolean
  verticalNodeSpacing: number
}

export interface IJourney {
  size: number
  path: string[]
}

export interface ILinkAttrs {
  dash?: string
  focusLabel?: any
  label?: string
  size: number
  source: TNode
  sourceId: string
  stroke?: string
  target: TNode
  targetId: string
}

export interface INodeAttrs {
  color?: string
  shape?: string
  size?: number
  stroke?: string
  id?: string
  label?: string
  labelPosition?: string
}

export interface IInputData {
  journeys?: IJourney[]
  nodes?: any[]
  nodeAccessors?: any
  linkAccessors?: any
  el?: any
}

export interface IData {
  journeys: IJourney[]
  nodes: TNode[]
  links: TLink[]
}

export interface IFocus {
  offset: number
  type: string
  x: number
  y: number
  id: string
}

export interface IBreakdown {
  label?: string
  size: number
  percentage: number
}
