import FocusUtils from "../utils/focus_utils"
import Events from "../utils/event_catalog"
import ComponentFocus from "../utils/component_focus"
import DateFocus from "./focus/date_focus"
import ElementFocus from "./focus/element_focus"
import FlagFocus from "./focus/flag_focus"
import * as d3 from "d3-selection"
import {
  D3Selection,
  Dimensions,
  EventBus,
  Focus,
  HoverPayload,
  Object,
  Point,
  Position,
  SeriesEl,
  State,
  StateWriter,
} from "./typings"

const percentageString = (percentage: number): string => percentage.toFixed(1) + "%"

class ChartFocus implements Focus {
  private el: SeriesEl
  private componentFocus: ComponentFocus
  private dateFocus: DateFocus
  private elementFocus: ElementFocus
  private flagFocus: FlagFocus
  private state: State
  private stateWriter: StateWriter
  private events: EventBus

  constructor(state: State, stateWriter: StateWriter, events: EventBus, els: { [key: string]: D3Selection }) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = els.main
    this.componentFocus = new ComponentFocus(this.state, els.component, this.events)
    this.dateFocus = new DateFocus(this.state, els, this.events)
    this.elementFocus = new ElementFocus(this.state, els, this.events)
    this.flagFocus = new FlagFocus(this.state, els.main, this.events)
    this.events.on(Events.FOCUS.CLEAR, this.remove.bind(this))
    this.events.on(Events.CHART.OUT, this.remove.bind(this))
  }

  remove(): void {
    this.componentFocus.remove()
    this.dateFocus.remove()
    this.flagFocus.remove()
  }
}

export default ChartFocus
