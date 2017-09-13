// Type definitions for the Contiamo Process Flow visualization
import Nodes from "./node"
import Link from "./link"

type TNode = Nodes
type TLink = Link

//@TODO
type TAccessors = any

interface TJourney {
  size: number
  path: string[]
}

interface TLinkAttrs {
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

interface TNodeAttrs {
  color?: string
  shape?: string
  size?: number
  stroke?: string
  id?: string
  label?: string
  labelPosition?: string
}

interface TInputData {
  journeys: TJourney[]
  nodes: any[]
  links: any[]
  nodeAccessors?: any
  linkAccessors?: any
}

interface TData {
  journeys: TJourney[]
  nodes: TNode[]
  links: TLink[]
}

interface TProps {
  width: number
  height: number
  maxNodeSize: number
  maxLinkWidth: number
  labelOffset: number
  linkStroke: string
  arrowFill: string
}

export { TAccessors, TData, TInputData, TJourney, TLink, TLinkAttrs, TNode, TNodeAttrs, TProps }
