import AbstractRenderer from "./abstract_renderer"
import * as d3 from "d3-selection"
import "d3-transition"
import { TLink, TScale } from "../typings"

const MINLINKWIDTH: number = 2

class Links extends AbstractRenderer {
  updateDraw(svg: any): void {
    const links: d3.Selection<d3.BaseType, TLink, d3.BaseType, {}> = svg
      .selectAll("path.link")
      .data(this.data, (link: TLink): string => {
        return link.sourceId() + ";" + link.targetId()
      })

    this.exit(links.exit())
    this.enterAndUpdate(links)
  }

  exit(exitLinks: any): void {
    exitLinks
      .transition()
      .duration(this.config.duration)
      .style("opacity", 0)
      .remove()
  }

  enterAndUpdate(links: d3.Selection<d3.BaseType, TLink, d3.BaseType, {}>): void {
    const scale: TScale = this.sizeScale([MINLINKWIDTH, this.config.maxLinkWidth])
    links
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", this.linkStartPath.bind(this))
      .attr("stroke-width", "0px")
      .merge(links)
      .transition()
      .duration(1e3)
      .attr("d", this.linkPath.bind(this))
      .attr("stroke", (d: TLink): string => {
        return d.stroke()
      })
      .attr("stroke-width", (d: TLink): string => {
        return scale(d.size()) + "px"
      })
      .attr("stroke-dasharray", (d: TLink): number => {
        return d.dash()
      })
      .attr("marker-mid", "url(#arrow)")
  }

  linkStartPath(link: TLink): string {
    const xStart: number = link.source().x,
      yStart: number = link.source().y
    return "M" + xStart + "," + yStart + "L" + xStart + "," + yStart
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
}

export default Links
