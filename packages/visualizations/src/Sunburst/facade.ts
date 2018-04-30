import SunburstCanvas from "./canvas"
import Renderer from "./renderer"
import Breadcrumb from "./breadcrumb"
import RootLabel from "./root_label"
import SunburstFocus from "./focus"
import Events from "../utils/event_catalog"
import StateHandler from "../utils/state_handler"
import EventEmitter from "../utils/event_bus"
import { every, find, has, isEmpty, uniqueId } from "lodash/fp"
import { colorAssigner } from "@operational/utils"
import { operational } from "@operational/theme"
import { Accessors, AccessorsObject, Components, Computed, Facade, Object, RawData, SunburstConfig } from "./typings"

class SunburstFacade implements Facade {
  private __disposed: boolean = false
  private canvas: SunburstCanvas
  private components: Components
  private context: Element
  private customColorAccessor: boolean = false
  private events: EventEmitter
  private state: StateHandler<SunburstConfig, RawData>

  constructor(context: Element) {
    this.context = context
    this.events = new EventEmitter()
    this.state = this.insertState()
    this.canvas = this.insertCanvas()
    this.components = this.insertComponents()
  }

  private insertState(): StateHandler<SunburstConfig, RawData> {
    return new StateHandler({
      data: {},
      config: this.initialConfig(),
      accessors: this.initialAccessors(),
      computed: this.initialComputed(),
    })
  }

  private initialConfig(): SunburstConfig {
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
      palette: operational.colors.visualizationPalette,
      propagateColors: true,
      sort: true,
      uid: uniqueId("sunburst"),
      visualizationName: "sunburst",
      width: 500,
    }
  }

  private defaultColorAssigner(palette: string[]): (key: string) => string {
    return colorAssigner(palette)
  }

  private initialAccessors(): AccessorsObject {
    const assignColors: (key: string) => string = this.defaultColorAssigner(this.initialConfig().palette)
    return {
      data: {
        data: (data: any): RawData => data,
      },
      series: {
        color: (d: RawData): string => assignColors(d.name),
        id: (d: RawData): string => d.name,
        name: (d: RawData): string => d.name || "",
        value: (d: RawData): number => d.value,
      },
    }
  }

  private initialComputed(): Computed {
    return {
      canvas: {},
      focus: {},
      renderer: {},
    }
  }

  private insertCanvas(): SunburstCanvas {
    return new SunburstCanvas(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context)
  }

  private insertComponents(): Components {
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
      ),
    }
  }

  data(data?: any): any {
    return this.state.data(data)
  }

  config(config?: Partial<SunburstConfig>): SunburstConfig {
    if (config.palette && !this.customColorAccessor) {
      const assignColors: (key: string, color?: string) => string = this.defaultColorAssigner(config.palette)
      this.accessors("series", {
        color: (d: RawData): string => assignColors(d.name, d.color),
      })
    }
    return this.state.config(config)
  }

  accessors(type: string, accessors: Accessors<any>): Accessors<any> {
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

  draw(): Element {
    this.state.captureState()
    this.canvas.draw()
    this.components.renderer.draw()
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

export default SunburstFacade
