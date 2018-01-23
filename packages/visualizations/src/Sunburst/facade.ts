import Canvas from "./canvas"
import Renderer from "./renderer"
import Breadcrumb from "./breadcrumb"
import Focus from "./focus"
import Events from "../utils/event_catalog"
import { StateHandler } from "../utils/state_handler"
import EventEmitter from "../utils/event_bus"
import { every, find, isEmpty, uniqueId } from "lodash/fp"
import { IAccessors, IComputedState, IConfig, IChartStateObject, IObject, TDatum } from "./typings"

class Facade {
  __disposed: boolean = false
  canvas: Canvas
  components: IObject
  context: Element
  events: EventEmitter
  state: StateHandler<IConfig>

  constructor(context: Element) {
    this.context = context
    this.events = new EventEmitter()
    this.state = this.insertState()
    this.canvas = this.insertCanvas()
    this.components = this.insertComponents()
  }

  insertState(): StateHandler<IConfig> {
    return new StateHandler({
      data: {},
      config: this.initialConfig(),
      accessors: this.initialAccessors(),
      computed: this.initialComputed()
    })
  }

  initialConfig(): IConfig {
    return {
      duration: 1e3,
      height: 500,
      hidden: false,
      maxWidth: 100,
      maxTotalFontSize: 80,
      minWidth: 30,
      minInnerRadius: 30,
      minTotalFontSize: 11,
      numberFormatter: (x: number): string => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      outerBorderMargin: 1,
      showComponentFocus: true,
      uid: uniqueId("sunburst"),
      visualizationName: "sunburst",
      width: 500
    }
  }

  initialAccessors(): IAccessors {
    return {
      series: {
        children: (d: TDatum): IObject[] => d.children || [],
        color: (d: TDatum): string => d.color,
        name: (d: TDatum): string => d.name || "",
        value: (d: TDatum): number => d.value
      }
    }
  }

  initialComputed(): IComputedState {
    return {
      canvas: {},
      focus: {},
      renderer: {}
    }
  }

  insertCanvas(): Canvas {
    return new Canvas(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context)
  }

  insertComponents(): IObject {
    return {
      breadcrumb: new Breadcrumb(
        this.state.readOnly(),
        this.state.computedWriter(["breadcrumb"]),
        this.events,
        this.canvas.elementFor("breadcrumb")
      ),
      focus: new Focus(
        this.state.readOnly(),
        this.state.computedWriter(["focus"]),
        this.events,
        this.canvas.elementFor("focus")
      ),
      renderer: new Renderer(
        this.state.readOnly(),
        this.state.computedWriter(["renderer"]),
        this.events,
        this.canvas.elementFor("series")
      )
    }
  }

  data<T>(data?: T): T {
    return this.state.data(data)
  }

  config(config?: Partial<IConfig>): IConfig {
    return this.state.config(config)
  }

  accessors(type: string, accessors: IObject): IObject {
    return this.state.accessors(type, accessors)
  }

  on(event: string, handler: any): void {
    this.events.on(event, handler)
  }

  off(event: string, handler: any): void {
    this.events.removeListener(event, handler)
  }

  draw(): Element {
    this.state.captureState()
    this.canvas.draw()
    this.components.renderer.draw()

    const data: TDatum[] = this.state.readOnly().current.get("computed").renderer.data
    const zoomNode: TDatum = find((d: TDatum): boolean => {
      return every.convert({ cap: false })((value: any, key: string): boolean => {
        return d[key] || d.data[key] === value
      })(this.state.config().zoomNode)
    })(data)

    !isEmpty(zoomNode)
      ? this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d: zoomNode })
      : this.events.emit(Events.FOCUS.ELEMENT.CLICK)

    return this.canvas.elementFor("series").node()
  }

  close(): void {
    if (this.__disposed) {
      return
    }
    this.__disposed = true
    this.events.removeAll()
    this.context.innerHTML = ""
  }
}

export default Facade
