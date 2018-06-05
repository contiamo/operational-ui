import Nodes from "../node"
import Link from "../link"
import { D3Selection, TNode, TLink, Scale } from "../typings"
import { every, invoke, map } from "lodash/fp"
import { scaleLinear } from "d3-scale"
import * as d3 from "d3-selection"

export const sizeScale = (range: [number, number], data: TNode[] | TLink[]): Scale => {
  const sizes = map((el: TNode) => el.size())(data)
  return scaleLinear()
    .domain([0, Math.max(...sizes)])
    .range(range)
}

export const filterByMatchers = (matchers: { [key: string]: any }) => {
  return (d: TNode | TLink) => {
    return every.convert({ cap: false })((value: any, matcher: string) => {
      return invoke(matcher)(d) === value
    })(matchers)
  }
}

export const exitGroups = (groups: D3Selection): void => {
  groups
    .exit()
    .on("mouseenter", null)
    .on("mouseleave", null)
    .remove()
}
