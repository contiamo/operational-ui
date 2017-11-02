import {
  IDefaultConfig,
  IKeyValueObject,
  INestedKeyValueObject,
  IState,
  TEvents,
  TSeriesEl,
  TStateWriter,
} from "../utils/typings"
import * as d3 from "d3-selection"
// Type definitions for the Contiamo Process Flow visualization
import Nodes from "./node"
import Link from "./link"

export {
  IDefaultConfig,
  IKeyValueObject,
  INestedKeyValueObject,
  IState,
  TEvents,
  TSeriesEl,
  TStateWriter,
}

export type TNode = Nodes
export type TLink = Link
export type TNodeSelection = d3.Selection<d3.BaseType, TNode, d3.BaseType, any>
export type TLinkSelection = d3.Selection<d3.BaseType, TLink, d3.BaseType, any>

//@TODO
export type TAccessors = any

// @TODO How do I import the d3 scale types?
export type TScale = (size: number) => number

export interface IFocusElement {
  type: "node" | "link"
  matchers: IKeyValueObject
}

export interface IConfig {
  borderColor: string
  duration: number
  focusElement?: IFocusElement // type ("node"/"link"), id / [sourceId, targetId]
  height: number
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
  uid: string
  verticalNodeSpacing: number
  visualizationName: string
  width: number
}

export interface IJourney {
  size: number
  path: string[]
}

export interface ILinkAttrs {
  dash?: number
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

export type TD3SelectionNoData = d3.Selection<d3.BaseType, null, Window, null>
