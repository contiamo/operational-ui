import Events from "./event_catalog"
import { IEvents, IState, TSeriesEl, TStateWriter } from "./typings"

abstract class Focus {
  el: TSeriesEl
  state: IState
  stateWriter: TStateWriter
  events: IEvents

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TSeriesEl) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.events.on(Events.FOCUS.ELEMENT.HOVER, this.onElementHover.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.OUT, this.onElementOut.bind(this))
    this.events.on(Events.CHART.OUT, this.onMouseLeave.bind(this))
  }

  abstract onElementHover(payload: { focusPoint: any; d: any }): void

  onElementOut(): void {
    this.remove()
  }

  onMouseLeave(): void {
    this.events.emit(Events.FOCUS.ELEMENT.OUT)
  }

  remove(): void {
    this.el.node().innerHTML = ""
    this.el.style("visibility", "hidden")
    this.events.emit(Events.FOCUS.CLEAR)
  }
}

export default Focus
