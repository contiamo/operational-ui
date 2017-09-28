import Events from "./event_catalog"
import { TState, TStateWriter, TEvents } from "./typings"

abstract class AbstractFocus {
  el: any
  focus: any
  state: TState
  stateWriter: TStateWriter
  events: TEvents

  constructor(state: TState, stateWriter: TStateWriter, events: TEvents, el: any) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
  }

  remove(): void {
    if (this.focus) {
      this.focus.remove()
    }
    this.focus = null
    this.events.emit(Events.FOCUS.CLEAR)
  }

  // Remove date focus and redraw (necessary when data changed or chart is resized)
  refresh(): void {
    this.remove()
  }
}

export default AbstractFocus
