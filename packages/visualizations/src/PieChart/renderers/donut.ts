import Events from "../../utils/event_catalog"
import { defaults, find, map } from "lodash/fp"
import * as d3 from "d3-selection"
import "d3-transition"
import { arc as d3Arc } from "d3-shape"
import { interpolateObject } from "d3-interpolate"
import { setPathAttributes, setTextAttributes } from "../../utils/d3_utils"
import * as styles from "./styles"
import * as Utils from "./renderer_utils"
import {
  ComputedArcs,
  ComputedData,
  ComputedDatum,
  ComputedInitial,
  D3Selection,
  Datum,
  DatumInfo,
  EventBus,
  HoverPayload,
  LegendDatum,
  Object,
  Partial,
  PieChartConfig,
  Renderer,
  RendererAccessor,
  RendererAccessors,
  State
} from "../typings"

const ANGLE_RANGE: [number, number] = [0, 2 * Math.PI]
const TOTAL_Y_OFFSET: string = "0.35em"

class Donut implements Renderer {
  private color: RendererAccessor<string>
  private computed: ComputedData
  private currentTranslation: [number, number]
  private data: Datum[]
  private drawn: boolean = false
  private el: D3Selection
  private events: EventBus
  private key: RendererAccessor<string>
  private previous: Partial<ComputedData>
  private state: State
  private type: "donut" | "polar" | "gauge" = "donut"
  private value: RendererAccessor<number>

  constructor(state: State, events: EventBus, el: D3Selection, options: Object<any>) {
    this.state = state
    this.events = events
    this.el = el
    this.updateOptions(options)
    this.events.on(Events.FOCUS.ELEMENT.HIGHLIGHT, this.highlightElement.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOVER, this.updateElementHover.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOUT, this.updateElementHover.bind(this))
    this.events.on(Events.CHART.MOUSEOUT, this.updateElementHover.bind(this))
  }

  // Initialization and updating config or accessors
  updateOptions(options: Object<any>): void {
    Utils.assignOptions(this, options)
  }

  setData(data: Datum[]): void {
    this.data = data || []
  }

  // Drawing
  draw(): void {
    this.compute()
    this.drawn ? this.updateDraw() : this.initialDraw()
  }

  private initialDraw(): void {
    // groups
    this.el.append("svg:g").attr("class", "arcs")
    this.el.append("svg:g").attr("class", styles.total)
    this.updateDraw()
    this.drawn = true
  }

  private updateDraw(): void {
    const config: PieChartConfig = this.state.current.get("config")
    const duration: number = config.duration
    const minTotalFontSize: number = config.minTotalFontSize
    const drawingDims: { width: number; height: number } = this.state.current.get("computed").canvas
      .drawingContainerDims

    // Remove focus before updating chart
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)

    // Center coordinate system
    this.currentTranslation = Utils.computeTranslate(drawingDims)
    this.el.attr("transform", Utils.translateString(this.currentTranslation))

