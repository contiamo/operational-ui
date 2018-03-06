import Canvas from "./canvas"
import Renderer from "./renderer"
import Breadcrumb from "./breadcrumb"
import RootLabel from "./root_label"
import SunburstFocus from "./focus"
import Events from "../utils/event_catalog"
import { StateHandler } from "../utils/state_handler"
import EventEmitter from "../utils/event_bus"
import { every, find, has, isEmpty, uniqueId } from "lodash/fp"
import { Components, IAccessors, IComputedState, IConfig, IChartStateObject, IObject, TDatum } from "./typings"
import { colorAssigner } from "@operational/utils"

class Facade {
  __disposed: boolean = false
  canvas: Canvas
  components: IObject
  context: Element
  customColorAccessor: boolean = false
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
      arrowOffset: 10,
      centerCircleRadius: 0.9,
      disableAnimations: false,
      duration: 1e3,
      height: 500,
      hidden: false,
      maxRings: 10,
      numberFormatter: (x: number): string => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      outerBorderMargin: 1,
      palette: ["#bbb"],
      propagateColors: true,
      sort: true,
      uid: uniqueId("sunburst"),
      visualizationName: "sunburst",
      width: 500
    }
  }

  defaultColorAssigner(palette: string[]): (key: string) => string {
    return colorAssigner(palette)
  }

  initialAccessors(): IAccessors {
    const assignColors: (key: string) => string = this.defaultColorAssigner(this.initialConfig().palette)
    return {
      data: {
        data: (data: IObject): IObject => data
      },
      series: {
        color: (d: TDatum): string => assignColors(d.name),
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

  insertComponents(): Components {
    return {
      breadcrumb: new Breadcrumb(
        this.state.readOnly(),
        this.state.computedWriter(["breadcrumb"]),
        this.events,
        this.canvas.elementFor("breadcrumb")
      ),
      focus: new SunburstFocus(
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
      ),
      rootLabel: new RootLabel(
        this.state.readOnly(),
        this.state.computedWriter(["rootLabel"]),
        this.events,
        this.canvas.elementFor("rootLabel")
      )
    }
  }

  data<T>(data?: T): T {
    return this.state.data(data)
  }

  config(config?: Partial<IConfig>): IConfig {
    if (config.palette && !this.customColorAccessor) {
      const assignColors: (key: string, color?: string) => string = this.defaultColorAssigner(config.palette)
      this.accessors("series", {
        color: (d: TDatum): string => assignColors(d.name, d.color)
      })
    }
    return this.state.config(config)
  }

  accessors(type: string, accessors: IObject): IObject {
    if (type === "series" && has("color")(accessors)) {
      this.customColorAccessor = true
    }
    return this.state.accessors(type, accessors)
  }

  on(event: string, handler: any): void {
    this.events.on(event, handler)
  }

  off(event: string, handler: any): void {
    this.events.removeListener(event, handler)
  }

  private findNode = (matchers: IObject): TDatum => {
    return find((d: TDatum): boolean => {
      return every.convert({ cap: false })((value: any, key: string): boolean => {
        return (d.data[key] || d[key]) === value
      })(matchers)
    })(this.state.readOnly().current.get("computed").renderer.data)
  }

  draw(): Element {
    this.state.captureState()
    this.canvas.draw()
    this.components.renderer.draw()

    const zoomMatchers: IObject = this.state.config().zoomNode
    const zoomNode: TDatum = zoomMatchers ? this.findNode(zoomMatchers) : undefined

    zoomNode
      ? this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d: zoomNode })
      : this.events.emit(Events.FOCUS.ELEMENT.CLICK)

    return this.canvas.elementFor("series").node()
  }

  close(): void {
    if (this.__disposed) {
      return
    }
    this.__disposed = true
    this.canvas.remove()
    this.events.removeAll()
    this.context.innerHTML = ""
  }
}

export default Facade
