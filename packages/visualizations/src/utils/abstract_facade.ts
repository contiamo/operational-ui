import StateHandler from "./state_handler"
import EventEmitter from "./event_bus"
import { uniqueId, merge } from "lodash/fp"
import {
  IAccessors,
  IAccessorsObject,
  IChartStateObject,
  IDefaultConfig,
  INestedObject,
  IObject,
} from "./typings"

abstract class AbstractChart {
  state: StateHandler
  events: EventEmitter
  components: IObject
  context: Element
  __disposed: boolean = false
  drawn: boolean = false
  dirty: boolean = false

  constructor(context: Element) {
    this.context = context
    this.state = new StateHandler(this.defaultState())
    this.events = new EventEmitter()
    this.insertCanvas()
    this.initializeComponents()
    this.initializeSeries()
  }

  abstract visualizationName(): string

  private baseDefaultState(): IChartStateObject {
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
      computed: {}
    }
  }

  defaultState(): IChartStateObject {
    return merge(this.baseDefaultState())({
      data: this.defaultData(),
      config: this.defaultConfig(),
      accessors: this.defaultAccessors(),
      computed: this.defaultComputed(),
    })
  }

  defaultData(): Array<any> | IObject {
    return {}
  }

  defaultConfig(): Partial<IDefaultConfig> {
    return {}
  }

  defaultAccessors(): Partial<IAccessorsObject> {
    return {}
  }

  defaultComputed(): INestedObject {
    return {}
  }

  abstract insertCanvas(): void

  initializeComponents(): void {}

  abstract initializeSeries(): void

  data(data?: any) {
    this.dirty = true
    return this.state.data(data)
  }

  config(config?: IObject) {
    this.dirty = true
    return this.state.config(config)
  }

  accessors(type: string, accessors: IAccessors) {
    this.dirty = true
    return this.state.accessors(type, accessors)
  }

  on(event: string, handler: any) {
    this.events.on(event, handler)
  }

  off(event: string, handler: any) {
    this.events.removeListener(event, handler)
  }

  // Draw
  abstract draw(): Element

  // Close / cleanup
  close(): void {
    if (this.__disposed) {
      return
    }
    this.__disposed = true
    this.events.removeAll()
    this.context.innerHTML = ""
  }
}

export default AbstractChart
