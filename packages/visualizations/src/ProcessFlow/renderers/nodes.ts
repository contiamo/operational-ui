import AbstractRenderer from "./abstract_renderer"
import * as d3 from "d3-selection"
import "d3-transition"
import { symbol as d3Symbol, symbolDiamond, symbolSquare, symbolCircle } from "d3-shape"
import { withD3Element } from "../../utils/d3_utils"
import { TNode, TScale, IFocus, TNodeSelection, IObject } from "../typings"
import * as styles from "./styles"

const nodeLabelOptions: IObject = {
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

const nodeShapeOptions: IObject = {
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
  type: string = "node"
  focusElementAccessor: string = `path.node.${styles.border}`
  data: TNode[]

  updateDraw(): void {
    let nodeGroups: TNodeSelection = this.el.select("g.nodes-group")
      .selectAll("g.node-group")
      .data(this.data, (node: TNode): string => node.id())

    this.exit(nodeGroups)
    this.enterAndUpdate(nodeGroups)
  }

  nodeBorderScale(scale: TScale): TScale {
    return (size: number): number => {
      return Math.pow((Math.sqrt(scale(size)) + this.config.nodeBorderWidth), 2)
    }
  }

  enterAndUpdate(nodeGroups: TNodeSelection): void {
    const scale: TScale = this.sizeScale([this.config.minNodeSize, this.config.maxNodeSize]),
      borderScale: TScale = this.nodeBorderScale(scale),
      ctx: Nodes = this
    let n: number = 0

    nodeGroups
      .enter()
      .append("g")
      .attr("class", "node-group")
      .attr("transform", (d: TNode): string => "translate(" + d.x + "," + d.y + ")")
      .each(function(d: TNode): void {
        // Append node "border" element - white element behind node.
        d3
          .select(this)
          .append("path")
          .attr("class", `node ${styles.border}`)
          .attr(
            "d",
            d3Symbol()
              .type(nodeShapeOptions[d.shape()].symbol)
              .size(borderScale(d.size())),
          )
          .attr("transform", "rotate(" + nodeShapeOptions[d.shape()].rotation + ")")
          .attr("fill", ctx.config.borderColor)
          // @TODO delegate to a single event listener at the SVG root and locate the node in question by an attribute.
          // Single event handlers should be attached to a non-svg node.
          .on("mouseenter", withD3Element(ctx.onMouseOver.bind(ctx)))
        // Append node
        d3
          .select(this)
          .append("path")
          .attr("class", `node ${styles.element}`)
          .attr(
            "d",
            d3Symbol()
              .type(nodeShapeOptions[d.shape()].symbol)
              .size(scale(d.size())),
          )
          .attr("transform", "rotate(" + nodeShapeOptions[d.shape()].rotation + ")")
          .attr("fill", d.color())
          .attr("stroke", d.stroke())
          .attr("opacity", 0)
        // Append label
        d3
          .select(this)
          .append("text")
          .attr("class", styles.label)
      })
      .merge(nodeGroups)
      .transition()
      .duration(ctx.config.duration)
      .attr("transform", (d: TNode): string => "translate(" + d.x + "," + d.y + ")")
      .each(function(d: TNode): void {
        // Update node border
        d3
          .select(this)
          .select(`path.node.${styles.border}`)
          .transition()
          .duration(ctx.config.duration)
          // NOTE: changing shape from one with straight edges to a circle/one with curved edges throws errors,
          // but doesn't break the viz.
          .attr(
            "d",
            d3Symbol()
              .type(nodeShapeOptions[d.shape()].symbol)
              .size(borderScale(d.size())),
          )
          .attr("transform", "rotate(" + nodeShapeOptions[d.shape()].rotation + ")")
        // Update node
        d3
          .select(this)
          .select(`path.node.${styles.element}`)
          .transition()
          .duration(ctx.config.duration)
          // NOTE: changing shape from one with straight edges to a circle/one with curved edges throws errors,
          // but doesn't break the viz.
          .attr(
            "d",
            d3Symbol()
              .type(nodeShapeOptions[d.shape()].symbol)
              .size(scale(d.size())),
          )
          .attr("transform", "rotate(" + nodeShapeOptions[d.shape()].rotation + ")")
          .attr("fill", d.color())
          .attr("stroke", d.stroke())
          .attr("opacity", 1)
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
      .select(`path.node.${styles.element}`)
      .node()
    return node.getBoundingClientRect()
  }

  getNodeLabelX(d: TNode, el: any): number {
    const offset: number = this.getNodeBoundingRect(el).width / 2 + this.config.nodeBorderWidth + this.config.labelOffset
    return nodeLabelOptions[d.labelPosition()].x * offset
  }

  getNodeLabelY(d: TNode, el: any): number {
    const offset: number = this.getNodeBoundingRect(el).height / 2 + this.config.nodeBorderWidth + this.config.labelOffset
    return nodeLabelOptions[d.labelPosition()].y * offset
  }

  updateNodeLabels(nodeGroups: TNodeSelection): void {
    const that: Nodes = this
    nodeGroups
      .enter()
      .merge(nodeGroups)
      .selectAll(`text.${styles.label}`)
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

  focusPoint(element: TNodeSelection, d: TNode): IFocus {
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
