import StateHandler from "./state_handler"
import EventHandler from "./event_handler"

abstract class AbstractChart {
  state: StateHandler
  events: EventHandler
  components: any
  context: any

  constructor(context: any) {
    this.context = context
  }
}

export default AbstractChart
