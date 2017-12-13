// Type definitions for the Contiamo Process Flow visualization
import * as d3 from "d3-selection"
import Nodes from "./node"
import Link from "./link"

import {
  IAccessors,
  IChartStateObject,
  IEvents,
  IObject,
  IState,
  Partial,
  TD3Selection,
  TSeriesEl,
  TStateWriter
} from "../utils/typings"

export { IAccessors, IChartStateObject, IEvents, IObject, IState, Partial, TD3Selection, TSeriesEl, TStateWriter }

export type TLink = Link
export type TNode = Nodes

export type TElementSelection = d3.Selection<d3.BaseType, TNode | TLink, d3.BaseType, any>
export type TLinkSelection = d3.Selection<any, TLink, d3.BaseType, any>
export type TNodeSelection = d3.Selection<any, TNode, d3.BaseType, any>

// @TODO Import the d3 scale types
export type TScale = (size: number) => number

export interface IFocusElement {
  type?: string
  matchers?: IObject
}

export interface IJourney {
  size: number
  path: string[]
}

export interface ILinkAttrs {
  content?: IObject[]
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
  content?: IObject[]
  shape?: string
  size?: number
  stroke?: string
  id?: string
  label?: string
  labelPosition?: string
}

export interface IDataAccessors {
  nodes: (d: any) => any
  journeys: (d: any) => any
}

export interface INodeAccessors {
  color: (d: INodeAttrs) => string
  content: (d: INodeAttrs) => IObject[]
  shape: (d: INodeAttrs) => string
  size: (d: INodeAttrs) => number
  stroke: (d: INodeAttrs) => string
  id: (d: INodeAttrs) => string
  label: (d: INodeAttrs) => string
  labelPosition: (d: INodeAttrs) => string
}

export interface ILinkAccessors {
  content: (d: ILinkAttrs) => IObject[]
  dash: (d: ILinkAttrs) => string
  label: (d: ILinkAttrs) => string
  size: (d: ILinkAttrs) => number
  stroke: (d: ILinkAttrs) => string
  source: (d: ILinkAttrs) => TNode | undefined
  sourceId: (d: ILinkAttrs) => string | undefined
  target: (d: ILinkAttrs) => TNode | undefined
  targetId: (d: ILinkAttrs) => string | undefined
}

export interface IAccessorsObject {
  data: IDataAccessors
  node: INodeAccessors
  link: ILinkAccessors
}

export interface IConfig {
  borderColor: string
  duration: number
  focusElement?: IFocusElement
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
  numberFormatter: (x: number) => string
  showLinkFocusLabels: boolean
  showNodeFocusLabels: boolean
  uid: string
  verticalNodeSpacing: number
  visualizationName: string
  width: number
}

export interface IInputData {
  journeys?: IJourney[]
  nodes?: any[]
}

export interface IComputedState {
  canvas: IObject
  focus: IObject
  series: IObject
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
