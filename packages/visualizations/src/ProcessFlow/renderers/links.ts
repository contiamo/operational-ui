import AbstractRenderer from "./abstract_renderer"
import * as d3 from "d3-selection"
import "d3-transition"
import { TLink, TNode, TScale, IFocus, TLinkSelection, IFocusElement } from "../typings"
import { easeCubicInOut } from "d3-ease"
import * as styles from "./styles"
import { find } from "lodash/fp"

const MINOPACITY: number = 0.5,
  MAXOPACITY: number = 1

class Links extends AbstractRenderer {
  type: string = "link"
  focusElementAccessor: string = `path.link.${styles.element}`

  updateDraw(): void {
    const linkGroups: TLinkSelection = this.el.select("g.links-group")
      .selectAll("g.link-group")
      .data(this.data, (link: TLink): string => link.sourceId() + ";" + link.targetId())

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
      opacityScale: TScale = this.sizeScale([MINOPACITY, MAXOPACITY]),
      ctx: Links = this

    linkGroups
      .enter()
      .append("g")
      .attr("class", "link-group")
      .each(function(d: TLink): void {
        // Append link "border" element - transparent element behind link.
        d3
          .select(this)
          .append("path")
          .attr("class", `link ${styles.border}`)
          .attr("d", ctx.linkStartPath.bind(ctx))
          .attr("stroke-width", "0px")
          .on("mouseenter", ctx.onMouseOver(ctx))
          .attr("opacity", 0)
        // Append link
        d3
          .select(this)
          .append("path")
          .attr("class", `link ${styles.element}`)
          .attr("d", ctx.linkStartPath.bind(ctx))
          .attr("fill", "none")
          .attr("stroke-width", "0px")
      })
      .merge(linkGroups)
      .each(function(d: TLink): void {
        // Update link border
        d3
          .select(this)
          .select(`path.link.${styles.border}`)
          .attr("stroke", ctx.config.borderColor)
          .transition()
          .duration(ctx.config.duration)
          .ease(easeCubicInOut)
          .attr("d", ctx.linkPath.bind(ctx))
          .attr("stroke-width", (d: TLink): string => borderScale(d.size()) + "px")
          .attr("stroke-dasharray", (d: TLink): number => d.dash())
        // Update link
        d3
          .select(this)
          .select(`path.link.${styles.element}`)
          .attr("stroke", (d: TLink): string => d.stroke())
          .transition()
          .duration(ctx.config.duration)
          .ease(easeCubicInOut)
          .attr("d", ctx.linkPath.bind(ctx))
          .attr("stroke-width", (d: TLink): string => scale(d.size()) + "px")
          .attr("stroke-dasharray", (d: TLink): number => d.dash())
          .attr("opacity", (d: TLink): number => opacityScale(d.size()))
      })
  }

  // Paths start as a single point at the source node. If the source node has already been rendered,
  // use its position at the start of the transition.
  linkStartPath(link: TLink): string {
    const previousData: any = this.state.previous.get("computed").series.data,
      previousNodes: TNode[] = previousData ? previousData.nodes : [],
      existingSource: TNode = find((node: TNode): boolean => node.id() === link.sourceId())(previousNodes),
      x: number = existingSource ? existingSource.x : link.source().x,
      y: number = existingSource ? existingSource.y : link.source().y

    return "M" + x + "," + y + "L" + x + "," + y
  }

  linkPath(link: TLink): string {
    const xStart: number = link.source().x,
      yStart: number = link.source().y,
      xEnd: number = link.target().x,
      yEnd: number = link.target().y,
      xMid: number = (xStart + xEnd) / 2,
      yMid = (yStart + yEnd) / 2
    return "M" + xStart + "," + yStart + "L" + xMid + "," + yMid + "L" + xEnd + "," + yEnd
  }

  highlight(element: any, d: TLink): void {
    // Highlight path.element when `path.${styles.border}` is hovered
    const pathEl: any = this.el.selectAll(`path.link.${styles.element}`)
      .filter((link: TLink): boolean => {
        return link.sourceId() === d.sourceId() && link.targetId() === d.targetId()
      })
    super.highlight(pathEl, d)
    // Highlight source and target nodes as well as link
    const ctx: Links = this
    this.el.selectAll(`path.node.${styles.border}`)
      .filter((node: TNode): boolean => node.id() === d.sourceId() || node.id() === d.targetId())
      .each(function(node: TNode): void {
        d3.select(this).classed("highlighted", true).attr("stroke", ctx.config.highlightColor)
      })
  }

  focusPoint(element: any, d: TLink): IFocus {
    if (d == null) return
    const scale: TScale = this.sizeScale([this.config.minLinkWidth, this.config.maxLinkWidth])

    return {
      offset: scale(d.size()) / 2,
      type: "link",
      x: (d.source().x + d.target().x) / 2,
      y: (d.source().y + d.target().y) / 2,
      id: d.sourceId() + "->" + d.targetId(),
    }
  }
}

export default Links
