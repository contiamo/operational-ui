import AbstractRenderer from "./abstract_renderer"
import * as d3 from "d3-selection"
import "d3-transition"
import { symbol as d3Symbol, symbolDiamond, symbolSquare, symbolCircle } from "d3-shape"
import { TNode, TScale } from "../typings"

const MINNODESIZE: number = 100,
  nodeLabelOptions: any = {
    top: {
      dy: "0",
      textAnchor: "middle",
      x: 0,
      y: -1,
    },
    bottom: {
      dy: "1em",
      textAnchor: "middle",
      x: 0,
      y: 1,
    },
    middle: {
      dy: "0.35em",
      textAnchor: "middle",
      x: 0,
      y: 0,
    },
    left: {
      dy: "0.35em",
      textAnchor: "end",
      x: -1,
      y: 0,
    },
    right: {
      dy: "0.35em",
      textAnchor: "start",
      x: 1,
      y: 0,
    },
  }

class Nodes extends AbstractRenderer {
  updateDraw(): void {
    let nodeGroups: d3.Selection<d3.BaseType, TNode, d3.BaseType, {}> = this.el
      .selectAll("g.node-group")
      .data(this.data, (node: TNode): string => {
        return node.id()
      })

    this.exit(nodeGroups.exit())
    this.enterAndUpdate(nodeGroups.enter())
  }

  exit(exitNodes: d3.Selection<d3.BaseType, TNode, d3.BaseType, {}>): void {
    exitNodes.selectAll("text.label").remove()
    exitNodes
      .selectAll("path.node")
      .on("mouseenter", null)
      .on("mouseleave", null)
      .transition()
      .duration(this.config.duration)
      .style("opacity", 0)
      .remove()
  }

  enterAndUpdate(enterNodes: d3.Selection<d3.BaseType, TNode, d3.BaseType, {}>): void {
    let enterNodeGroups: d3.Selection<d3.BaseType, TNode, d3.BaseType, {}> = enterNodes
      .append("g")
      .attr("class", "node-group")
      .attr("transform", (node: TNode): string => {
        return "translate(" + node.x + "," + node.y + ")"
      })

    this.updateNodes(enterNodeGroups)
  }

  // @TODO How do I import the d3 symbol types?
  getNodeShape(d: TNode): any {
    switch (d.shape()) {
      case "square":
        return symbolSquare
      case "circle":
        return symbolCircle
      default:
        return symbolDiamond
    }
  }

  updateNodes(enterNodeGroups: d3.Selection<d3.BaseType, TNode, d3.BaseType, {}>): void {
    const scale: TScale = this.sizeScale([MINNODESIZE, this.config.maxNodeSize])
    let n: number = 0
    enterNodeGroups
      .append("path")
      .attr("class", "node")
      .attr(
        "d",
        d3Symbol()
          .type(this.getNodeShape)
          .size(0),
      )
      .attr("fill", (d: TNode): string => {
        return d.color()
      })
      .attr("stroke", (d: TNode): string => {
        return d.stroke()
      })
      .on("mouseenter", this.onMouseOver(this))
      .merge(enterNodeGroups)
      .transition()
      .duration(this.config.duration)
      .attr(
        "d",
        d3Symbol()
          .type(this.getNodeShape)
          .size((d: TNode): number => {
            return scale(d.size())
          }),
      )
      .each((): void => {
        ++n
      })
      .on("end", (): void => {
        if (!--n) {
          this.updateNodeLabels(enterNodeGroups)
        }
      })
  }

  getNodeBBox(el: any): any {
    const node: any = d3
      .select(el.parentNode)
      .select("path.node")
      .node()
    return node.getBBox()
  }

  getNodeLabelX(d: TNode, el: any): number {
    const offset: number = this.getNodeBBox(el).width / 2 // + this.config.labelOffset
    return nodeLabelOptions[d.labelPosition()].x * offset
  }

  getNodeLabelY(d: TNode, el: any): number {
    const offset: number = this.getNodeBBox(el).height / 2 // + this.config.labelOffset
    return nodeLabelOptions[d.labelPosition()].y * offset
  }

  updateNodeLabels(enterNodes: d3.Selection<d3.BaseType, TNode, d3.BaseType, {}>): void {
    const that: any = this
    enterNodes
      .append("text")
      .attr("class", "label")
      .merge(enterNodes)
      .text((node: TNode): string => {
        return node.label()
      })
      .attr("x", function(d: TNode): number {
        return that.getNodeLabelX(d, this)
      })
      .attr("y", function(d: TNode): number {
        return that.getNodeLabelY(d, this)
      })
      .attr("dy", (d: TNode): number => {
        return nodeLabelOptions[d.labelPosition()].dy
      })
      .attr("text-anchor", (d: TNode): string => {
        return nodeLabelOptions[d.labelPosition()].textAnchor
      })
  }

  focusPoint(element: any, d: any): any {
    if (d == null) {
      return
    }
    const nodeBBox = this.getNodeBBox(element.node())
    return {
      offset: nodeBBox.width / 2,
      type: "node",
      x: d.x,
      y: d.y,
      id: d.id(),
    }
  }
}

export default Nodes
