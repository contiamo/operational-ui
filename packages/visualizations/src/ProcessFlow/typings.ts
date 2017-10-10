import { TState, TStateWriter, TEvents, TSeriesEl } from "../utils/typings"
import * as d3 from "d3-selection"
// Type definitions for the Contiamo Process Flow visualization
import Nodes from "./node"
import Link from "./link"

type TNode = Nodes
type TLink = Link
type TNodeSelection = d3.Selection<d3.BaseType, TNode, Element, null>
type TLinkSelection = d3.Selection<d3.BaseType, TLink, Element, null>

//@TODO
type TAccessors = any

// @TODO How do I import the d3 scale types?
type TScale = (size: number) => number

interface IConfig {
  arrowFill: string
  duration: number
  height: number
  labelOffset: number
  labelPadding: number
  linkStroke: string
  maxLinkWidth: number
  maxNodeSize: number
  minLinkWidth: number
  minNodeSize: number
  showLinkFocusLabels: boolean
  showNodeFocusLabels: boolean
  uid: string
  visualizationName: string
  width: number
}

interface IJourney {
  size: number
  path: string[]
}

interface ILinkAttrs {
  dash?: number
  focusLabel?: any
  label?: string
  marker?: string
  size: number
  source: TNode
  sourceId: string
  stroke?: string
  target: TNode
  targetId: string
}

interface INodeAttrs {
  color?: string
  shape?: string
  size?: number
  stroke?: string
  id?: string
  label?: string
  labelPosition?: string
}

interface IInputData {
  journeys?: IJourney[]
  nodes?: any[]
  nodeAccessors?: any
  linkAccessors?: any
  el?: any
}

interface IData {
  journeys: IJourney[]
  nodes: TNode[]
  links: TLink[]
}

interface IFocus {
  offset: number
  type: string
  x: number
  y: number
  id: string
}
export {
  IConfig,
  IData,
  IFocus,
  IInputData,
  IJourney,
  ILinkAttrs,
  INodeAttrs,
  TAccessors,
  TEvents,
  TLink,
  TLinkSelection,
  TNode,
  TNodeSelection,
  TScale,
  TSeriesEl,
  TState,
  TStateWriter,
}
