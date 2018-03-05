import Nodes from "../node"
import Link from "../link"
import { TNode, TLink, TScale, IObject, TNodeSelection, TLinkSelection } from "../typings"
import { every, invoke, map } from "lodash/fp"
import { scaleLinear } from "d3-scale"
import * as d3 from "d3-selection"

export const sizeScale = (range: [number, number], data: TNode[] | TLink[]): TScale => {
  const sizes: number[] = map((el: TNode): number => el.size())(data)
  return scaleLinear()
    .domain([0, Math.max(...sizes)])
    .range(range)
}

export const filterByMatchers = (matchers: IObject): ((d: TNode | TLink) => boolean) => {
  return (d: TNode | TLink): boolean => {
    return every.convert({ cap: false })((value: any, matcher: string): boolean => {
      return invoke(matcher)(d) === value
    })(matchers)
  }
}

export const exitGroups = (groups: TNodeSelection | TLinkSelection): void => {
  groups
    .exit()
    .on("mouseenter", null)
    .on("mouseleave", null)
    .remove()
}
