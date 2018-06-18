import * as d3 from "d3-selection"
import "d3-transition"
import { symbol as d3Symbol, symbolDiamond, symbolSquare, symbolCircle } from "d3-shape"
import { withD3Element, onTransitionEnd } from "../../utils/d3_utils"
import * as styles from "./styles"
import Events from "../../shared/event_catalog"
import { every, invoke, map } from "lodash/fp"
import { exitGroups, filterByMatchers, sizeScale } from "./renderer_utils"

import {
  D3Selection,
  EventBus,
  FocusElement,
  FocusPoint,
  ProcessFlowConfig,
  Renderer,
  Scale,
  State,
  TLink,
  TNode,
} from "../typings"

const nodeLabelOptions: { [key: string]: { [key: string]: any } } = {
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

const nodeShapeOptions: { [key: string]: { [key: string]: any } } = {
  squareDiamond: {
    symbol: symbolSquare,
    rotation: 45,
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

class Nodes implements Renderer {
  private config: ProcessFlowConfig
  private data: TNode[]
  private el: D3Selection
  private events: EventBus
  private state: State

  constructor(state: State, events: EventBus, el: D3Selection) {
    this.state = state
    this.events = events
    this.el = el
    this.events.on(Events.FOCUS.ELEMENT.OUT, this.removeHighlights.bind(this))
  }

  private onMouseOver(d: TNode, element: HTMLElement): void {
    this.mouseOver(d3.select(element), d)
  }

  private mouseOver(element: D3Selection, d: TNode, hideLabel: boolean = false): void {
    this.highlight(element, d)
    const focusPoint = this.focusPoint(element, d)
    this.events.emit(Events.FOCUS.ELEMENT.HOVER, { focusPoint, d, hideLabel })
    element.on("mouseleave", this.onMouseOut.bind(this))
  }

  focusElement(focusElement: FocusElement): void {
    this.el
      .selectAll(`path.node.${styles.border}`)
      .filter(filterByMatchers(focusElement.matchers))
      .each(
        withD3Element(
          (d: TNode, el: HTMLElement): void => {
            this.mouseOver(d3.select(el), d, focusElement.hideLabel)
          },
        ),
      )
  }

  highlight(element: D3Selection, d: TNode, keepCurrent: boolean = false): void {
    if (!keepCurrent) {
      this.removeHighlights()
    }
    element.attr("stroke", this.config.highlightColor)
  }

  // Remove any old highlights, including link highlighting (needed if an element has been manually focussed)
  private removeHighlights(): void {
    this.el.selectAll(`path.node.${styles.border}`).attr("stroke", this.config.borderColor)
    this.el.selectAll(`path.link.${styles.element}`).attr("stroke", (d: TLink): string => d.stroke())
  }

  private focusPoint(element: D3Selection, d: TNode): FocusPoint {
    if (d == null) return
    const offset = this.getNodeBoundingRect(element.node()).width / 2
    return {
      offset,
      type: "node",
      x: d.x,
      y: d.y,
      id: d.id(),
    }
  }

  private onMouseOut(): void {
    this.events.emit(Events.FOCUS.ELEMENT.OUT)
  }

  draw(data: TNode[]): void {
    this.data = data
    this.config = this.state.current.get("config")
    const groups = this.el
      .select("g.nodes-group")
      .selectAll("g.node-group")
      .data(this.data, (node: TNode) => node.id())

    exitGroups(groups)
    this.enterAndUpdate(groups)
  }

  private borderScale(scale: Scale): Scale {
    return (size: number) => {
      return Math.pow(Math.sqrt(scale(size)) + this.config.nodeBorderWidth, 2)
    }
  }

  private translate(d: TNode): string {
    return `translate(${d.x},${d.y})`
  }

  private rotate(d: TNode): string {
    return `rotate(${nodeShapeOptions[d.shape()].rotation})`
  }

  private enterAndUpdate(groups: D3Selection): void {
    const scale = sizeScale([this.config.minNodeSize, this.config.maxNodeSize], this.data)
    const borderScale = this.borderScale(scale)

    const enteringGroups = groups
      .enter()
      .append("g")
      .attr("class", "node-group")
      .attr("transform", this.translate)

    enteringGroups
      .append("path")
      .attr("class", `node ${styles.border}`)
      .attr(
        "d",
        (d: TNode): string =>
          d3Symbol()
            .type(nodeShapeOptions[d.shape()].symbol)
            .size(borderScale(d.size()))(),
      )
      .attr("transform", this.rotate)
      .attr("fill", this.config.borderColor)
      // @TODO delegate to a single event listener at the SVG root and locate the node in question by an attribute.
      // Single event handlers should be attached to a non-svg node.
      .on("mouseenter", withD3Element(this.onMouseOver.bind(this)))

    enteringGroups
      .append("path")
      .attr("class", `node ${styles.element}`)
      .attr(
        "d",
        (d: TNode): string =>
          d3Symbol()
            .type(nodeShapeOptions[d.shape()].symbol)
            .size(scale(d.size()))(),
      )
      .attr("transform", this.rotate)
      .attr("fill", (d: TNode) => d.color())
      .attr("stroke", (d: TNode) => d.stroke())
      .attr("opacity", 0)

    enteringGroups.append("text").attr("class", styles.label)

    groups
      .merge(enteringGroups)
      .transition()
      .duration(this.config.duration)
      .attr("transform", this.translate)

    groups
      .merge(enteringGroups)
      .selectAll(`path.node.${styles.border}`)
      .transition()
      .duration(this.config.duration)
      // NOTE: changing shape from one with straight edges to a circle/one with curved edges throws errors,
      // but doesn't break the viz.
      .attr(
        "d",
        (d: TNode): string =>
          d3Symbol()
            .type(nodeShapeOptions[d.shape()].symbol)
            .size(borderScale(d.size()))(),
      )
      .attr("transform", this.rotate)

    groups
      .merge(enteringGroups)
      .selectAll(`path.node.${styles.element}`)
      .transition()
      .duration(this.config.duration)
      // NOTE: changing shape from one with straight edges to a circle/one with curved edges throws errors,
      // but doesn't break the viz.
      .attr(
        "d",
        (d: TNode): string =>
          d3Symbol()
            .type(nodeShapeOptions[d.shape()].symbol)
            .size(scale(d.size()))(),
      )
      .attr("transform", this.rotate)
      .attr("fill", (d: TNode) => d.color())
      .attr("stroke", (d: TNode) => d.stroke())
      .attr("opacity", 1)
      .call(onTransitionEnd, this.updateNodeLabels.bind(this))
  }

  private getNodeBoundingRect(el: HTMLElement): SVGRect {
    const node: any = d3
      .select(el.parentNode as any)
      .select(`path.node.${styles.element}`)
      .node()
    return node.getBoundingClientRect()
  }

  private getLabelPosition(d: TNode): string {
    return d.labelPosition() === "auto" ? this.getAutomaticLabelPosition(d) : d.labelPosition()
  }

  private getAutomaticLabelPosition(d: TNode): string {
    const columnSpacing = this.state.current.get("computed").series.horizontalNodeSpacing
    return (d.x / columnSpacing) % 2 === 1 ? "top" : "bottom"
  }

  private getNodeLabelX(d: TNode, el: HTMLElement): number {
    const offset = this.getNodeBoundingRect(el).width / 2 + this.config.nodeBorderWidth + this.config.labelOffset
    return nodeLabelOptions[this.getLabelPosition(d)].x * offset
  }

  private getNodeLabelY(d: TNode, el: HTMLElement): number {
    const offset = this.getNodeBoundingRect(el).height / 2 + this.config.nodeBorderWidth + this.config.labelOffset
    return nodeLabelOptions[this.getLabelPosition(d)].y * offset
  }

  private getLabelText(d: TNode): string {
    // Pixel width of character approx 1/2 of font-size - allow 7px per character
    const desiredPixelWidth = this.state.current.get("computed").series.horizontalNodeSpacing
    const numberOfCharacters = desiredPixelWidth / 7
    return d.label().substring(0, numberOfCharacters) + (d.label().length > numberOfCharacters ? "..." : "")
  }

  private updateNodeLabels(): void {
    const labels: D3Selection = this.el
      .select("g.nodes-group")
      .selectAll(`text.${styles.label}`)
      .data(this.data, (node: TNode) => node.id())

    labels
      .enter()
      .merge(labels)
      .text(d => this.getLabelText(d))
      .attr("x", withD3Element(this.getNodeLabelX.bind(this)))
      .attr("y", withD3Element(this.getNodeLabelY.bind(this)))
      .attr("dy", (d: TNode) => nodeLabelOptions[this.getLabelPosition(d)].dy)
      .attr("text-anchor", (d: TNode) => nodeLabelOptions[this.getLabelPosition(d)].textAnchor)
  }
}

export default Nodes
