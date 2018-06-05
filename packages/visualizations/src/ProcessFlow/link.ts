import { extend, forEach } from "lodash/fp"
import { LinkAccessors, LinkAttrs, TNode } from "./typings"

class Link {
  accessors: LinkAccessors
  attributes: LinkAttrs
  content: () => { [key: string]: any }[]
  dash: () => string
  label: () => string
  size: () => number
  source: () => TNode
  sourceId: () => string
  stroke: () => string
  target: () => TNode
  targetId: () => string

  constructor(linkAttributes: LinkAttrs, accessors: LinkAccessors) {
    this.accessors = accessors
    this.attributes = this.assignAttributes(linkAttributes)
    this.assignAccessors()
  }

  private assignAttributes(linkAttributes: LinkAttrs): LinkAttrs {
    return extend.convert({ immutable: false })({}, linkAttributes)
  }

  private assignAccessors(): void {
    forEach.convert({ cap: false })((accessor: any, key: string) => {
      ;(this as any)[key] = () => accessor(this.attributes)
    })(this.accessors)
  }
}

export default Link
