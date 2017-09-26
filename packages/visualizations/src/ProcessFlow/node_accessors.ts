import { uniqueId } from "lodash/fp"
import AccessorsFactory from "../utils/accessors_factory"
import { TNodeAttrs } from "./typings"

let defaultAccessors: any = {
  // Fill color - default white.
  color: (node: TNodeAttrs): string => {
    return node.color || "#fff"
  },

  // attribute by which nodes should be colored
  shape: (node: TNodeAttrs): string => {
    return node.shape || "diamond"
  },

  size: (node: TNodeAttrs): number => {
    return node.size || 1
  },

  stroke: (node: TNodeAttrs): string => {
    return node.stroke || "#000"
  },

  // Unique ID - defaults to a new unique string.
  id: (node: TNodeAttrs): string => {
    return node.id || uniqueId("node")
  },

  label: (node: TNodeAttrs): string => {
    return node.label || node.id || ""
  },

  labelPosition: (node: TNodeAttrs): string => {
    return node.labelPosition || "right"
  },
}

export default AccessorsFactory(defaultAccessors)
