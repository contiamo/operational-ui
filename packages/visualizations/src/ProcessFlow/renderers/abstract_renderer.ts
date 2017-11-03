import { map } from "lodash/fp"
import * as d3 from "d3-selection"
import { scaleLinear as d3ScaleLinear } from "d3-scale"
import Node from "../node"
import { IFocusElement } from "../typings"
import { every, invoke, bind } from "lodash/fp"

import {
  IConfig,
  IFocus,
  TEvents,
  TLink,
  TLinkSelection,
  TNode,
  TNodeSelection,
  TScale,
  TSeriesEl,
  IState,
} from "../typings"
import Events from "../../utils/event_catalog"

abstract class AbstractRenderer {
  config: IConfig
  data: TNode[] | TLink[]
  el: TSeriesEl
  events: TEvents
  state: IState
  type: string
  focusElementAccessor: string

  constructor(state: IState, events: TEvents, el: TSeriesEl) {
    this.state = state
    this.events = events
    this.el = el
    this.events.on(Events.FOCUS.ELEMENT.HIGHLIGHT, this.focusElement())
    this.events.on(Events.FOCUS.ELEMENT.OUT, bind(this.removeHighlights, this))
  }

  onMouseOver(ctx: AbstractRenderer): (d: TLink | TNode) => void {
    return function(d: TLink | TNode): void {
      ctx.mouseOver(d3.select(this), d)
    }
  }

  mouseOver(element: any, d: TLink | TNode): void {
    this.highlight(element, d)
    let focusPoint: IFocus = this.focusPoint(element, d)
    this.events.emit(Events.FOCUS.ELEMENT.HOVER, { focusPoint, d })
    element.classed("hover", true).on("mouseleave", this.onMouseOut(this))
  }

  focusElement(): (elementInfo: IFocusElement) => void {
    return (elementInfo: IFocusElement): void => {
      const ctx: AbstractRenderer = this

      if (elementInfo.type !== this.type) { return }
      this.el
        .selectAll(this.focusElementAccessor)
        .filter((d: TLink | TNode): boolean => {
          return every.convert({ cap: false })((value: any, matcher: string): boolean => {
            return invoke(matcher)(d) === value
          })(elementInfo.matchers)
        })
        .each(function(d: TLink | TNode): void {
          ctx.mouseOver(d3.select(this), d)
        })
    }
  }

  highlight(element: any, d: TLink | TNode): void {
    this.removeHighlights()
    element
      .classed("highlighted", true)
      .attr("stroke", this.config.highlightColor)
  }

  // Remove any old highlights (needed if an element has been manually focussed)
  removeHighlights(): void {
    this.el
      .selectAll(".highlighted")
      .attr("stroke", (d: TNode | TLink): string => {
        return d instanceof Node ? this.config.borderColor : d.stroke()
      })
      .classed("highlighted", false)
  }

  abstract focusPoint(element: any, d: TLink | TNode): IFocus

  onMouseOut(ctx: AbstractRenderer): any {
    return function(): void {
      ctx.events.emit(Events.FOCUS.ELEMENT.OUT)
      const element: any = d3.select(this)
      element.classed("hover", false)
    }
  }

  draw(data: TNode[] | TLink[]): void {
    this.data = data
    this.config = this.state.current.get("config")
    this.updateDraw()
  }

  abstract updateDraw(): void

  exit(elementGroups: TNodeSelection | TLinkSelection): void {
    elementGroups
      .exit()
      .on("mouseenter", null)
      .on("mouseleave", null)
      .remove()
  }

  abstract enterAndUpdate(enterEls: TNodeSelection | TLinkSelection): void

  sizeScale(range: [number, number]): TScale {
    const sizes: number[] = map((el: TLink | TNode): number => el.size())(this.data)
    return d3ScaleLinear()
      .domain([0, Math.max(...sizes)])
      .range(range)
  }
}

export default AbstractRenderer
