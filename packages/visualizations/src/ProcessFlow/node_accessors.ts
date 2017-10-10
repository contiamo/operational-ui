import { uniqueId } from "lodash/fp"
import AccessorsFactory from "../utils/accessors_factory"
import { INodeAttrs } from "./typings"

let defaultAccessors: any = {
  // Fill color - default white.
  color: (node: INodeAttrs): string => {
    return node.color || "#fff"
  },

  // attribute by which nodes should be colored
  shape: (node: INodeAttrs): string => {
    return node.shape || "squareDiamond"
  },

  size: (node: INodeAttrs): number => {
    return node.size || 1
  },

  stroke: (node: INodeAttrs): string => {
    return node.stroke || "#000"
  },

  // Unique ID - defaults to a new unique string.
  id: (node: INodeAttrs): string => {
    return node.id || uniqueId("node")
  },

  label: (node: INodeAttrs): string => {
    return node.label || node.id || ""
  },

  labelPosition: (node: INodeAttrs): string => {
    return node.labelPosition || "right"
  },
}

export default AccessorsFactory(defaultAccessors)
