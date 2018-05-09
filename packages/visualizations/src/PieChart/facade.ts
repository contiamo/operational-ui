import PieChartCanvas from "./canvas"
import Series from "./series"
import PieChartFocus from "./focus"
import PieChartLegend from "./legend"
import Events from "../utils/event_catalog"
import StateHandler from "../utils/state_handler"
import EventEmitter from "../utils/event_bus"
import { isEmpty, uniqueId } from "lodash/fp"
import { operational } from "@operational/theme"
import {
  Accessors,
  AccessorsObject,
  Components,
  Computed,
  Data,
  Datum,
  Facade,
  FocusElement,
  PieChartConfig,
  RendererOptions,
} from "./typings"

class PieChartFacade implements Facade {
  private __disposed: boolean = false
  private canvas: PieChartCanvas
  private components: Components
  private context: Element
  private events: EventEmitter
  private series: Series
  private state: StateHandler<PieChartConfig, Data>

  constructor(context: Element) {
    this.context = context
    this.events = new EventEmitter()
    this.state = this.insertState()
    this.canvas = this.insertCanvas()
    this.components = this.insertComponents()
    this.series = this.insertSeries()
  }

  private insertState(): StateHandler<PieChartConfig, Data> {
    return new StateHandler({
      data: {},
      config: this.initialConfig(),
      accessors: this.initialAccessors(),
      computed: this.initialComputed(),
    })
  }

  private initialConfig(): PieChartConfig {
    return {
      duration: 1e3,
      focusOffset: 5,
      height: 500,
      hidden: false,
      legend: true,
      maxWidth: 100,
      maxLegendRatio: 1 / 2,
      maxLegendWidth: 200,
      maxTotalFontSize: 54,
      minChartWithLegend: 50,
      minWidth: 30,
      minInnerRadius: 30,
      minLegendWidth: 50,
      minTotalFontSize: 11,
      numberFormatter: (x: number): string => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      outerBorderMargin: 1,
      palette: operational.colors.visualizationPalette,
      showComponentFocus: false,
      uid: uniqueId("piechart"),
      visualizationName: "piechart",
      width: 500,
    }
  }

  private initialAccessors(): AccessorsObject {
    return {
      data: {
        data: (d: any): Data => d.data,
      },
      series: {
        name: (d: any): string => d.name || "",
        renderAs: (d: any): RendererOptions[] => d.renderAs,
      },
    }
  }

  private initialComputed(): Computed {
    return {
      canvas: {},
      focus: {},
      series: {},
    }
  }

  private insertCanvas(): PieChartCanvas {
    return new PieChartCanvas(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context)
  }

  private insertComponents(): Components {
    return {
      legend: new PieChartLegend(
        this.state.readOnly(),
        this.state.computedWriter(["legend"]),
        this.events,
        this.canvas.elementFor("legend")
      ),
      focus: new PieChartFocus(this.state.readOnly(), this.state.computedWriter(["focus"]), this.events, {
        main: this.canvas.elementFor("focus"),
        component: this.canvas.elementFor("componentFocus"),
      }),
    }
  }

  private insertSeries(): Series {
    return new Series(
      this.state.readOnly(),
      this.state.computedWriter(["series"]),
      this.events,
      this.canvas.elementFor("series")
    )
  }

  data(data?: any): any {
    return this.state.data(data)
  }

  config(config?: Partial<PieChartConfig>): PieChartConfig {
    return this.state.config(config)
  }

  accessors(type: string, accessors: Accessors<any>): Accessors<any> {
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
    this.components.legend.draw()
    this.canvas.draw()
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

export default PieChartFacade
