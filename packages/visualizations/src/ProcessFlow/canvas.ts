import AbstractComponent from "../utils/abstract_component"
import StateHandler from "../utils/state_handler"
import EventHandler from "../utils/event_handler"

class Canvas extends AbstractComponent {
  constructor(state: StateHandler, events: EventHandler) {
    super()
    this.state = state
    this.events = events
  }

  compute(): void {
    const getConfig = this.state.config()
    const getSomethingComputed = this.state.computed(["axes", "x"])
    this.state.computed(["canvas"], { width: 100 })
  }
}

export default Canvas
