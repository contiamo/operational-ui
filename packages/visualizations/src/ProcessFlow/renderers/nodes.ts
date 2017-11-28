import AbstractRenderer from "./abstract_renderer"
import * as d3 from "d3-selection"
import "d3-transition"
import { symbol as d3Symbol, symbolDiamond, symbolSquare, symbolCircle } from "d3-shape"
import { withD3Element } from "../../utils/d3_utils"
import { IFocus, IObject, TD3Selection, TNode, TNodeSelection, TScale } from "../typings"
import * as styles from "./styles"

const nodeLabelOptions: IObject = {
  top: {
    dy: "0",
    textAnchor: "middle",
    x: 0,
    y: -1
  },
  bottom: {
    dy: "1em",
    textAnchor: "middle",
    x: 0,
    y: 1
  },
  middle: {
    dy: "0.35em",
    textAnchor: "middle",
    x: 0,
    y: 0
  },
  left: {
    dy: "0.35em",
    textAnchor: "end",
    x: -1,
    y: 0
  },
  right: {
    dy: "0.35em",
    textAnchor: "start",
    x: 1,
    y: 0
  }
}

const nodeShapeOptions: IObject = {
  squareDiamond: {
    symbol: symbolSquare,
    rotation: 45
  },
  square: {
    symbol: symbolSquare,
    rotation: 0
  },
  diamond: {
    symbol: symbolDiamond,
    rotation: 0
  },
  circle: {
    symbol: symbolCircle,
    rotation: 0
  }
}

class Nodes extends AbstractRenderer {
  type: string = "node"
  focusElementAccessor: string = `path.node.${styles.border}`
  data: TNode[]

  updateDraw(): void {
    let nodeGroups: TNodeSelection = this.el
      .select("g.nodes-group")
      .selectAll("g.node-group")
      .data(this.data, (node: TNode): string => node.id())

    this.exit(nodeGroups)
    this.enterAndUpdate(nodeGroups)
  }

  nodeBorderScale(scale: TScale): TScale {
    return (size: number): number => {
      return Math.pow(Math.sqrt(scale(size)) + this.config.nodeBorderWidth, 2)
    }
  }

  translate(d: TNode): string {
    return "translate(" + d.x + "," + d.y + ")"
  }

  rotate(d: TNode): string {
    return "rotate(" + nodeShapeOptions[d.shape()].rotation + ")"
  }

  enterAndUpdate(nodeGroups: TNodeSelection): void {
    const scale: TScale = this.sizeScale([this.config.minNodeSize, this.config.maxNodeSize]),
      borderScale: TScale = this.nodeBorderScale(scale)

    let n: number = 0

    nodeGroups
      .enter()
      .append("g")
      .attr("class", "node-group")
      .attr("transform", this.translate)
      .each(
        withD3Element((d: TNode, el: HTMLElement): void => {
          const element: TD3Selection = d3.select(el)
          // Append node "border" element - white element behind node.
          element
            .append("path")
            .attr("class", `node ${styles.border}`)
            .attr(
              "d",
              d3Symbol()
                .type(nodeShapeOptions[d.shape()].symbol)
                .size(borderScale(d.size()))
            )
            .attr("transform", this.rotate)
            .attr("fill", this.config.borderColor)
            // @TODO delegate to a single event listener at the SVG root and locate the node in question by an attribute.
            // Single event handlers should be attached to a non-svg node.
            .on("mouseenter", withD3Element(this.onMouseOver.bind(this)))
          // Append node
          element
            .append("path")
            .attr("class", `node ${styles.element}`)
            .attr(
              "d",
              d3Symbol()
                .type(nodeShapeOptions[d.shape()].symbol)
                .size(scale(d.size()))
            )
            .attr("transform", this.rotate)
            .attr("fill", d.color())
            .attr("stroke", d.stroke())
            .attr("opacity", 0)
          // Append label
          element.append("text").attr("class", styles.label)
        })
      )
      .merge(nodeGroups)
      .transition()
      .duration(this.config.duration)
      .attr("transform", this.translate)
      .each(
        withD3Element((d: TNode, el: HTMLElement): void => {
          const element: TD3Selection = d3.select(el)
          // Update node border
          element
            .select(`path.node.${styles.border}`)
            .transition()
            .duration(this.config.duration)
            // NOTE: changing shape from one with straight edges to a circle/one with curved edges throws errors,
            // but doesn't break the viz.
            .attr(
              "d",
              d3Symbol()
                .type(nodeShapeOptions[d.shape()].symbol)
                .size(borderScale(d.size()))
            )
            .attr("transform", this.rotate)
          // Update node
          element
            .select(`path.node.${styles.element}`)
            .transition()
            .duration(this.config.duration)
            // NOTE: changing shape from one with straight edges to a circle/one with curved edges throws errors,
            // but doesn't break the viz.
            .attr(
              "d",
              d3Symbol()
                .type(nodeShapeOptions[d.shape()].symbol)
                .size(scale(d.size()))
            )
            .attr("transform", this.rotate)
            .attr("fill", d.color())
            .attr("stroke", d.stroke())
            .attr("opacity", 1)
          ++n
        })
      )
      .on("end", (): void => {
        --n
        if (n < 1) {
          this.updateNodeLabels()
        }
      })
  }

  getNodeBoundingRect(el: HTMLElement): SVGRect {
    const node: any = d3
      .select(el.parentNode as any)
      .select(`path.node.${styles.element}`)
      .node()
    return node.getBoundingClientRect()
  }

  getNodeLabelX(d: TNode, el: HTMLElement): number {
    const offset: number =
      this.getNodeBoundingRect(el).width / 2 + this.config.nodeBorderWidth + this.config.labelOffset
    return nodeLabelOptions[d.labelPosition()].x * offset
  }

  getNodeLabelY(d: TNode, el: HTMLElement): number {
    const offset: number =
      this.getNodeBoundingRect(el).height / 2 + this.config.nodeBorderWidth + this.config.labelOffset
    return nodeLabelOptions[d.labelPosition()].y * offset
  }

  getLabelText(d: TNode): string {
    // Pixel width of character approx 1/2 of font-size - allow 7px per character
    const desiredPixelWidth: number = this.state.current.get("computed").series.horizontalNodeSpacing,
      numberOfCharacters: number = desiredPixelWidth / 7
    return d.label().substring(0, numberOfCharacters) + (d.label().length > numberOfCharacters ? "..." : "")
  }

  updateNodeLabels(): void {
    let labels: TNodeSelection = this.el
      .select("g.nodes-group")
      .selectAll(`text.${styles.label}`)
      .data(this.data, (node: TNode): string => node.id())

    labels
      .enter()
      .merge(labels)
      .text(d => this.getLabelText(d))
      .attr("x", withD3Element(this.getNodeLabelX.bind(this)))
      .attr("y", withD3Element(this.getNodeLabelY.bind(this)))
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
      id: d.id()
    }
  }
}

export default Nodes
