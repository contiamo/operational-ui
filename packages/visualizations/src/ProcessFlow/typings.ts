// Type definitions for the Contiamo Process Flow visualization
import * as d3 from "d3-selection"
import Nodes from "./node"
import Link from "./link"

import { Accessor, Config, Object, Focus, Facade } from "../utils/typings"

export {
  Accessor,
  Accessors,
  Dimensions,
  EventBus,
  Object,
  State,
  Partial,
  Position,
  D3Selection,
  SeriesEl,
  StateWriter,
  Canvas,
} from "../utils/typings"

export interface ProcessFlowConfig extends Config {
  borderColor: string
  focusElement?: FocusElement
  focusLabelPosition: string
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
  verticalNodeSpacing: number
}

export type TLink = Link
export type TNode = Nodes

export type LinkSelection = d3.Selection<any, TLink, d3.BaseType, any>
export type NodeSelection = d3.Selection<any, TNode, d3.BaseType, any>

// @TODO Import the d3 scale types
export type Scale = (size: number) => number

export interface FocusElement {
  type?: "node" | "link" | "path"
  matchers?: Object<any>
  hideLabel?: boolean
}

export interface Journey {
  size: number
  path: string[]
}

export interface LinkAttrs {
  content?: Object<any>[]
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

export interface NodeAttrs {
  color?: string
  content?: Object<any>[]
  shape?: string
  size?: number
  stroke?: string
  id?: string
  label?: string
  labelPosition?: string
}

// @TODO
export interface DataAccessors {
  nodes: Accessor<any, any>
  journeys: Accessor<any, any>
}

export interface NodeAccessors {
  color: Accessor<NodeAttrs, string>
  content: Accessor<NodeAttrs, Object<any>[]>
  shape: Accessor<NodeAttrs, string>
  size: Accessor<NodeAttrs, number>
  stroke: Accessor<NodeAttrs, string>
  id: Accessor<NodeAttrs, string>
  label: Accessor<NodeAttrs, string>
  labelPosition: Accessor<NodeAttrs, string>
}

export interface LinkAccessors {
  content: (d: LinkAttrs) => Object<any>[]
  dash: (d: LinkAttrs) => string
  label: (d: LinkAttrs) => string
  size: (d: LinkAttrs) => number
  stroke: (d: LinkAttrs) => string
  source: (d: LinkAttrs) => TNode | undefined
  sourceId: (d: LinkAttrs) => string | undefined
  target: (d: LinkAttrs) => TNode | undefined
  targetId: (d: LinkAttrs) => string | undefined
}

export interface AccessorsObject {
  data: DataAccessors
  node: NodeAccessors
  link: LinkAccessors
}

export interface InputData {
  journeys?: Journey[]
  nodes?: any[]
}

export interface Computed {
  canvas: Object<any>
  focus: Object<any>
  series: Object<any>
}

export interface Data {
  journeys: Journey[]
  nodes: TNode[]
  links: TLink[]
}

export interface FocusPoint {
  offset: number
  type: string
  x: number
  y: number
  id: string
}

export interface HoverPayload {
  d: TNode | TLink
  focusPoint: FocusPoint
  hideLabel?: boolean
}

export type Focus = Focus<HoverPayload>

export type Facade = Facade<ProcessFlowConfig, AccessorsObject, Components, InputData>

export interface Components {
  focus: Focus<HoverPayload>
}

export interface Renderer {
  draw: (data: TLink[] | TNode[]) => void
  focusElement: (focusElement: FocusElement) => void
  highlight: (element: LinkSelection | NodeSelection, d: TLink | TNode, keepCurrent: boolean) => void
}
