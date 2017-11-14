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
  }

  remove(): void {
    this.el.node().innerHTML = ""
    this.el.style("visibility", "hidden")
    this.events.emit(Events.FOCUS.CLEAR)
  }

  // Remove date focus and redraw (necessary when data changed or chart is resized)
  refresh(): void {
    this.remove()
  }
}

export default Focus
