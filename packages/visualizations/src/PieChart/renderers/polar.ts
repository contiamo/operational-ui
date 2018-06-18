import Events from "../../shared/event_catalog"
import { defaults, extend, find, map, max, min } from "lodash/fp"
import * as d3 from "d3-selection"
import "d3-transition"
import { arc as d3Arc } from "d3-shape"
import { scaleSqrt as d3ScaleSqrt } from "d3-scale"
import { interpolateObject } from "d3-interpolate"
import { setPathAttributes, setTextAttributes } from "../../utils/d3_utils"
import * as styles from "./styles"
import * as Utils from "./renderer_utils"

import {
  ComputedArcs,
  ComputedData,
  ComputedDatum,
  D3Selection,
  Datum,
  Dimensions,
  EventBus,
  HoverPayload,
  LegendDatum,
  Renderer,
  RendererAccessor,
  State,
} from "../typings"

const ANGLE_RANGE: [number, number] = [0, 2 * Math.PI]
const MIN_SEGMENT_WIDTH = 5
const TOTAL_Y_OFFSET = "0.35em"

class Polar implements Renderer {
  private color: RendererAccessor<string>
  private computed: ComputedData
  private currentTranslation: [number, number]
  private data: Datum[]
  private drawn: boolean = false
  private el: D3Selection
  private events: EventBus
  private minSegmentWidth: number
  private previousComputed: Partial<ComputedData>
  key: RendererAccessor<string>
  state: State
  type: "donut" | "polar" | "gauge" = "polar"
  value: RendererAccessor<number>

  constructor(state: State, events: EventBus, el: D3Selection, options: { [key: string]: any }) {
    this.state = state
    this.events = events
    this.el = el
    this.updateOptions(options)
    this.events.on(Events.FOCUS.ELEMENT.HIGHLIGHT, this.highlightElement.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.HOVER, this.updateElementHover.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.OUT, this.updateElementHover.bind(this))
    this.events.on(Events.CHART.OUT, this.updateElementHover.bind(this))
  }

  // Initialization and updating config or accessors
  updateOptions(options: { [key: string]: any }): void {
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
    const config = this.state.current.get("config")
    const duration = config.duration
    const maxTotalFontSize = config.maxTotalFontSize
    const minTotalFontSize = config.minTotalFontSize
    const drawingDims = this.state.current.get("computed").canvas.drawingContainerDims

    // Remove focus before updating chart
    this.events.emit(Events.FOCUS.ELEMENT.OUT)

    // Center coordinate system
    this.currentTranslation = Utils.computeTranslate(drawingDims)
    this.el.attr("transform", Utils.translateString(this.currentTranslation))

    // Arcs
    const arcs = Utils.createArcGroups(this.el, this.computed.data, this.key)
    // Exit
    Utils.exitArcs(arcs, duration, this.removeArcTween.bind(this))
    // Enter
    Utils.enterArcs(arcs, this.onMouseOver.bind(this), this.onMouseOut.bind(this))
    // Update
    const updatingArcs = arcs.merge(arcs.enter().selectAll(`g.${styles.arc}`))
    setPathAttributes(updatingArcs.select("path"), this.arcAttributes(), duration, this.fitToCanvas.bind(this))

    updatingArcs.select("rect").attr("visibility", "hidden")
    setTextAttributes(updatingArcs.select("text"), Utils.textAttributes(this.computed), duration, () =>
      Utils.updateBackgroundRects(
        updatingArcs,
        this.computed.arcOver.centroid,
        config.displayPercentages ? "visible" : "hidden",
      ),
    )

    // Total / center text
    const options = { maxTotalFontSize, minTotalFontSize, innerRadius: this.computed.rInner, yOffset: TOTAL_Y_OFFSET }
    Utils.updateTotal(this.el, this.centerDisplayString(), duration, options)
  }

  private arcAttributes() {
    return {
      path: this.arcTween.bind(this),
      fill: this.color.bind(this),
      isTween: true,
    }
  }

  private fitToCanvas(): void {
    // Reset current translation
    this.currentTranslation = [0, 0]
    this.el.attr("transform", Utils.translateString(this.currentTranslation))

    const current = (this.el.node() as any).getBoundingClientRect()
    const drawing = this.state.current.get("computed").canvas.drawingContainerRect
    if (current.width === 0 && current.height === 0) {
      return
    }
    const margin = this.state.current.get("config").outerBorderMargin

    const scale: number = Math.min(
      (drawing.width - 2 * margin) / current.width,
      (drawing.height - 2 * margin) / current.height,
    )

    this.computeArcs(this.computed)
    this.el.selectAll("path").attr("d", this.computed.arc)

    const newCurrent = (this.el.node() as any).getBoundingClientRect()
    const topOffset = this.state.current.get("computed").canvas.legend.node().offsetHeight

    this.currentTranslation = [
      (drawing.width - newCurrent.width) / 2 + drawing.left - newCurrent.left,
      (drawing.height - newCurrent.height) / 2 + drawing.top - newCurrent.top,
    ]
    this.el.attr("transform", Utils.translateString(this.currentTranslation))
  }

