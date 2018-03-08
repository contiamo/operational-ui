import Nodes from "../node"
import Link from "../link"
import { TNode, TLink, Scale, Object, NodeSelection, LinkSelection } from "../typings"
import { every, invoke, map } from "lodash/fp"
import { scaleLinear } from "d3-scale"
import * as d3 from "d3-selection"

export const sizeScale = (range: [number, number], data: TNode[] | TLink[]): Scale => {
  const sizes: number[] = map((el: TNode): number => el.size())(data)
  return scaleLinear()
    .domain([0, Math.max(...sizes)])
    .range(range)
}

export const filterByMatchers = (matchers: Object<any>): ((d: TNode | TLink) => boolean) => {
  return (d: TNode | TLink): boolean => {
    return every.convert({ cap: false })((value: any, matcher: string): boolean => {
      return invoke(matcher)(d) === value
    })(matchers)
  }
}

export const exitGroups = (groups: NodeSelection | LinkSelection): void => {
  groups
    .exit()
    .on("mouseenter", null)
    .on("mouseleave", null)
    .remove()
}
