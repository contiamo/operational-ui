import AbstractRenderer from "./abstract_renderer"
import * as d3 from "d3-selection"
import "d3-transition"
import { IData, IFocus, IFocusElement, TD3Selection, TLink, TLinkSelection, TNode, TScale } from "../typings"
import { easeCubicInOut } from "d3-ease"
import { withD3Element } from "../../utils/d3_utils"
import * as styles from "./styles"
import { find } from "lodash/fp"

const MINOPACITY: number = 0.5,
  MAXOPACITY: number = 1

class Links extends AbstractRenderer {
  type: string = "link"
  focusElementAccessor: string = `path.link.${styles.element}`
  data: TLink[]

  updateDraw(): void {
    const linkGroups: TLinkSelection = this.el
      .select("g.links-group")
      .selectAll("g.link-group")
      .data(this.data, (d: TLink): string => `${d.sourceId()};${d.targetId()}`)

    this.exit(linkGroups)
    this.enterAndUpdate(linkGroups)
  }

  linkBorderScale(scale: TScale): TScale {
    return (size: number): number => {
      return scale(size) + 2 * this.config.linkBorderWidth
    }
  }

  enterAndUpdate(linkGroups: TLinkSelection): void {
    const scale: TScale = this.sizeScale([this.config.minLinkWidth, this.config.maxLinkWidth]),
      borderScale: TScale = this.linkBorderScale(scale),
      opacityScale: TScale = this.sizeScale([MINOPACITY, MAXOPACITY])

    const enteringLinkGroups: TD3Selection = linkGroups
      .enter()
      .append("g")
      .attr("class", "link-group")

    enteringLinkGroups
      .append("path")
      .attr("class", `link ${styles.border}`)
      .attr("d", this.linkStartPath.bind(this))
      .attr("stroke-width", "0px")
      .on("mouseenter", withD3Element(this.onMouseOver.bind(this)))
      .attr("opacity", 0)

    enteringLinkGroups
      .append("path")
      .attr("class", `link ${styles.element}`)
      .attr("d", this.linkStartPath.bind(this))
      .attr("fill", "none")
      .attr("stroke-width", "0px")

    linkGroups
      .merge(enteringLinkGroups)
      .select(`path.link.${styles.border}`)
      .attr("stroke", this.config.borderColor)
      .transition()
      .duration(this.config.duration)
      .ease(easeCubicInOut)
      .attr("d", this.linkPath.bind(this))
      .attr("stroke-width", (d: TLink): string => borderScale(d.size()) + "px")
      .attr("stroke-dasharray", (d: TLink): string => d.dash())

    linkGroups
      .merge(enteringLinkGroups)
      .select(`path.link.${styles.element}`)
      .attr("stroke", (d: TLink): string => d.stroke())
      .transition()
      .duration(this.config.duration)
      .ease(easeCubicInOut)
      .attr("d", this.linkPath.bind(this))
      .attr("stroke-width", (d: TLink): string => scale(d.size()) + "px")
      .attr("stroke-dasharray", (d: TLink): string => d.dash())
      .attr("opacity", (d: TLink): number => opacityScale(d.size()))
  }

  // Paths start as a single point at the source node. If the source node has already been rendered,
  // use its position at the start of the transition.
  linkStartPath(link: TLink): string {
    const previousData: IData = this.state.previous.get("computed").series.data,
      previousNodes: TNode[] = previousData ? previousData.nodes : [],
      existingSource: TNode = find((node: TNode): boolean => node.id() === link.sourceId())(previousNodes),
      x: number = existingSource ? existingSource.x : link.source().x,
      y: number = existingSource ? existingSource.y : link.source().y

    return `M${x},${y}L${x},${y}`
  }

  linkPath(link: TLink): string {
    const xStart: number = link.source().x,
      yStart: number = link.source().y,
      xEnd: number = link.target().x,
      yEnd: number = link.target().y,
      xMid: number = (xStart + xEnd) / 2,
      yMid = (yStart + yEnd) / 2
    return `M${xStart},${yStart}L${xMid},${yMid}L${xEnd},${yEnd}`
  }

  highlight(element: TLinkSelection, d: TLink, keepCurrent: boolean = false): void {
    // Highlight path.element when `path.${styles.border}` is hovered
    const pathEl: TD3Selection = this.el.selectAll(`path.link.${styles.element}`)
      .filter((link: TLink): boolean => {
        return link.sourceId() === d.sourceId() && link.targetId() === d.targetId()
      })
    super.highlight(pathEl, d, keepCurrent)

    // Highlight source and target nodes as well as link
    this.el
      .selectAll(`path.node.${styles.border}`)
      .filter((node: TNode): boolean => node.id() === d.sourceId() || node.id() === d.targetId())
      .each(
        withD3Element((node: TNode, el: HTMLElement): void => {
          d3
            .select(el)
            .classed("highlighted", true)
            .attr("stroke", this.config.highlightColor)
        })
      )
  }

  focusPoint(element: TLinkSelection, d: TLink): IFocus {
    if (d == null) return
    const scale: TScale = this.sizeScale([this.config.minLinkWidth, this.config.maxLinkWidth])

    return {
      offset: scale(d.size()) / 2,
      type: "link",
      x: (d.source().x + d.target().x) / 2,
      y: (d.source().y + d.target().y) / 2,
      id: `${d.sourceId()}->${d.targetId()}`
    }
  }
}

export default Links
