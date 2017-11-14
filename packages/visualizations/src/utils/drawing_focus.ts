import Focus from "./focus"
import Events from "./event_catalog"
import { IEvents, IState, TSeriesEl, TStateWriter } from "./typings"

abstract class DrawingFocus extends Focus {
  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TSeriesEl) {
    super(state, stateWriter, events, el)
    this.events.on(Events.FOCUS.ELEMENT.HOVER, this.onElementHover())
    this.events.on(Events.FOCUS.ELEMENT.OUT, this.onElementOut.bind(this))
    this.events.on(Events.CHART.OUT, this.onMouseLeave.bind(this))
  }

  abstract onElementHover(): (payload: { focusPoint: any; d: any }) => void

  onElementOut(): void {
    this.remove()
  }

  onMouseLeave(): void {
    this.events.emit(Events.FOCUS.ELEMENT.OUT)
  }
}

export default DrawingFocus
