import { uniqueId } from "lodash/fp"
import AccessorsFactory from "../utils/accessors_factory"
import { TNodeAttrs } from "./typings"

let defaultAccessors: any = {
  // Fill color - default white.
  color: function(node: TNodeAttrs): string {
    return node.color || "#fff"
  },

  // attribute by which nodes should be colored
  shape: function(node: TNodeAttrs): string {
    return node.shape || "diamond"
  },

  size: function(node: TNodeAttrs): number {
    return node.size || 1
  },

  stroke: function(node: TNodeAttrs): string {
    return node.stroke || "#000"
  },

  // Unique ID - defaults to a new unique string.
  id: function(node: TNodeAttrs): string {
    return node.id || uniqueId("node")
  },

  label: function(node: TNodeAttrs): string {
    return node.label || node.id || ""
  },

  labelPosition: function(node: TNodeAttrs): string {
    return node.labelPosition || "right"
  }
}

export default AccessorsFactory(defaultAccessors)
