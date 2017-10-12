import { map } from "lodash/fp"
import * as d3 from "d3-selection"
import { scaleLinear as d3ScaleLinear } from "d3-scale"
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
  TState,
} from "../typings"
import Events from "../../utils/event_catalog"

abstract class AbstractRenderer {
  config: IConfig
  data: TNode[] | TLink[]
  state: TState
  events: TEvents
  el: TSeriesEl

  constructor(state: TState, events: TEvents, el: TSeriesEl) {
    this.state = state
    this.events = events
    this.el = el
  }

  onMouseOver(ctx: AbstractRenderer): (d: TLink | TNode) => void {
    return function(d: TLink | TNode): void {
      ctx.mouseOver(d3.select(this), d)
    }
  }

  mouseOver(element: any, d: TLink | TNode): void {
    this.highlight(element, true)
    let focusPoint: IFocus = this.focusPoint(element, d)
    this.events.emit(Events.FOCUS.ELEMENT.HOVER, { focusPoint, d })
    element.classed("hover", true).on("mouseleave", this.onMouseOut(this, focusPoint))
  }

  abstract highlight(element: any, val: boolean): void

  abstract focusPoint(element: any, d: TLink | TNode): IFocus

  onMouseOut(ctx: AbstractRenderer, focusPoint: IFocus): any {
    return function(d: TLink | TNode): void {
      ctx.events.emit(Events.FOCUS.ELEMENT.OUT, focusPoint)
      const element: any = d3.select(this)
      ctx.highlight(element, false)
      element.classed("hover", false)
    }
  }

  draw(data: TNode[] | TLink[]): void {
    this.data = data
    this.config = this.state.current.get("config")
    this.updateDraw()
  }

  abstract updateDraw(): void

  exit(els: TNodeSelection | TLinkSelection): void {
    els
      .exit()
      .on("mouseenter", null)
      .on("mouseleave", null)
      .transition()
      .duration(this.config.duration)
      .style("opacity", 0)
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