    // Arcs
    const arcs: D3Selection = Utils.createArcGroups(this.el, this.computed.data, this.key)
    // Exit
    Utils.exitArcs(arcs, duration, this.removeArcTween.bind(this))
    // Enter
    Utils.enterArcs(arcs, this.onMouseOver.bind(this), this.onMouseOut.bind(this))
    // Update
    const updatingArcs: D3Selection = arcs.merge(arcs.enter().selectAll(`g.${styles.arc}`))
    setPathAttributes(updatingArcs.select("path"), this.arcAttributes(), duration)
    setTextAttributes(updatingArcs.select("text"), Utils.textAttributes(this.computed), duration)
    // Total / center text
    const options = { minTotalFontSize, innerRadius: this.computed.inner, yOffset: TOTAL_Y_OFFSET }
    Utils.updateTotal(this.el, this.centerDisplayString(), duration, options)
  }

  private arcAttributes(): Object<any> {
    return {
      path: this.arcTween.bind(this),
      fill: this.color.bind(this)
    }
  }

  // Interpolate the arcs in data space.
  private arcTween(d: ComputedDatum): (t: number) => string {
    const previousData: ComputedDatum[] = this.previous.data || [],
      old: ComputedDatum = find((datum: ComputedDatum): boolean => datum.index === d.index)(previousData),
      previous: ComputedDatum = find((datum: ComputedDatum): boolean => datum.index === d.index - 1)(previousData),
      last: ComputedDatum = previousData[previousData.length - 1]

    let s0: number
    let e0: number
    if (old) {
      s0 = old.startAngle
      e0 = old.endAngle
    } else if (!old && previous) {
      s0 = previous.endAngle
      e0 = previous.endAngle
    } else if (!previous && previousData.length > 0) {
      s0 = last.endAngle
      e0 = last.endAngle
    } else {
      s0 = 0
      e0 = 0
    }

    const innerRadius: number = this.previous.inner || this.computed.inner
    const outerRadius: number = this.previous.r || this.computed.r
    const f = interpolateObject(
      { innerRadius, outerRadius, endAngle: e0, startAngle: s0 },
      { innerRadius: this.computed.inner, outerRadius: this.computed.r, endAngle: d.endAngle, startAngle: d.startAngle }
    )
    return (t: number): string => this.computed.arc(f(t))
  }

  private removeArcTween(d: ComputedDatum, i: number): (t: number) => string {
    let s0: number
    let e0: number
    s0 = e0 = ANGLE_RANGE[1]
    const f = interpolateObject({ endAngle: d.endAngle, startAngle: d.startAngle }, { endAngle: e0, startAngle: s0 })
    return (t: number): string => this.computed.arc(f(t))
  }

  private centerDisplayString(): string {
    return this.computed.inner > 0 ? this.computed.total.toString() : ""
  }

  // Data computation / preparation
  private compute(): void {
    this.previous = this.computed

    const d: ComputedInitial = {
      layout: Utils.layout(this.angleValue.bind(this), ANGLE_RANGE),
      total: Utils.computeTotal(this.data, this.value)
    }

    // data should not become part of this.previous in first computation
    this.previous = defaults(d)(this.previous)

    Utils.calculatePercentages(this.data, this.angleValue.bind(this), d.total)

    this.computed = {
      ...d,
      ...this.computeArcs(d),
      data: d.layout(this.data)
    }
  }

  private angleValue(d: Datum): number {
    return this.value(d) || d.value
  }

  private computeArcs(computed: ComputedInitial): ComputedArcs {
    const drawingDims: { width: number; height: number } = this.state.current.get("computed").canvas
        .drawingContainerDims,
      r: number = this.computeOuter(drawingDims),
      inner: number = this.computeInner(r),
      rHover: number = r + 1,
      innerHover: number = Math.max(inner - 1, 0)
    return {
      r,
      inner,
      rHover,
      innerHover,
      arc: d3Arc(),
      arcOver: d3Arc()
        .innerRadius(innerHover)
        .outerRadius(rHover)
    }
  }

  private computeOuter(drawingDims: { width: number; height: number }): number {
    const outerBorderMargin: number = this.state.current.get("config").outerBorderMargin
    return Math.min(drawingDims.width, drawingDims.height) / 2 - outerBorderMargin
  }

  private computeInner(outerRadius: number): number {
    const config: PieChartConfig = this.state.current.get("config")
    const width: number = outerRadius - config.minInnerRadius
    // If there isn't enough space, don't render inner circle
    return width < config.minWidth ? 0 : outerRadius - Math.min(width, config.maxWidth)
  }

  // Event listeners / handlers
  private onMouseOver(d: ComputedDatum): void {
    const datumInfo: DatumInfo = {
      key: this.key(d),
      value: this.value(d),
      percentage: d.data.percentage
    }
    const centroid: [number, number] = Utils.translateBack(this.computed.arcOver.centroid(d), this.currentTranslation)
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOVER, { d: datumInfo, focusPoint: { centroid } })
  }

  private updateElementHover(datapoint: HoverPayload): void {
    if (!this.drawn) {
      return
    }

    const arcs: any = this.el.select("g.arcs").selectAll("g")
    const filterFocused: any = (d: Datum): boolean => datapoint.d && this.key(d) === datapoint.d.key
    const filterUnFocused: any = (d: Datum): boolean => (datapoint.d ? this.key(d) !== datapoint.d.key : true)
    const shadowDefinitionId: string = this.state.current.get("computed").canvas.shadowDefinitionId

    Utils.updateFilteredPathAttributes(arcs, filterFocused, this.computed.arcOver, shadowDefinitionId)
    Utils.updateFilteredPathAttributes(arcs, filterUnFocused, this.computed.arc)
  }

  private highlightElement(key: string): void {
    const d: ComputedDatum = find((datum: ComputedDatum): boolean => this.key(datum) === key)(this.computed.data)
    if (!d) {
      return
    }
    this.onMouseOver(d)
  }

  private onMouseOut(): void {
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)
  }

  // External methods
  dataForLegend(): LegendDatum[] {
    return map((datum: Datum): LegendDatum => {
      return {
        label: this.key(datum),
        color: this.color(datum)
      }
    })(this.data)
  }

  // Remove & clean up
  remove(): void {
    if (this.drawn) {
      this.el.remove()
      this.drawn = false
    }
  }
}

export default Donut
