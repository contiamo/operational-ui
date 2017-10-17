import StateHandler from "./state_handler"
import EventEmitter from "./event_bus"
import { uniqueId, merge } from "lodash/fp"
import { IDefaultState } from "./typings"

abstract class AbstractChart {
  state: StateHandler
  events: EventEmitter
  components: any
  context: any
  __disposed: boolean
  drawn: boolean = false
  dirty: boolean = false

  constructor(context: any) {
    this.context = context
    this.state = new StateHandler(this.defaultState())
    this.events = new EventEmitter()
    this.insertCanvas()
    this.initializeComponents()
    this.initializeSeries()
  }

  abstract visualizationName(): string

  baseDefaultState(): IDefaultState {
    return {
      data: {},
      config: {
        duration: 1e3,
        height: 1000,
        uid: uniqueId(this.visualizationName()),
        visualizationName: this.visualizationName(),
        width: 500,
      },
      accessors: {},
      computed: {
        series: {},
        canvas: {},
      }
    }
  }

  defaultState(): IDefaultState {
    return merge(this.baseDefaultState())({
      data: this.defaultData(),
      config: this.defaultConfig(),
      accessors: this.defaultAccessors(),
      computed: this.defaultComputed(),
    })
  }

  defaultData(): any {
    return {}
  }

  defaultConfig(): any {
    return {}
  }

  defaultAccessors(): any {
    return {}
  }

  defaultComputed(): any {
    return {}
  }

  abstract insertCanvas(): void

  initializeComponents(): void {}

  abstract initializeSeries(): void

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
    this.events.removeListener(event, handler)
  }

  // Draw / resize
  abstract draw(args?: any): any

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
