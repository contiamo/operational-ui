import { map, flow, groupBy, sortBy, forEach } from "lodash/fp"
import * as d3 from "d3-selection"
import "d3-transition"
import { scaleLinear as d3ScaleLinear } from "d3-scale"
import { symbol as d3Symbol, symbolDiamond, symbolSquare, symbolCircle } from "d3-shape"
import Layout from "./layout"
import { TNode, TLink, TData, TProps } from "./typings"

const MINNODESIZE: number = 100,
  MINLINKWIDTH: number = 2,
  nodeLabelOptions: any = {
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

// @TODO How do I import the d3 scale types?
type Scale = (size: number) => number

class Renderer {
  props: TProps
  data: TData
  // Type of selected element(s), type of datum, type of parent element, type of datum of parent
  svg: d3.Selection<Element, {}, HTMLElement, undefined>
  layout: Layout

  constructor(data: TData, props: TProps, context: HTMLElement) {
    this.props = props
    this.data = data
    this.svg = d3.select(context).select("svg")
    this.layout = new Layout()
    this.defineMarker()
  }

  defineMarker(): void {
    // Add arrow marker definition for link paths
    this.svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "-7 -6 14 12")
      .attr("markerWidth", 16)
      .attr("markerHeight", 12)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M-5,-5L5,0L-5,5")
      .attr("fill", this.props.arrowFill)
      .attr("stroke", this.props.linkStroke)
  }

  updateDraw(): void {
    this.layout.computeLayout(this.data)
    this.positionNodes()
    this.updateTLink()
    this.updateNodes()
  }

  positionNodes(): void {
    let nodesByRow: {}[] = groupBy("y")(this.layout.nodes)
    const rows: string[] = Object.keys(nodesByRow),
      xValues: number[] = map(function(node: TNode): number {
        return node.x
      })(this.layout.nodes),
      maxX: number = Math.max(...xValues),
      xGridSpacing: number = this.props.width / (maxX + 1),
      yGridSpacing: number = this.props.height / (rows.length + 1)

    // Assign y values
    forEach(function(node: TNode): void {
      node.y = (node.y + 1) * yGridSpacing
    })(this.layout.nodes)
    forEach(function(row: string): void {
      flow(
        sortBy(function(node: TNode): number {
          return node.x
        }),
        forEach(function(node: TNode): void {
          node.x *= xGridSpacing
        }),
      )(nodesByRow[parseInt(row, 10)])
    })(rows)
  }

  nodeSizeScale(): Scale {
    const nodeSizes: number[] = map(function(node: TNode): number {
      return node.size()
    })(this.layout.nodes)
    return d3ScaleLinear()
      .domain([0, Math.max(...nodeSizes)])
      .range([MINNODESIZE, this.props.maxNodeSize])
  }

  linkSizeScale(): Scale {
    const linkSizes: number[] = map(function(link: TLink): number {
      return link.size()
    })(this.layout.links)
    return d3ScaleLinear()
      .domain([0, Math.max(...linkSizes)])
      .range([MINLINKWIDTH, this.props.maxLinkWidth])
  }

  updateTLink(): void {
    const scale: Scale = this.linkSizeScale(),
      links: d3.Selection<d3.BaseType, TLink, Element, {}> = this.svg
        .selectAll("path.link")
        .data(this.layout.links, function(link: TLink): string {
          return link.sourceId() + ";" + link.targetId()
        })

    links.exit().remove()

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
      .attr("stroke", function(d: TLink): string {
        return d.stroke()
      })
      .attr("stroke-width", function(d: TLink): string {
        return scale(d.size()) + "px"
      })
      .attr("stroke-dasharray", function(d: TLink): number {
        return d.dash()
      })
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

  updateNodes(): void {
    let nodeGroups: d3.Selection<d3.BaseType, TNode, Element, {}> = this.svg
      .selectAll("g.node-group")
      .data(this.layout.nodes, function(node: TNode): string {
        return node.id()
      })

    nodeGroups.exit().remove()

    let enterNodes: d3.Selection<d3.BaseType, TNode, Element, {}> = nodeGroups
      .enter()
      .append("g")
      .attr("class", "node-group")
      .attr("transform", function(node: TNode): string {
        return "translate(" + node.x + "," + node.y + ")"
      })

    this.updateNodeShapes(enterNodes)
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

  updateNodeShapes(enterNodes: d3.Selection<d3.BaseType, TNode, Element, {}>): void {
    const scale: Scale = this.nodeSizeScale(),
      that: Renderer = this
    let n: number = 0
    enterNodes
      .append("path")
      .attr("class", "node")
      .attr(
        "d",
        d3Symbol()
          .type(this.getNodeShape)
          .size(0),
      )
      .attr("fill", function(d: TNode): string {
        return d.color()
      })
      .attr("stroke", function(d: TNode): string {
        return d.stroke()
      })
      .merge(enterNodes)
      .transition()
      .duration(1e3)
      .attr(
        "d",
        d3Symbol()
          .type(this.getNodeShape)
          .size(function(d: TNode): number {
            return scale(d.size())
          }),
      )
      .each(function(): void {
        ++n
      })
      .on("end", function(): void {
        if (!--n) {
          that.updateNodeLabels(enterNodes)
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
    const offset: number = this.getNodeBBox(el).width / 2 + this.props.labelOffset
    return nodeLabelOptions[d.labelPosition()].x * offset
  }

  getNodeLabelY(d: TNode, el: any): number {
    const offset: number = this.getNodeBBox(el).height / 2 + this.props.labelOffset
    return nodeLabelOptions[d.labelPosition()].y * offset
  }

  updateNodeLabels(enterNodes: d3.Selection<d3.BaseType, TNode, Element, {}>): void {
    const that: any = this
    enterNodes
      .append("text")
      .attr("class", "label")
      .merge(enterNodes)
      .text(function(node: TNode): string {
        return node.label()
      })
      .attr("x", function(d: TNode): number {
        return that.getNodeLabelX(d, this)
      })
      .attr("y", function(d: TNode): number {
        return that.getNodeLabelY(d, this)
      })
      .attr("dy", function(d: TNode): number {
        return nodeLabelOptions[d.labelPosition()].dy
      })
      .attr("text-anchor", function(d: TNode): string {
        return nodeLabelOptions[d.labelPosition()].textAnchor
      })
  }
}

export default Renderer
