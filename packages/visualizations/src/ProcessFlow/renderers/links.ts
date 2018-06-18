import * as d3 from "d3-selection"
import "d3-transition"
import { easeCubicInOut } from "d3-ease"
import { withD3Element } from "../../utils/d3_utils"
import * as styles from "./styles"
import { every, find, invoke, map } from "lodash/fp"
import Events from "../../shared/event_catalog"
import { exitGroups, filterByMatchers, sizeScale } from "./renderer_utils"

import {
  D3Selection,
  Data,
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

const MINOPACITY: number = 0.5,
  MAXOPACITY: number = 1

const path = (link: TLink): string => {
  const xStart = link.source().x
  const yStart = link.source().y
  const xEnd = link.target().x
  const yEnd = link.target().y
  const xMid = (xStart + xEnd) / 2
  const yMid = (yStart + yEnd) / 2
  return `M${xStart},${yStart}L${xMid},${yMid}L${xEnd},${yEnd}`
}

class Links implements Renderer {
  private config: ProcessFlowConfig
  private data: TLink[]
  private el: D3Selection
  private events: EventBus
  private state: State

  constructor(state: State, events: EventBus, el: D3Selection) {
    this.state = state
    this.events = events
    this.el = el
    this.events.on(Events.FOCUS.ELEMENT.OUT, this.removeHighlights.bind(this))
  }

  private onMouseOver(d: TLink, element: HTMLElement): void {
    this.mouseOver(d3.select(element), d)
  }

  private mouseOver(element: D3Selection, d: TLink, hideLabel: boolean = false): void {
    this.highlight(element, d)
    const focusPoint = this.focusPoint(element, d)
    this.events.emit(Events.FOCUS.ELEMENT.HOVER, { focusPoint, d, hideLabel })
    element.on("mouseleave", this.onMouseOut.bind(this))
  }

  focusElement(focusElement: FocusElement): void {
    this.el
      .selectAll(`path.link.${styles.element}`)
      .filter(filterByMatchers(focusElement.matchers))
      .each(
        withD3Element(
          (d: TLink, el: HTMLElement): void => {
            this.mouseOver(d3.select(el), d, focusElement.hideLabel)
          },
        ),
      )
  }

  highlight(element: D3Selection, d: TLink, keepCurrent: boolean = false): void {
    if (!keepCurrent) {
      this.removeHighlights()
    }
    // Highlight path.element when `path.${styles.border}` is hovered
    const pathEl: D3Selection = this.el.selectAll(`path.link.${styles.element}`).filter(
      (link: TLink): boolean => {
        return link.sourceId() === d.sourceId() && link.targetId() === d.targetId()
      },
    )
    pathEl.attr("stroke", this.config.highlightColor)

    // Highlight source and target nodes as well as link
    this.el
      .selectAll(`path.node.${styles.border}`)
      .filter((node: TNode) => node.id() === d.sourceId() || node.id() === d.targetId())
      .each(
        withD3Element(
          (node: TNode, el: HTMLElement): void => {
            d3.select(el).attr("stroke", this.config.highlightColor)
          },
        ),
      )
  }

  // Remove any old highlights, including node highlighting (needed if an element has been manually focussed)
  private removeHighlights(): void {
    this.el.selectAll(`path.node.${styles.border}`).attr("stroke", this.config.borderColor)
    this.el.selectAll(`path.link.${styles.element}`).attr("stroke", (d: TLink) => d.stroke())
  }

  private focusPoint(element: D3Selection, d: TLink): FocusPoint {
    if (d == null) return
    const scale = sizeScale([this.config.minLinkWidth, this.config.maxLinkWidth], this.data)

    return {
      offset: scale(d.size()) / 2,
      type: "link",
      x: (d.source().x + d.target().x) / 2,
      y: (d.source().y + d.target().y) / 2,
      id: `${d.sourceId()}->${d.targetId()}`,
    }
  }

  private onMouseOut(): void {
    this.events.emit(Events.FOCUS.ELEMENT.OUT)
  }

  draw(data: TLink[]): void {
    this.data = data
    this.config = this.state.current.get("config")
    const groups = this.el
      .select("g.links-group")
      .selectAll("g.link-group")
      .data(this.data, (d: TLink) => `${d.sourceId()};${d.targetId()}`)

    exitGroups(groups)
    this.enterAndUpdate(groups)
  }

  private borderScale(scale: Scale): Scale {
    return (size: number) => scale(size) + 2 * this.config.linkBorderWidth
  }

  private enterAndUpdate(groups: D3Selection): void {
    const scale = sizeScale([this.config.minLinkWidth, this.config.maxLinkWidth], this.data)
    const borderScale = this.borderScale(scale)
    const opacityScale = sizeScale([MINOPACITY, MAXOPACITY], this.data)

    const enteringGroups = groups
      .enter()
      .append("g")
      .attr("class", "link-group")

    enteringGroups
      .append("path")
      .attr("class", `link ${styles.border}`)
      .attr("d", this.startPath.bind(this))
      .attr("stroke-width", "0px")
      .on("mouseenter", withD3Element(this.onMouseOver.bind(this)))
      .attr("opacity", 0)

    enteringGroups
      .append("path")
      .attr("class", `link ${styles.element}`)
      .attr("d", this.startPath.bind(this))
      .attr("fill", "none")
      .attr("stroke-width", "0px")

    groups
      .merge(enteringGroups)
      .select(`path.link.${styles.border}`)
      .attr("stroke", this.config.borderColor)
      .transition()
      .duration(this.config.duration)
      .ease(easeCubicInOut)
      .attr("d", path)
      .attr("stroke-width", (d: TLink) => `${borderScale(d.size())}px`)
      .attr("stroke-dasharray", (d: TLink) => d.dash())

    groups
      .merge(enteringGroups)
      .select(`path.link.${styles.element}`)
      .attr("stroke", (d: TLink) => d.stroke())
      .transition()
      .duration(this.config.duration)
      .ease(easeCubicInOut)
      .attr("d", path)
      .attr("stroke-width", (d: TLink) => `${scale(d.size())}px`)
      .attr("stroke-dasharray", (d: TLink) => d.dash())
      .attr("opacity", (d: TLink) => opacityScale(d.size()))
  }

  // Paths start as a single point at the source node. If the source node has already been rendered,
  // use its position at the start of the transition.
  private startPath(link: TLink): string {
    const previousData = this.state.previous.get(["computed", "series", "data"])
    const previousNodes = previousData ? previousData.nodes : []
    const existingSource = find((node: TNode) => node.id() === link.sourceId())(previousNodes)
    const x = existingSource ? existingSource.x : link.source().x
    const y = existingSource ? existingSource.y : link.source().y

    return `M${x},${y}L${x},${y}`
  }
}

export default Links
