import StateHandler from "./state_handler"
import EventHandler from "./event_handler"
import * as $ from "jquery"

abstract class AbstractChart {
  state: StateHandler
  events: EventHandler
  components: any
  context: any
  __disposed: boolean
  drawn: boolean = false
  dirty: boolean = false

  constructor(context: any) {
    this.context = context
    this.state = new StateHandler(this.defaultConfig())
    this.events = new EventHandler()
    this.initializeSeries()
    this.initializeComponents()
  }

  abstract defaultConfig(): any

  abstract initializeSeries(): void

  initializeComponents(): void {}

  data(data?: any) {
    this.dirty = true
    return this.state.data(data)
  }

  config(config?: Object) {
    this.dirty = true
    return this.state.config(config)
  }

  accessors(type: string, accessors: Object) {
    this.dirty = true
    return this.state.accessors(type, accessors)
  }

  on(event: string, handler: any) {
    this.events.on(event, handler)
  }

  off(event: string, handler: any) {
    this.events.off(event, handler)
  }

  hasData(): boolean {
    return this.state.hasData()
  }

  // Clear all data (does not render, need to call "#draw")
  clear(): void {
    this.data({})
  }

  // Draw / resize
  abstract draw(args?: any): any

  //@TODO implement
  redraw(drawAll: () => void): void {}

  resize(width: number, height: number): void {
    this.config({ width: width, height: height })
    if (!this.drawn) {
      return
    }
    if (this.dirty) {
      this.draw()
    }
  }

  // Focus
  // Date Axes
  focusDate(date: Date, periodUnit: string): void {
    return
  }

  // Ordinal Axes
  focusElement(): void {
    return
  }

  focusClear(): void {
    return
  }

  // Hide / show
  hide(): void {
    $(this.context).hide()
  }

  show(): void {
    $(this.context).show()
  }

  // Close / cleanup
  close(): void {
    if (this.__disposed) {
      return
    }
    this.__disposed = true
    // this.state.close();
    // this.trigger("close");
    // this.off();
  }
}

export default AbstractChart
