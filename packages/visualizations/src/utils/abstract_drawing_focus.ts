import AbstractFocus from "./abstract_focus"
import Events from "./event_catalog"
import { IState, TStateWriter, TEvents, TSeriesEl } from "./typings"

abstract class AbstractDrawingFocus extends AbstractFocus {
  constructor(state: IState, stateWriter: TStateWriter, events: TEvents, el: TSeriesEl) {
    super(state, stateWriter, events, el)
    this.events.on(Events.FOCUS.ELEMENT.HOVER, this.onElementHover(this))
    this.events.on(Events.FOCUS.ELEMENT.OUT, this.onElementOut(this))
    this.events.on(Events.CHART.OUT, this.onMouseLeave(this))
  }

  abstract onElementHover(ctx: AbstractFocus): (payload: { focusPoint: any; d: any }) => void

  onElementOut(ctx: AbstractFocus): () => void {
    return () => {
      ctx.remove()
    }
  }

  onMouseLeave(ctx: AbstractFocus): () => void {
    return () => {
      ctx.remove()
    }
  }
}

export default AbstractDrawingFocus
