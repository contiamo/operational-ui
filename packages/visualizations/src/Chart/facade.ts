import ChartCanvas from "./canvas"
import ChartSeriesManager from "./series_manager"
import LegendManager from "./legend_manager"
import AxesManager from "./axes_manager"
import Events from "../utils/event_catalog"
import StateHandler from "../utils/state_handler"
import EventEmitter from "../utils/event_bus"
import { colorAssigner } from "@operational/utils"
import { operational } from "@operational/theme"
import { assign, has, isEmpty, uniqueId } from "lodash/fp"
import * as d3 from "d3-selection" // @TODO delete
import {
  Accessors,
  AccessorsObject,
  AxesData,
  ChartConfig,
  Components,
  Computed,
  Data,
  Datum,
  Facade,
  FocusElement,
  Object,
  Partial,
  RendererOptions,
  SeriesData,
  XAxisConfig,
  YAxisConfig
} from "./typings"

const xAxisConfig: Partial<XAxisConfig> = {
  margin: 14,
  minTicks: 2,
  noAxisMargin: 3,
  tickSpacing: 65,
  outerPadding: 3
}

const yAxisConfig: Partial<YAxisConfig> = {
  margin: 34,
  minTicks: 4,
  minTopOffsetTopTick: 21,
  noAxisMargin: 21,
  tickSpacing: 40,
  outerPadding: 3
}

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
      computed: this.initialComputed()
    })
  }

  // @TODO check which of these are actually needed
  private initialConfig(): ChartConfig {
    return {
      axisPaddingForFlags: 15,
      barLineThickness: 2,
      dateFocusLabelMargin: 20,
      duration: 1e3,
      durationCollapse: 0.33,
      durationRedraw: 0.67,
      elementFocusLabelMargin: 7,
      eventFlagAxisOffset: 10,
      flagHeight: 10,
      flagWidth: 8,
      focusDateOptions: ["label", "line", "points"],
      focusOnHover: true,
      height: 500,
      hidden: false,
      innerBarPadding: 2,
      legend: true,
      maxBarWidthRatio: 1 / 3,
      maxLabelWidth: 250,
      maxLegendRatio: 1 / 2,
      maxLegendWidth: 200,
      minBarTickWidth: {
        ord: 13
      },
      minBarWidth: 3,
      minChartWithLegend: 100,
      minLegendWidth: 50,
      numberFormatter: (x: number): string => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      outerBarPadding: 10,
      palette: operational.colors.visualizationPalette,
      showComponentFocus: true,
      targetLineColor: "#999",
      textlabels: {
        offset: 2,
        rotate: {
          horizontal: 0,
          vertical: -60
        }
      },
      timeAxisPriority: ["x1", "x2", "y1", "y2"],
      uid: uniqueId("chart"),
      visualizationName: "chart",
      width: 500,
      x1: assign({ tickOffset: 12 })(xAxisConfig),
      x2: assign({ tickOffset: -4 })(xAxisConfig),
      y1: assign({ tickOffset: -4 })(yAxisConfig),
      y2: assign({ tickOffset: 4 })(yAxisConfig)
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
        axes: (d: Data): AxesData => d.axes
      },
      series: {
        data: (d: Object<any>): Datum[] => d.data,
        hide: (d: Object<any>): boolean => false,
        hideInLegend: (d: Object<any>): boolean => false,
        key: (d: Object<any>): string => d.key || uniqueId("key"),
        legendColor: (d: Object<any>): string => assignColors(d.key),
        legendName: (d: Object<any>): string => d.name || d.key || "",
        renderAs: (d: Object<any>): RendererOptions<any>[] => d.renderAs,
        unit: (d: Object<any>): string => d.unit || "",
        xAxis: (d: Object<any>): "x1" | "x2" => d.xAxis || "x1",
        yAxis: (d: Object<any>): "y1" | "y2" => d.yAxis || "y1"
      }
    }
  }

  private initialComputed(): Computed {
    return {
      axes: {},
      canvas: {},
      focus: {},
      series: {}
    }
  }

  private insertCanvas(): ChartCanvas {
    return new ChartCanvas(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context)
  }

  // @TODO
  private insertComponents(): any {
    // Components {
    return {
      legends: new LegendManager(this.state.readOnly(), this.state.computedWriter(["legend"]), this.events, {
        top: {
          left: this.canvas.elementFor("legend-top-left"),
          right: this.canvas.elementFor("legend-top-right")
        },
        bottom: {
          left: this.canvas.elementFor("legend-bottom-left")
        }
      }),
      axes: new AxesManager(this.state.readOnly(), this.state.computedWriter("axes"), this.events, {
        xAxes: this.canvas.elementFor("xAxes"),
        xRules: this.canvas.elementFor("xRules"),
        yAxes: this.canvas.elementFor("yAxes"),
        yRules: this.canvas.elementFor("yRules")
      })
      // focus: new ChartFocus(this.state.readOnly(), this.state.computedWriter(["focus"]), this.events, {
      //   main: this.canvas.elementFor("focus"),
      //   component: this.canvas.elementFor("componentFocus")
      // })
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
        legendColor: (d: Object<any>): string => assignColors(d.key)
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
    this.canvas.draw()
    this.components.axes.draw()
    this.series.draw()

    const focusElement: FocusElement = this.state.config().focusElement
    !isEmpty(focusElement)
      ? this.events.emit(Events.FOCUS.ELEMENT.HIGHLIGHT, focusElement)
      : this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)

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
