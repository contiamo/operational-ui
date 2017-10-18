import { extend } from "lodash/fp"
import { TLink, TAccessors, INodeAttrs, IBreakdown } from "./typings"

class Node {
  accessors: TAccessors
  attributes: INodeAttrs
  x: number
  y: number
  sourceLinks: TLink[]
  targetLinks: TLink[]
  inputsBreakdown: IBreakdown[]
  outputsBreakdown: IBreakdown[]

  constructor(nodeAttributes: INodeAttrs, accessors: TAccessors) {
    this.accessors = accessors
    this.assignProperties(nodeAttributes)
  }

  assignProperties(nodeAttributes: INodeAttrs): void {
    this.attributes = extend.convert({ immutable: false })({})(nodeAttributes)
  }

  color(): string {
    return this.accessors.color(this.attributes)
  }

  shape(): string {
    return this.accessors.shape(this.attributes)
  }

  size(): number {
    return this.accessors.size(this.attributes)
  }

  stroke(): string {
    return this.accessors.stroke(this.attributes)
  }

  id(): string {
    return this.accessors.id(this.attributes)
  }

  label(): string {
    return this.accessors.label(this.attributes)
  }

  labelPosition(): string {
    return this.accessors.labelPosition(this.attributes)
  }
}

export default Node
