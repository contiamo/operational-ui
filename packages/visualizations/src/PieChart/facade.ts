import Canvas from "./canvas"
import Series from "./series"
// import Focus from "./focus"
import Legend from "./legend"
import Events from "../utils/event_catalog"
import { StateHandler } from "../utils/state_handler"
import EventEmitter from "../utils/event_bus"
import { isEmpty, uniqueId } from "lodash/fp"
import {
  IAccessors,
  IAccessorsObject,
  IComputedState,
  IConfig,
  IChartStateObject,
  IObject,
  TFocusElement
} from "./typings"

class Facade {
  __disposed: boolean = false
  canvas: Canvas
  components: IObject
  context: Element
  events: EventEmitter
  series: Series
  state: StateHandler<IConfig>

  constructor(context: Element) {
    this.context = context
    this.events = new EventEmitter()
    this.state = this.insertState()
    this.canvas = this.insertCanvas()
    this.components = this.insertComponents()
    this.series = this.insertSeries()
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
      colors: {},
      duration: 1e3,
      // gaugeExtent: "semi",
      height: 500,
      hidden: false,
      legend: true,
      maxDonutWidth: 100,
      maxGaugeWidth: 70,
      maxLegendRatio: 1 / 2,
      maxLegendWidth: 200,
      maxTotalFontSize: 80,
      minChartWithLegend: 50,
      minDonutWidth: 30,
      minInnerRadius: 30,
      minLegendWidth: 50,
      minPolarSegmentWidth: 5,
      minTotalFontSize: 11,
      numberFormatter: (x: number): string => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      outerBorderMargin: 1,
      // renderer: "pie-chart",
      showComponentFocus: true,
      uid: uniqueId("piechart"),
      visualizationName: "piechart",
      width: 500
    }
  }

  initialAccessors(): IAccessorsObject {
    return {
      data: {
        data: (d: any): any => d.data
      },
      series: {
        comparison: (d: any): any => d.comparison,
        data: (d: any): any => d.data || [],
        name: (d: any): string => d.name || "",
        renderAs: (d: any): any => d.renderAs,
        target: (d: any): any => d.target
      }
    }
  }

  initialComputed(): IComputedState {
    return {
      canvas: {},
      focus: {},
      series: {}
    }
  }

  insertCanvas(): Canvas {
    return new Canvas(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context)
  }

  insertComponents(): IObject {
    return {
      legend: new Legend(this.state.readOnly(), "top", "left", this.canvas.elementFor("legends").top.left)
      // focus: new Focus(
      //   this.state.readOnly(),
      //   this.state.computedWriter(["focus"]),
      //   this.events,
      //   this.canvas.elementFor("focus")
      // )
    }
  }

  insertSeries(): Series {
    return new Series(
      this.state.readOnly(),
      this.state.computedWriter(["series"]),
      this.events,
      this.canvas.elementFor("series")
    )
  }

  data<T>(data?: T): T {
    return this.state.data(data)
  }

  config(config?: Partial<IConfig>): IConfig {
    return this.state.config(config)
  }

  accessors(type: string, accessors: IObject): IAccessors {
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
    this.series.initializeSeries()
    this.components.legend.draw()
    this.canvas.draw()
    this.series.draw()

    const focusElement: TFocusElement = this.state.config().focusElement
    !isEmpty(focusElement)
      ? this.events.emit(Events.FOCUS.ELEMENT.HIGHLIGHT, focusElement)
      : this.events.emit(Events.FOCUS.ELEMENT.OUT)

    return this.canvas.elementFor("series").node()
  }

  close(): void {
    if (this.__disposed) {
      return
    }
    this.__disposed = true
    // this.canvas.remove()
    this.events.removeAll()
    this.context.innerHTML = ""
  }
}

export default Facade
