import ChartCanvas from "./canvas"
import ChartSeriesManager from "./series_manager"
import LegendManager from "./legend_manager"
import AxesManager from "./axes_manager"
import Events from "../utils/event_catalog"
import StateHandler from "../utils/state_handler"
import EventEmitter from "../utils/event_bus"
import { colorAssigner } from "@operational/utils"
import { operational as theme } from "@operational/theme"
import { assign, has, uniqueId } from "lodash/fp"
import {
  Accessors,
  AccessorsObject,
  AxesData,
  AxisPosition,
  ChartConfig,
  Components,
  Computed,
  Data,
  Datum,
  Facade,
  Object,
  Partial,
  RendererOptions,
  SeriesData,
} from "./typings"

class ChartFacade implements Facade {
  private __disposed: boolean = false
  private canvas: ChartCanvas
  private components: Components
  private context: Element
  private customColorAccessor: boolean
  private events: EventEmitter
  private series: ChartSeriesManager
  private state: StateHandler<ChartConfig, Data>

  constructor(context: Element) {
    this.context = context
    this.events = new EventEmitter()
    this.state = this.insertState()
    this.canvas = this.insertCanvas()
    this.components = this.insertComponents()
    this.series = this.insertSeries()
  }

  private insertState(): StateHandler<ChartConfig, Data> {
    return new StateHandler({
      data: {},
      config: this.initialConfig(),
      accessors: this.initialAccessors(),
      computed: this.initialComputed(),
    })
  }

  private initialConfig(): ChartConfig {
    return {
      duration: 1e3,
      height: 500,
      hidden: false,
      innerBarPadding: 2,
      innerBarPaddingCategorical: 0.2,
      legend: true,
      maxBarWidthRatio: 1 / 3,
      minBarWidth: 3,
      numberFormatter: (x: number): string => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      outerBarPadding: 10,
      palette: theme.colors.visualizationPalette,
      textlabels: {
        offset: 2,
        rotate: {
          horizontal: 0,
          vertical: -60,
        },
      },
      timeAxisPriority: ["x1", "x2", "y1", "y2"],
      uid: uniqueId("chart"),
      visualizationName: "chart",
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
        series: (d: Data): SeriesData => d.series,
        axes: (d: Data): AxesData => d.axes,
      },
      series: {
        data: (d: Object<any>): Datum[] => d.data,
        hide: (d: Object<any>): boolean => d.hide || false,
        hideInLegend: (d: Object<any>): boolean => d.hideInLegend || false,
        key: (d: Object<any>): string => d.key || uniqueId("key"),
        legendColor: (d: Object<any>): string => assignColors(d.key),
        legendName: (d: Object<any>): string => d.name || d.key || "",
        renderAs: (d: Object<any>): RendererOptions<any>[] => d.renderAs,
        axis: (d: Object<any>): AxisPosition => d.axis || "x1", // Only used for flags
        xAttribute: (d: Object<any>): string => d.xAttribute || "x",
        yAttribute: (d: Object<any>): string => d.yAttribute || "y",
        xAxis: (d: Object<any>): "x1" | "x2" => d.xAxis || "x1",
        yAxis: (d: Object<any>): "y1" | "y2" => d.yAxis || "y1",
      },
    }
  }

  private initialComputed(): Computed {
    return {
      axes: {},
      canvas: {},
      focus: {},
      series: {},
    }
  }

  private insertCanvas(): ChartCanvas {
    return new ChartCanvas(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context)
  }

  private insertComponents(): any {
    return {
      legends: new LegendManager(this.state.readOnly(), this.state.computedWriter(["legend"]), this.events, {
        top: {
          left: this.canvas.elementFor("legend-top-left"),
          right: this.canvas.elementFor("legend-top-right"),
        },
        bottom: {
          left: this.canvas.elementFor("legend-bottom-left"),
        },
      }),
      axes: new AxesManager(this.state.readOnly(), this.state.computedWriter("axes"), this.events, {
        xAxes: this.canvas.elementFor("xAxes"),
        xRules: this.canvas.elementFor("xRules"),
        yAxes: this.canvas.elementFor("yAxes"),
        yRules: this.canvas.elementFor("yRules"),
      }),
    }
  }

  private insertSeries(): ChartSeriesManager {
    return new ChartSeriesManager(
      this.state.readOnly(),
      this.state.computedWriter(["series"]),
      this.events,
      this.canvas.elementFor("series")
    )
  }

  data(data?: Data): Data {
    return this.state.data(data)
  }

  config(config?: Partial<ChartConfig>): ChartConfig {
    if (config.palette && !this.customColorAccessor) {
      const assignColors: (key: string, color?: string) => string = this.defaultColorAssigner(config.palette)
      this.accessors("series", {
        legendColor: (d: Object<any>): string => assignColors(d.key),
      })
    }
    return this.state.config(config)
  }

  accessors(type: string, accessors: Accessors<any>): Accessors<any> {
    if (type === "series" && has("legendColor")(accessors)) {
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
    this.series.assignData()
    this.components.legends.draw()
    this.components.axes.updateMargins()
    this.canvas.draw()
    this.components.axes.draw()
    this.series.draw()

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

export default ChartFacade
