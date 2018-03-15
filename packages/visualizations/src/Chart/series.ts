import { D3Selection, EventBus, SeriesOptions, State, StateWriter } from "./typings"

class ChartSeries {
  el: D3Selection
  events: EventBus
  options: SeriesOptions
  state: any
  stateWriter: StateWriter

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection, options: SeriesOptions) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.options = options
  }

  update(options: SeriesOptions): void {
    this.options = options
  }
}

export default ChartSeries
