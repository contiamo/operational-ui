import { extend } from "lodash/fp"
import { TNode, TLinkAttrs, TAccessors } from "./typings"

class Link {
  accessors: TAccessors
  attributes: TLinkAttrs

  constructor(linkAttributes: TLinkAttrs, accessors: TAccessors) {
    this.accessors = accessors
    this.assignProperties(linkAttributes)
  }

  assignProperties(linkAttributes: TLinkAttrs) {
    this.attributes = extend.convert({ immutable: false })({}, linkAttributes)
  }

  dash(): number {
    return this.accessors.dash(this.attributes)
  }

  focusLabel(): string {
    return this.accessors.focusLabel(this.attributes)
  }

  label(): string {
    return this.accessors.label(this.attributes)
  }

  marker(): string {
    return this.accessors.marker(this.attributes)
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
