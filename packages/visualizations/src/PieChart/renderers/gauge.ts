import Events from "../../utils/event_catalog"
import { defaults, filter, find, findIndex, forEach, last, map, reduce } from "lodash/fp"
import * as d3 from "d3-selection"
import "d3-transition"
import { arc as d3Arc } from "d3-shape"
import { interpolateObject } from "d3-interpolate"
import { scaleLinear as d3ScaleLinear } from "d3-scale"
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
  State,
} from "../typings"

class Gauge implements Renderer {
  private color: RendererAccessor<string>
  private comparison: Datum
  private computed: ComputedData
  private currentTranslation: [number, number]
  private data: Datum[]
  private drawn: boolean = false
  private el: D3Selection
  private events: EventBus
  private extent: "semi" | "full"
  private previousComputed: Partial<ComputedData>
  private target: number
  private total: number
  key: RendererAccessor<string>
  state: State
  type: "donut" | "polar" | "gauge" = "gauge"
  value: RendererAccessor<number>

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
    const maxTotalFontSize: number = config.maxTotalFontSize
    const minTotalFontSize: number = config.minTotalFontSize
    const drawingDims: { width: number; height: number } = this.state.current.get("computed").canvas
      .drawingContainerDims

    // Remove focus before updating chart
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)

    // Center coordinate system
    this.currentTranslation = Utils.computeTranslate(drawingDims, this.extent === "semi" ? this.computed.r : 0)
    this.el.attr("transform", Utils.translateString(this.currentTranslation))

    // Arcs
    const arcs: D3Selection = Utils.createArcGroups(this.el, this.computed.data, this.key)
    // Exit
    Utils.exitArcs(arcs, duration, Utils.removeArcTween(this.computed, this.angleRange()))
    // Enter
    Utils.enterArcs(arcs, this.onMouseOver.bind(this), this.onMouseOut.bind(this))
    // Update
    const updatingArcs: D3Selection = arcs.merge(arcs.enter().selectAll(`g.${styles.arc}`))
    setPathAttributes(updatingArcs.select("path"), this.arcAttributes(), duration)
    setTextAttributes(updatingArcs.select("text"), Utils.textAttributes(this.computed), duration, () =>
      Utils.updateBackgroundRects(updatingArcs, this.computed.arcOver.centroid)
    )
    // Total / center text
    const options = {
      maxTotalFontSize,
      minTotalFontSize,
      innerRadius: this.computed.rInner,
      yOffset: this.totalYOffset(),
    }
    Utils.updateTotal(this.el, this.centerDisplayString(), duration, options)
    // Comparison line
    this.updateComparison()
  }

  private arcAttributes(): Object<any> {
    return {
      path: this.arcTween.bind(this),
      fill: this.arcColor.bind(this),
    }
  }

  private arcColor(d: Datum): string {
    return d.unfilled ? undefined : this.color(d)
  }

  private angleRange(): [number, number] {
    return this.extent === "semi" ? [-Math.PI / 2, Math.PI / 2] : [-Math.PI, Math.PI]
  }

  private totalYOffset(): string {
    return this.extent === "semi" ? "0" : "0.35em"
  }

  // Interpolate the arcs in data space.
  private arcTween(d: ComputedDatum, i: number): (t: number) => string {
    const angleRange: [number, number] = this.angleRange()
    let old: any
    let s0: number
    let e0: number

    // Segments transition to and from the start/left of the gauge.
    if (!d.data.unfilled) {
      old =
        filter((datapoint: ComputedDatum): boolean => {
          return !datapoint.data.unfilled
        })(this.previousComputed.data) || []

      if (old[i]) {
        s0 = old[i].startAngle
        e0 = old[i].endAngle
      } else if (!old[i] && old[i - 1]) {
        s0 = old[i - 1].endAngle
        e0 = old[i - 1].endAngle
      } else if (!old[i - 1] && old.length > 0) {
        s0 = old[old.length - 1].endAngle
        e0 = old[old.length - 1].endAngle
      } else {
        s0 = angleRange[0]
        e0 = angleRange[0]
      }
      // The unfilled part of the gauge transitions to and from the end/right of the gauge.
    } else {
      old = find((datapoint: ComputedDatum): boolean => {
        return datapoint.data.unfilled
      })(this.previousComputed.data)
      if (old) {
        s0 = old.startAngle
        e0 = old.endAngle
      } else if (!this.previousComputed.data) {
        s0 = angleRange[0]
        e0 = angleRange[1]
      } else {
        s0 = angleRange[1]
        e0 = angleRange[1]
      }
    }

    const innerRadius: number = this.previousComputed.rInner || this.computed.rInner
    const outerRadius: number = this.previousComputed.r || this.computed.r
    const f = interpolateObject(
      { innerRadius, outerRadius, endAngle: e0, startAngle: s0 },
      {
        innerRadius: this.computed.rInner,
        outerRadius: this.computed.r,
        endAngle: d.endAngle,
        startAngle: d.startAngle,
      }
    )
    return (t: number): string => this.computed.arc(f(t))
  }

  private lineTween(comparison: Object<any>): (t: number) => string {
    // Need to rotate range by 90 degrees, since in d3 pie layout, '0' is vertical above origin.
    // Here, we need '0' to be horizontal to left of origin.
    const range: number[] = map((value: number): number => value + Math.PI / 2)(this.angleRange())
    const angle = (d: Object<number>): number =>
      d3ScaleLinear()
        .range(range)
        .domain([0, this.target])(d.value)
    const xOuter = (d: Object<number>): number => -d.r * Math.cos(angle(d))
    const yOuter = (d: Object<number>): number => -d.r * Math.sin(angle(d))
    const xInner = (d: Object<number>): number => -d.inner * Math.cos(angle(d))
    const yInner = (d: Object<number>): number => -d.inner * Math.sin(angle(d))
    const path = (d: Object<number>): string =>
      `M${[xInner(d), yInner(d)].join(",")}L${[xOuter(d), yOuter(d)].join(",")}`
    const oldValue: number = this.previousComputed.comparison ? this.value(this.previousComputed.comparison) : 0
    const f = interpolateObject(
      {
        inner: this.previousComputed.rInner || this.computed.rInner,
        r: this.previousComputed.r || this.computed.r,
        value: oldValue,
      },
      { inner: this.computed.rInner, r: this.computed.r, value: this.value(comparison) }
    )
    return (t: number): string => path(f(t))
  }

  private centerDisplayString(): string {
    return `${this.total} / ${this.target}`
  }

  private updateComparison(): void {
    const comparison: D3Selection = this.el
      .selectAll(`g.${styles.comparison}`)
      .data(this.comparison ? [this.comparison] : [])

    comparison.exit().remove()

    const enter: D3Selection = comparison
      .enter()
      .append("svg:g")
      .attr("class", styles.comparison)

    enter.append("svg:path")

    enter
      .merge(comparison)
      .transition()
      .duration(this.state.current.get("config").duration)
      .select("path")
      .attrTween("d", this.lineTween.bind(this))
  }

  // Data computation / preparation
  private compute(): void {
    this.previousComputed = this.computed
    this.total = Utils.computeTotal(this.data, this.value)

    this.fillGaugeExtent()

    if (!this.target) {
      throw new Error("No target value provided for gauge")
    }

    const d: ComputedInitial = {
      layout: Utils.layout(this.angleValue.bind(this), this.angleRange()),
      total: this.total,
      target: this.target,
    }

    // data should not become part of this.previousComputed in first computation
    this.previousComputed = defaults(d)(this.previousComputed)

    Utils.calculatePercentages(this.data, this.angleValue.bind(this), d.target)

    this.computed = {
      ...d,
      ...this.computeArcs(d),
      data: d.layout(this.data),
      comparison: this.comparison,
    }
  }

  private angleValue(d: Datum): number {
    return this.value(d) || d.value
  }

  // Ensure sum of rendered values is equal to gauge target value.
  private fillGaugeExtent(): void {
    const runningTotal: number[] = this.runningTotal()

    // If target has been exceeded, reduce last value(s)
    if (this.total >= this.target) {
      const index: number = findIndex((value: number): boolean => value >= this.target)(runningTotal)
      forEach((datapoint: Datum, i: number): void => {
        if (i === index) {
          datapoint.value = i > 0 ? this.target - runningTotal[i - 1] : this.target
        } else if (i > index) {
          datapoint.value = 0
        }
      })(this.data)
      // If target has not been reached, add an "unfilled" segment which will have no color,
      // and will not be hoverable.
    } else {
      this.data.push({
        unfilled: true,
        value: this.target - this.total,
      })
    }
  }

  private runningTotal(): number[] {
    return reduce((memo: number[], datapoint: Datum): number[] => {
      const previous: number = last(memo) || 0
      memo.push(previous + datapoint.value)
      return memo
    }, [])(this.data)
  }

  private computeArcs(computed: ComputedInitial): ComputedArcs {
    const drawingDims: { width: number; height: number } = this.state.current.get("computed").canvas
      .drawingContainerDims
    const outerBorderMargin: number = this.state.current.get("config").outerBorderMargin
    const r: number = this.computeOuterRadius(drawingDims, outerBorderMargin)
    const rInner: number = this.computeInnerRadius(r)
    const rHover: number = r + 1
    const rInnerHover: number = Math.max(rInner - 1, 0)

    return {
      r,
      rInner,
      rHover,
      rInnerHover,
      arc: d3Arc(),
      arcOver: d3Arc()
        .innerRadius(rInnerHover)
        .outerRadius(rHover),
    }
  }

  private computeOuterRadius(drawingDims: { width: number; height: number }, margin: number): number {
    return this.extent === "full"
      ? Math.min(drawingDims.width, drawingDims.height) / 2 - margin
      : Math.min(drawingDims.width / 2, drawingDims.height) - margin
  }

  private computeInnerRadius(outerRadius: any): number {
    const config: PieChartConfig = this.state.current.get("config")
    const width: number = outerRadius - config.minInnerRadius
    // If there isn't enough space, don't render inner circle
    return width < config.minWidth ? 0 : outerRadius - Math.min(width, config.maxWidth)
  }

  // Event listeners / handlers
  private onMouseOver(d: ComputedDatum): void {
    if (d.data.unfilled) {
      this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)
      return
    }
    const datumInfo: DatumInfo = {
      key: this.key(d),
      value: this.value(d),
      percentage: d.data.percentage,
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

    Utils.updateFilteredPathAttributes(arcs, filterFocused, this.computed.arcOver)
    Utils.updateFilteredPathAttributes(
      arcs,
      filterUnFocused,
      this.computed.arc.innerRadius(this.computed.rInner).outerRadius(this.computed.r)
    )
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
    const data: LegendDatum[] = map((datum: ComputedDatum): LegendDatum => {
      return {
        label: this.key(datum),
        color: this.color(datum),
      }
    })(this.data)
    if (this.comparison) {
      data.push({
        label: this.key(this.comparison),
        comparison: true,
      })
    }
    return data
  }

  // Remove & clean up
  remove(): void {
    if (this.drawn) {
      this.el.remove()
      this.drawn = false
    }
  }
}

export default Gauge
