import { extend, forEach } from "lodash/fp"
import { IBreakdown, INodeAttrs, INodeAccessors, TLink } from "./typings"

class Node {
  accessors: INodeAccessors
  attributes: INodeAttrs
  color: () => string
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

  constructor(nodeAttributes: INodeAttrs, accessors: INodeAccessors) {
    this.accessors = accessors
    this.attributes = this.assignAttributes(nodeAttributes)
    this.assignAccessors()
  }

  assignAttributes(nodeAttributes: INodeAttrs): INodeAttrs {
    return extend.convert({ immutable: false })({})(nodeAttributes)
  }

  assignAccessors(): void {
    forEach.convert({ cap: false })((accessor: any, key: string) => {
      ;(this as any)[key] = () => accessor(this.attributes)
    })(this.accessors)
  }
}

export default Node
