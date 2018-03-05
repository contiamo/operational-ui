import * as d3 from "d3-selection"
import "d3-transition"
import { easeCubicInOut } from "d3-ease"
import { withD3Element } from "../../utils/d3_utils"
import * as styles from "./styles"
import { every, find, invoke, map } from "lodash/fp"
import Events from "../../utils/event_catalog"
import { exitGroups, filterByMatchers, sizeScale } from "./renderer_utils"
import {
  IConfig,
  IData,
  IEvents,
  IFocus,
  IFocusElement,
  IState,
  TD3Selection,
  TLink,
  TLinkSelection,
  TNode,
  TScale,
  TSeriesEl
} from "../typings"

const MINOPACITY: number = 0.5,
  MAXOPACITY: number = 1

const path = (link: TLink): string => {
  const xStart: number = link.source().x,
    yStart: number = link.source().y,
    xEnd: number = link.target().x,
    yEnd: number = link.target().y,
    xMid: number = (xStart + xEnd) / 2,
    yMid = (yStart + yEnd) / 2
  return `M${xStart},${yStart}L${xMid},${yMid}L${xEnd},${yEnd}`
}

class Links {
  config: IConfig
  data: TLink[]
  el: TSeriesEl
  events: IEvents
  state: IState

  constructor(state: IState, events: IEvents, el: TSeriesEl) {
    this.state = state
    this.events = events
    this.el = el
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOUT, this.removeHighlights.bind(this))
  }

  onMouseOver(d: TLink, element: HTMLElement): void {
    this.mouseOver(d3.select(element), d)
  }

  mouseOver(element: TLinkSelection, d: TLink, hideLabel: boolean = false): void {
    this.highlight(element, d)
    const focusPoint: IFocus = this.focusPoint(element, d)
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOVER, { focusPoint, d, hideLabel })
    element.on("mouseleave", this.onMouseOut.bind(this))
  }

  focusElement(focusElement: IFocusElement): void {
    this.el
      .selectAll(`path.link.${styles.element}`)
      .filter(filterByMatchers(focusElement.matchers))
      .each(
        withD3Element((d: TLink, el: HTMLElement): void => {
          this.mouseOver(d3.select(el), d, focusElement.hideLabel)
        })
      )
  }

  highlight(element: TLinkSelection, d: TLink, keepCurrent: boolean = false): void {
    if (!keepCurrent) {
      this.removeHighlights()
    }
    // Highlight path.element when `path.${styles.border}` is hovered
    const pathEl: TD3Selection = this.el.selectAll(`path.link.${styles.element}`).filter((link: TLink): boolean => {
      return link.sourceId() === d.sourceId() && link.targetId() === d.targetId()
    })
    pathEl.attr("stroke", this.config.highlightColor)

    // Highlight source and target nodes as well as link
    this.el
      .selectAll(`path.node.${styles.border}`)
      .filter((node: TNode): boolean => node.id() === d.sourceId() || node.id() === d.targetId())
      .each(
        withD3Element((node: TNode, el: HTMLElement): void => {
          d3.select(el).attr("stroke", this.config.highlightColor)
        })
      )
  }

  // Remove any old highlights (needed if an element has been manually focussed)
  removeHighlights(): void {
    this.el.selectAll(`path.link.${styles.element}`).attr("stroke", (d: TLink): string => d.stroke())
  }

  focusPoint(element: TLinkSelection, d: TLink): IFocus {
    if (d == null) return
    const scale: TScale = sizeScale([this.config.minLinkWidth, this.config.maxLinkWidth], this.data)

    return {
      offset: scale(d.size()) / 2,
      type: "link",
      x: (d.source().x + d.target().x) / 2,
      y: (d.source().y + d.target().y) / 2,
      id: `${d.sourceId()}->${d.targetId()}`
    }
  }

  onMouseOut(): void {
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)
  }

  draw(data: TLink[]): void {
    this.data = data
    this.config = this.state.current.get("config")
    const groups: TLinkSelection = this.el
      .select("g.links-group")
      .selectAll("g.link-group")
      .data(this.data, (d: TLink): string => `${d.sourceId()};${d.targetId()}`)

    exitGroups(groups)
    this.enterAndUpdate(groups)
  }

  borderScale(scale: TScale): TScale {
    return (size: number): number => scale(size) + 2 * this.config.linkBorderWidth
  }

  enterAndUpdate(groups: TLinkSelection): void {
    const scale: TScale = sizeScale([this.config.minLinkWidth, this.config.maxLinkWidth], this.data),
      borderScale: TScale = this.borderScale(scale),
      opacityScale: TScale = sizeScale([MINOPACITY, MAXOPACITY], this.data)

    const enteringGroups: TD3Selection = groups
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
      .attr("stroke-width", (d: TLink): string => borderScale(d.size()) + "px")
      .attr("stroke-dasharray", (d: TLink): string => d.dash())

    groups
      .merge(enteringGroups)
      .select(`path.link.${styles.element}`)
      .attr("stroke", (d: TLink): string => d.stroke())
      .transition()
      .duration(this.config.duration)
      .ease(easeCubicInOut)
      .attr("d", path)
      .attr("stroke-width", (d: TLink): string => scale(d.size()) + "px")
      .attr("stroke-dasharray", (d: TLink): string => d.dash())
      .attr("opacity", (d: TLink): number => opacityScale(d.size()))
  }

  // Paths start as a single point at the source node. If the source node has already been rendered,
  // use its position at the start of the transition.
  startPath(link: TLink): string {
    const previousData: IData = this.state.previous.get("computed").series.data,
      previousNodes: TNode[] = previousData ? previousData.nodes : [],
      existingSource: TNode = find((node: TNode): boolean => node.id() === link.sourceId())(previousNodes),
      x: number = existingSource ? existingSource.x : link.source().x,
      y: number = existingSource ? existingSource.y : link.source().y

    return `M${x},${y}L${x},${y}`
  }
}

export default Links
