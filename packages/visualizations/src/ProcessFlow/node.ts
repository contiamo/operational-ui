import { extend, forEach } from "lodash/fp"
import { NodeAttrs, NodeAccessors, TLink } from "./typings"

class Node {
  accessors: NodeAccessors
  attributes: NodeAttrs
  color: () => string
  content: () => { [key: string]: any }[]
  id: () => string
  journeyEnds: number = 0
  journeyStarts: number = 0
  label: () => string
  labelPosition: () => string
  shape: () => string
  singleNodeJourneys: number = 0
  size: () => number
  sourceLinks: TLink[]
  stroke: () => string
  targetLinks: TLink[]
  x: number
  y: number

  constructor(nodeAttributes: NodeAttrs, accessors: NodeAccessors) {
    this.accessors = accessors
    this.attributes = this.assignAttributes(nodeAttributes)
    this.assignAccessors()
  }

  private assignAttributes(nodeAttributes: NodeAttrs): NodeAttrs {
    return extend.convert({ immutable: false })({})(nodeAttributes)
  }

  private assignAccessors(): void {
    forEach.convert({ cap: false })((accessor: any, key: string) => {
      ;(this as any)[key] = () => accessor(this.attributes)
    })(this.accessors)
  }
}

export default Node
