import { extend } from "lodash/fp"
import { ILinkAccessors, ILinkAttrs, TNode } from "./typings"

class Link {
  accessors: ILinkAccessors
  attributes: ILinkAttrs

  constructor(linkAttributes: ILinkAttrs, accessors: ILinkAccessors) {
    this.accessors = accessors
    this.assignProperties(linkAttributes)
  }

  assignProperties(linkAttributes: ILinkAttrs) {
    this.attributes = extend.convert({ immutable: false })({}, linkAttributes)
  }

  dash(): string {
    return this.accessors.dash(this.attributes)
  }

  label(): string {
    return this.accessors.label(this.attributes)
  }

  size(): number {
    return this.accessors.size(this.attributes)
  }

  source(): TNode {
    return this.accessors.source(this.attributes)
  }

  sourceId(): string {
    return this.accessors.sourceId(this.attributes)
  }

  stroke(): string {
    return this.accessors.stroke(this.attributes)
  }

  target(): TNode {
    return this.accessors.target(this.attributes)
  }

  targetId(): string {
    return this.accessors.targetId(this.attributes)
  }
}

export default Link
