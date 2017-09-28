import { map } from "lodash/fp"
import * as d3 from "d3-selection"
import { scaleLinear as d3ScaleLinear } from "d3-scale"
import { TNode, TLink, TScale, TState, TEvents } from "../typings"
import Events from "../../utils/event_catalog"

abstract class AbstractRenderer {
  computed: any
  config: any
  data: TNode[] | TLink[]
  state: TState
  events: TEvents
  el: any

  constructor(state: TState, events: TEvents, el: any) {
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
    let focusPoint: {} = this.focusPoint(element, d)
    this.events.emit(Events.FOCUS.ELEMENT.HOVER, { focusPoint, d })
    element.classed("hover", true).on("mouseleave", this.onMouseOut(this, focusPoint))
  }

  abstract focusPoint(element: any, d: any): any

  onMouseOut(ctx: AbstractRenderer, focusPoint: any): any {
    return function(d: TLink | TNode): void {
      ctx.events.emit(Events.FOCUS.ELEMENT.OUT, focusPoint)
      d3.select(this).classed("hover", false)
    }
  }

  draw(data: TNode[] | TLink[]): void {
    this.data = data
    this.config = this.state.current.config
    this.updateDraw()
  }

  abstract updateDraw(): void

  abstract exit(exitEls: any): void

  abstract enterAndUpdate(enterEls: any): void

  sizeScale(range: [number, number]): TScale {
    const sizes: number[] = map((el: TLink | TNode): number => {
      return el.size()
    })(this.data)
    return d3ScaleLinear()
      .domain([0, Math.max(...sizes)])
      .range(range)
  }
}

export default AbstractRenderer
