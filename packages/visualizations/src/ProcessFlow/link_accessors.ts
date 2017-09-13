import AccessorsFactory from "../utils/accessors_factory"
import { TLinkAttrs, TNode } from "./typings"

let defaultAccessors: any = {
  // Dash length of link. Default 0 (solid line)
  dash: function(link: TLinkAttrs): any {
    return link.dash || 0
  },
  // Information for the link's focus label
  focusLabel: function(link: TLinkAttrs): any {
    const defaultFocusLabel: any = { name: link.label, value: link.size }
    return link.focusLabel || [defaultFocusLabel]
  },
  // Label to display next to link - defaults to an empty string.
  label: function(link: TLinkAttrs): string {
    return link.label || ""
  },
  // Marker style for link. Defaults to "arrow".
  marker: function(link: TLinkAttrs): string {
    return link.marker || "arrow"
  },
  // Value for determining width of link. Default: 1.
  size: function(link: TLinkAttrs): number {
    return link.size || 1
  },
  // Color of link. Default: grey.
  stroke: function(link: TLinkAttrs): string {
    return link.stroke || "#bbb"
  },
  // Node at which the link starts. Default: undefined.
  source: function(link: TLinkAttrs): TNode {
    return link.source || undefined
  },
  // ID of node at which the link starts. Default: undefined.
  sourceId: function(link: TLinkAttrs): string {
    return link.sourceId || undefined
  },
  // Node at which the link ends. Default: undefined.
  target: function(link: TLinkAttrs): TNode {
    return link.target || undefined
  },
  // ID of node at which the link ends. Default: undefined.
  targetId: function(link: TLinkAttrs): string {
    return link.targetId
  }
}

export default AccessorsFactory(defaultAccessors)