  // Interpolate the arcs in data space.
  private arcTween(d: ComputedDatum, i: number): (t: number) => string {
    const old = this.previousComputed.data || []
    let s0: number
    let e0: number
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
      s0 = 0
      e0 = 0
    }

    const f = interpolateObject({ endAngle: e0, startAngle: s0 }, { endAngle: d.endAngle, startAngle: d.startAngle })
    return (t: number): string => this.computed.arc(extend(f(t))(d))
  }

  private removeArcTween(d: ComputedDatum, i: number): (t: number) => string {
    let s0: number
    let e0: number
    s0 = e0 = ANGLE_RANGE[1]
    // Value is needed to interpolate the radius as well as the angles.
    const f = interpolateObject(
      { endAngle: d.endAngle, startAngle: d.startAngle, value: d.value },
      { endAngle: e0, startAngle: s0, value: d.value },
    )
    return (t: number): string => this.computed.arc(f(t))
  }

  private centerDisplayString(): string {
    return this.computed.rInner > 0 ? this.computed.total.toString() : ""
  }

  // Data computation / preparation
  private compute(): void {
    this.previousComputed = this.computed

    const d = {
      layout: Utils.layout(this.angleValue, ANGLE_RANGE),
      total: Utils.computeTotal(this.data, this.value),
    }

    // data should not become part of this.previousComputed in first computation
    this.previousComputed = defaults(d)(this.previousComputed)

    Utils.calculatePercentages(this.data, this.angleValue, d.total)

    const data = d.layout(this.data)
    this.computed = {
      ...d,
      ...this.computeArcs({ data, ...d }),
      data,
    }
  }

  private angleValue(): number {
    return 1
  }

  private computeArcs(computed: Partial<ComputedData>): ComputedArcs {
    const drawingDims = this.state.current.get("computed").canvas.drawingContainerDims
    const r = this.computeOuterRadius(drawingDims)
    const rInner = this.computeInnerRadius(computed.data, r)
    const rHover = this.hoverOuterRadius(r)
    const rInnerHover = Math.max(rInner - 5, 0)

    return {
      r,
      rInner,
      rHover,
      rInnerHover,
      arc: d3Arc()
        .innerRadius(rInner)
        .outerRadius(r),
      arcOver: d3Arc()
        .innerRadius(rInnerHover)
        .outerRadius(rHover),
    }
  }

  private computeOuterRadius(drawingDims: Dimensions, scaleFactor: number = 1): any {
    const domainMax = max(map((datum: Datum) => this.value(datum))(this.data))
    const scale = d3ScaleSqrt()
      .range([
        this.state.current.get("config").minInnerRadius,
        Math.min(drawingDims.width, drawingDims.height) / 2 - this.state.current.get("config").outerBorderMargin,
      ])
      .domain([0, domainMax])
    return (d: Datum): number => scale(this.value(d)) * scaleFactor
  }

  private computeInnerRadius(data: ComputedDatum[], outerRadius: (d: Datum) => number): number {
    const options = this.state.current.get("config")
    const minWidth = this.minSegmentWidth || MIN_SEGMENT_WIDTH
    const maxWidth = options.maxWidth
    const minOuterRadius = min(map(outerRadius)(data))
    // Space is not enough, don't render
    const width = minOuterRadius - options.minInnerRadius
    return width < minWidth ? 0 : minOuterRadius - Math.min(width, maxWidth)
  }

  private hoverOuterRadius(radius: any): any {
    return (d: Datum): number => radius(d) + 5
  }

  // Event listeners / handlers
  private onMouseOver(d: ComputedDatum): void {
    const datumInfo = {
      key: this.key(d),
      value: this.value(d),
      percentage: d.data.percentage,
    }
    const centroid: [number, number] = Utils.translateBack(this.computed.arcOver.centroid(d), this.currentTranslation)
    this.events.emit(Events.FOCUS.ELEMENT.HOVER, { d: datumInfo, focusPoint: { centroid } })
  }

  private updateElementHover(datapoint: HoverPayload): void {
    if (!this.drawn) {
      return
    }

    const arcs = this.el.select("g.arcs").selectAll("g")
    const filterFocused = (d: Datum) => datapoint.d && this.key(d) === datapoint.d.key
    const filterUnFocused = (d: Datum) => (datapoint.d ? this.key(d) !== datapoint.d.key : true)

    Utils.updateFilteredPathAttributes(arcs, filterFocused, this.computed.arcOver)
    Utils.updateFilteredPathAttributes(
      arcs,
      filterUnFocused,
      this.computed.arc.innerRadius(this.computed.rInner).outerRadius(this.computed.r),
    )
  }

  private highlightElement(key: string): void {
    const d = find((datum: ComputedDatum) => this.key(datum) === key)(this.computed.data)
    if (!d) {
      return
    }
    this.onMouseOver(d)
  }

  private onMouseOut(): void {
    this.events.emit(Events.FOCUS.ELEMENT.OUT)
  }

  // External methods
  dataForLegend(): LegendDatum[] {
    return map(
      (datum: Datum): LegendDatum => {
        return {
          label: this.key(datum),
          color: this.color(datum),
        }
      },
    )(this.data)
  }

  // Remove & clean up
  remove(): void {
    if (this.drawn) {
      this.el.remove()
      this.drawn = false
    }
  }
}

export default Polar
