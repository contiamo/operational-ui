import { extend, forEach } from "lodash/fp"
import { ILinkAccessors, ILinkAttrs, TNode } from "./typings"

class Link {
  accessors: ILinkAccessors
  attributes: ILinkAttrs
  dash: () => string
  label: () => string
  size: () => number
  source: () => TNode
  sourceId: () => string
  stroke: () => string
  target: () => TNode
  targetId: () => string

  constructor(linkAttributes: ILinkAttrs, accessors: ILinkAccessors) {
    this.accessors = accessors
    this.assignProperties(linkAttributes)
    this.assignAccessors()
  }

  assignProperties(linkAttributes: ILinkAttrs) {
    this.attributes = extend.convert({ immutable: false })({}, linkAttributes)
  }

  assignAccessors(): void {
    forEach.convert({ cap: false })((accessor: any, key: string) => {
      (this as any)[key] = () => accessor(this.attributes)
    })(this.accessors)
  }
}

export default Link
