// Type definitions for the Contiamo Process Flow visualization
import * as d3 from "d3-selection"
import Nodes from "./node"
import Link from "./link"

import { Accessor, Config, D3Selection, Focus, Facade } from "../shared/typings"

export {
  Accessor,
  Accessors,
  Canvas,
  D3Selection,
  Dimensions,
  EventBus,
  Position,
  State,
  StateWriter,
} from "../shared/typings"

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

export type Scale = (size: number) => number

export interface FocusElement {
  type?: "node" | "link" | "path"
  matchers?: { [key: string]: any }
  hideLabel?: boolean
}

export interface Journey {
  size: number
  path: string[]
}

export interface LinkAttrs {
  content?: { [key: string]: any }[]
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
  content?: { [key: string]: any }[]
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
  content: Accessor<NodeAttrs, { [key: string]: any }[]>
  shape: Accessor<NodeAttrs, string>
  size: Accessor<NodeAttrs, number>
  stroke: Accessor<NodeAttrs, string>
  id: Accessor<NodeAttrs, string>
  label: Accessor<NodeAttrs, string>
  labelPosition: Accessor<NodeAttrs, string>
}

export interface LinkAccessors {
  content: (d: LinkAttrs) => { [key: string]: any }[]
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
  canvas: { [key: string]: any }
  focus: { [key: string]: any }
  series: { [key: string]: any }
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
  highlight: (element: D3Selection, d: TLink | TNode, keepCurrent: boolean) => void
}
