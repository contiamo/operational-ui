import StateHandler from "./state_handler"
import EventHandler from "./event_handler"

abstract class AbstractComponent {
  state: StateHandler
  events: EventHandler
}

export default AbstractComponent
