import AccessorsFactory from "../utils/accessors_factory"
import { TLinkAttrs, TNode } from "./typings"

let defaultAccessors: any = {
  // Dash length of link. Default 0 (solid line)
  dash: (link: TLinkAttrs): any => {
    return link.dash || 0
  },
  // Information for the link's focus label
  focusLabel: (link: TLinkAttrs): any => {
    const defaultFocusLabel: any = { name: link.label, value: link.size }
    return link.focusLabel || [defaultFocusLabel]
  },
  // Label to display next to link - defaults to an empty string.
  label: (link: TLinkAttrs): string => {
    return link.label || ""
  },
  // Marker style for link. Defaults to "arrow".
  marker: (link: TLinkAttrs): string => {
    return link.marker || "arrow"
  },
  // Value for determining width of link. Default: 1.
  size: (link: TLinkAttrs): number => {
    return link.size || 1
  },
  // Color of link. Default: grey.
  stroke: (link: TLinkAttrs): string => {
    return link.stroke || "#bbb"
  },
  // Node at which the link starts. Default: undefined.
  source: (link: TLinkAttrs): TNode => {
    return link.source || undefined
  },
  // ID of node at which the link starts. Default: undefined.
  sourceId: (link: TLinkAttrs): string => {
    return link.sourceId || undefined
  },
  // Node at which the link ends. Default: undefined.
  target: (link: TLinkAttrs): TNode => {
    return link.target || undefined
  },
  // ID of node at which the link ends. Default: undefined.
  targetId: (link: TLinkAttrs): string => {
    return link.targetId
  },
}

export default AccessorsFactory(defaultAccessors)
