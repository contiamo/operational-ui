import AccessorsFactory from "../utils/accessors_factory"
import { ILinkAttrs, TNode } from "./typings"

let defaultAccessors: any = {
  // Dash length of link. Default 0 (solid line)
  dash: (link: ILinkAttrs): any => {
    return link.dash || 0
  },
  // Information for the link's focus label
  focusLabel: (link: ILinkAttrs): any => {
    const defaultFocusLabel: any = { name: link.label, value: link.size }
    return link.focusLabel || [defaultFocusLabel]
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
  // Node at which the link starts. Default: undefined.
  source: (link: ILinkAttrs): TNode => {
    return link.source || undefined
  },
  // ID of node at which the link starts. Default: undefined.
  sourceId: (link: ILinkAttrs): string => {
    return link.sourceId || undefined
  },
  // Node at which the link ends. Default: undefined.
  target: (link: ILinkAttrs): TNode => {
    return link.target || undefined
  },
  // ID of node at which the link ends. Default: undefined.
  targetId: (link: ILinkAttrs): string => {
    return link.targetId
  },
}

export default AccessorsFactory(defaultAccessors)
