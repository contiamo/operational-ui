import AbstractRenderer from "./abstract_renderer"
import * as d3 from "d3-selection"
import "d3-transition"
import { symbol as d3Symbol, symbolDiamond, symbolSquare, symbolCircle } from "d3-shape"
import { TNode, TScale, IFocus, TNodeSelection } from "../typings"

const nodeLabelOptions: any = {
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

const nodeShapeOptions: any = {
  squareDiamond: {
    symbol: symbolSquare,
    rotation: 45
  },
  square: {
    symbol: symbolSquare,
    rotation: 0,
  },
  diamond: {
    symbol: symbolDiamond,
    rotation: 0,
  },
  circle: {
    symbol: symbolCircle,
    rotation: 0,
  },
}

class Nodes extends AbstractRenderer {
  updateDraw(): void {
    let nodeGroups: any = this.el.select("g.nodes-group").selectAll("g.node-group").data(this.data, (node: TNode): string => node.id())

    this.exit(nodeGroups)
    this.enterAndUpdate(nodeGroups)
  }

  nodeBorderScale(scale: TScale): (d: TNode) => number {
    return (d: TNode): number => {
      return Math.pow((Math.sqrt(scale(d.size())) + this.config.nodeBorderWidth), 2)
    }
  }
  enterAndUpdate(nodeGroups: TNodeSelection): void {
    const scale: TScale = this.sizeScale([this.config.minNodeSize, this.config.maxNodeSize]),
      borderScale = this.nodeBorderScale(scale),
      ctx: Nodes = this
    let n: number = 0

    nodeGroups
      .enter()
      .append("g")
      .attr("class", "node-group")
      .each(function(d: TNode): void {
        // Append node "border" element - white element behind node.
        d3
          .select(this)
          .append("path")
          .attr("class", "node-border")
          .attr(
            "d",
            d3Symbol()
              .type(nodeShapeOptions[d.shape()].symbol)
              .size(0),
          )
          .attr("transform", "rotate(" + nodeShapeOptions[d.shape()].rotation + ")")
          .attr("fill", "#fff")
        // Append node
        d3
          .select(this)
          .append("path")
          .attr("class", "node")
          .attr(
          "d",
          d3Symbol()
            .type(nodeShapeOptions[d.shape()].symbol)
            .size(0),
        )
          .attr("transform", "rotate(" + nodeShapeOptions[d.shape()].rotation + ")")
          .attr("fill", d.color())
          .attr("stroke", d.stroke())
          .on("mouseenter", ctx.onMouseOver(ctx))
        // Append label
        d3
          .select(this)
          .append("text")
          .attr("class", "label")
      })
      .merge(nodeGroups)
      .attr("transform", (d: TNode): string => "translate(" + d.x + "," + d.y + ")")
      .transition()
      .duration(ctx.config.duration)
      .each(function(d: TNode): void {
        // Update node border
        d3
          .select(this)
          .select("path.node-border")
          .attr(
          "d",
          d3Symbol()
            .type(nodeShapeOptions[d.shape()].symbol)
            .size(borderScale(d)),
        )
          .attr("transform", "rotate(" + nodeShapeOptions[d.shape()].rotation + ")")
        // Update node
        d3
          .select(this)
          .select("path.node")
          .attr(
            "d",
            d3Symbol()
              .type(nodeShapeOptions[d.shape()].symbol)
              .size(scale(d.size())),
          )
          .attr("transform", "rotate(" + nodeShapeOptions[d.shape()].rotation + ")")
        ++n
      })
      .on("end", (): void => {
        --n
        if (n < 1) {
          this.updateNodeLabels(nodeGroups)
        }
      })
  }

  getNodeBoundingRect(el: any): SVGRect {
    const node: any = d3
      .select(el.parentNode)
      .select("path.node")
      .node()
    return node.getBoundingClientRect()
  }

  getNodeLabelX(d: TNode, el: any): number {
    const offset: number = this.getNodeBoundingRect(el).width / 2 + this.config.labelOffset
    return nodeLabelOptions[d.labelPosition()].x * offset
  }

  getNodeLabelY(d: TNode, el: any): number {
    const offset: number = this.getNodeBoundingRect(el).height / 2 + this.config.labelOffset
    return nodeLabelOptions[d.labelPosition()].y * offset
  }

  updateNodeLabels(nodeGroups: TNodeSelection): void {
    const that: any = this
    nodeGroups
      .enter()
      .selectAll("text.label")
      .merge(nodeGroups)
      .text((d: TNode): string => d.label())
      .attr("x", function(d: TNode): number {
        return that.getNodeLabelX(d, this)
      })
      .attr("y", function(d: TNode): number {
        return that.getNodeLabelY(d, this)
      })
      .attr("dy", (d: TNode): number => nodeLabelOptions[d.labelPosition()].dy)
      .attr("text-anchor", (d: TNode): string => nodeLabelOptions[d.labelPosition()].textAnchor)
  }

  focusPoint(element: any, d: TNode): IFocus {
    if (d == null) return
    const offset: number = this.getNodeBoundingRect(element.node()).width / 2
    return {
      offset: offset,
      type: "node",
      x: d.x,
      y: d.y,
      id: d.id(),
    }
  }
}

export default Nodes
