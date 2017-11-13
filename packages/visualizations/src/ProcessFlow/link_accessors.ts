import AccessorsFactory from "../utils/accessors_factory"
import { ILinkAttrs, TNode } from "./typings"

const defaultAccessors: any = {
  // Dash length of link. Default "0" (solid line)
  dash: (link: ILinkAttrs): string => {
    return link.dash || "0"
  },
  // Label to display next to link - defaults to an empty string.
  label: (link: ILinkAttrs): string => {
    return link.label || link.source.label() + " → " + link.target.label() || ""
  },
  // Value for determining width of link. Default: 1.
  size: (link: ILinkAttrs): number => {
    return link.size || 1
  },
  // Color of link. Default: grey.
  stroke: (link: ILinkAttrs): string => {
    return link.stroke || "#bbb"
  },
  // Node at which the link starts, if available.
  source: (link: ILinkAttrs): TNode | undefined => {
    return link.source
  },
  // ID of node at which the link starts, if available.
  sourceId: (link: ILinkAttrs): string | undefined => {
    return link.sourceId
  },
  // Node at which the link ends, if available.
  target: (link: ILinkAttrs): TNode | undefined => {
    return link.target
  },
  // ID of node at which the link ends, if available.
  targetId: (link: ILinkAttrs): string | undefined => {
    return link.targetId
  },
}

export default AccessorsFactory(defaultAccessors)
