import SunburstCanvas from "./canvas"
import Renderer from "./renderer"
import Breadcrumb from "./breadcrumb"
import RootLabel from "./root_label"
import SunburstFocus from "./focus"
import StateHandler from "../shared/state_handler"
import EventEmitter from "../shared/event_bus"
import { has, uniqueId } from "lodash/fp"
import { colorAssigner } from "../utils/colorAssigner"
import theme from "../utils/constants"
import defaultNumberFormatter from "../utils/number_formatter"
import { Accessors, AccessorsObject, Components, Facade, RawData, SunburstConfig } from "./typings"

const defaultConfig = (): SunburstConfig => {
  return {
    arrowOffset: 10,
    breadcrumbItemWidth: 80,
    centerCircleRadius: 0.9,
    disableAnimations: false,
    duration: 1e3,
    focusOffset: 5,
    height: 500,
    hidden: false,
    maxBreadcrumbLength: 4,
    maxRings: 10,
    maxTotalFontSize: 54,
    minTotalFontSize: theme.font.small.fontSize,
    numberFormatter: defaultNumberFormatter,
    outerBorderMargin: 1,
    palette: theme.palettes.qualitative.generic,
    propagateColors: true,
    sort: true,
    uid: uniqueId("sunburst"),
    visualizationName: "sunburst",
    width: 500,
  }
}

const defaultColorAssigner = (palette: string[]): ((key: string) => string) => {
  return colorAssigner(palette)
}

const defaultAccessors = (): AccessorsObject => {
  const assignColors: (key: string) => string = defaultColorAssigner(defaultConfig().palette)
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
      config: defaultConfig(),
      accessors: defaultAccessors(),
      computed: {},
    })
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
        this.canvas.elementFor("breadcrumb"),
      ),
      focus: new SunburstFocus(
        this.state.readOnly(),
        this.state.computedWriter(["focus"]),
        this.events,
        this.canvas.elementFor("focus"),
      ),
      renderer: new Renderer(
        this.state.readOnly(),
        this.state.computedWriter(["renderer"]),
        this.events,
        this.canvas.elementFor("series"),
      ),
      rootLabel: new RootLabel(
        this.state.readOnly(),
        this.state.computedWriter(["rootLabel"]),
        this.events,
        this.canvas.elementFor("rootLabel"),
      ),
    }
  }

  data(data?: RawData): RawData {
    return this.state.data(data)
  }

  config(config?: Partial<SunburstConfig>): SunburstConfig {
    if (config.palette && !this.customColorAccessor) {
      const assignColors: (key: string, color?: string) => string = defaultColorAssigner(config.palette)
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
