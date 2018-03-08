import Events from "../../utils/event_catalog"
import { defaults, find, filter, forEach, isFunction, keys, map, reduce, values } from "lodash/fp"
import * as d3 from "d3-selection"
import "d3-transition"
import { pie as d3Pie, arc as d3Arc } from "d3-shape"
import { interpolateObject } from "d3-interpolate"
import { onTransitionEnd } from "../../utils/d3_utils"
import * as styles from "./styles"
import { colorAssigner } from "@operational/utils"
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
  RendererAccessors,
  State
} from "../typings"

// y is a step-function (with two x values resulting in the same y value)
// on the positive integer domain which is monotonic decreasing
const approxZero = (y: (x: number) => number, initialX: number): number => {
  // make sure to get points with different y value
  const p0: { x: number; y: number } = { x: initialX, y: y(initialX) }
  const p1: { x: number; y: number } = { x: initialX + 2, y: y(initialX + 2) }

  // Solve for 0
  const m: number = (p0.y - p1.y) / (p0.x - p1.x)
  const xZero: number = -p0.y / m + p0.x

  // Find nearest integer value for x that has y > 0
  let xInt: number = Math.round(xZero)
  for (let i: number = 0; i <= 10; i = i + 1) {
    if (y(xInt) <= 0) {
      xInt = xInt - 1
    }
  }

  return xInt
}

const percentageString = (d: ComputedDatum): string => {
  return d.data.percentage ? d.data.percentage.toFixed(1) + "%" : ""
}

abstract class AbstractRenderer {
  color: (d: Datum | ComputedDatum) => string
  computed: ComputedData
  currentTranslation: [number, number]
  data: Datum[]
  drawn: boolean = false
  el: D3Selection
  events: EventBus
  key: (d: Datum | ComputedDatum) => string
  previous: Partial<ComputedData>
  state: State
  total: number
  type: string
  value: (d: Datum | ComputedDatum) => number

  constructor(state: State, events: EventBus, el: D3Selection, options: Object<any>) {
    this.state = state
    this.events = events
    this.el = el.select("g.drawing")
    this.assignOptions(options)
    this.assignAccessors(options.accessors)
    this.events.on(Events.FOCUS.ELEMENT.HIGHLIGHT, this.highlightElement.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOVER, this.updateElementHover.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.MOUSEOUT, this.updateElementHover.bind(this))
    this.events.on(Events.CHART.MOUSEOUT, this.updateElementHover.bind(this))
  }

  assignOptions(options: Object<any>): void {
    forEach.convert({ cap: false })((option: any, key: string): void => {
      if (key === "accessors") {
        return
      }
      ;(this as any)[key] = option
    })(options)
  }

  assignAccessors(customAccessors: Partial<RendererAccessors>): void {
    const accessors: RendererAccessors = defaults(this.defaultAccessors())(customAccessors)
    forEach.convert({ cap: false })((option: any, key: string): void => {
      ;(this as any)[key] = (d: any): any => (d.data ? option(d.data) : option(d))
    })(accessors)
  }

  defaultAccessors(): RendererAccessors {
    const assignColor: (key: string) => string = colorAssigner(this.state.current.get("config").palette)
    return {
      key: (d: Datum): string => d.key,
      value: (d: Datum): number => d.value,
      color: (d: Datum): string => assignColor(this.key(d))
    }
  }

  setData(data: Datum[]): void {
    this.data = data
  }

  computeTotal(): void {
    this.total = reduce((memo: number, datum: Datum): number => {
      const value: number = this.value(datum)
      return memo + (value || 0)
    }, 0)(this.data)
  }

  hasData(): boolean {
    return this.data.length > 0
  }

  draw(): void {
    this.compute()
    this.drawn ? this.updateDraw() : this.initialDraw()
  }

  initialDraw(): void {
    // groups
    this.el.append("svg:g").attr("class", "arcs")
    this.el.append("svg:g").attr("class", styles.total)

    if (this.hasData()) {
      this.updateDraw()
    }

    this.drawn = true
  }

  updateDraw(): void {
    // Remove focus before updating chart
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)

    // Center coordinate system
    this.el.attr("transform", this.translateString(this.computeTranslate()))

    // Arcs
    const arcs: D3Selection = this.el
      .select("g.arcs")
      .selectAll(`g.${styles.arc}`)
      .data(this.computed.data, this.key)

    this.exit(arcs)
    this.enterAndUpdate(arcs)
  }

  exit(arcs: D3Selection): void {
    const duration: number = this.state.current.get("config").duration

    const exitingArcs: D3Selection = arcs.exit()

    exitingArcs
      .select("path")
      .transition()
      .duration(duration)
      .attrTween("d", this.removeArcTween.bind(this))

    exitingArcs
      .select(`text.${styles.label}`)
      .transition()
      .duration(duration)
      .style("opacity", "1e6")

    exitingArcs.remove()
  }

  enterAndUpdate(arcs: D3Selection): void {
    const duration: number = this.state.current.get("config").duration

    const enteringArcs: D3Selection = arcs
      .enter()
      .append("svg:g")
      .attr("class", styles.arc)
      .on("mouseenter", this.onMouseOver.bind(this))

    enteringArcs.append("svg:path").style("fill", this.color)

    enteringArcs
      .append("svg:text")
      .attr("class", styles.label)
      .attr("dy", 5)
      .style("text-anchor", "middle")

    arcs
      .merge(enteringArcs)
      .select("path")
      .transition()
      .duration(duration)
      .attrTween("d", this.arcTween.bind(this))
      .call(onTransitionEnd, this.onTransitionEnd.bind(this))

    arcs
      .merge(enteringArcs)
      .select(`text.${styles.label}`)
      .transition()
      .duration(duration)
      .attr("transform", this.labelTranslate.bind(this))
      .text(percentageString)

    this.updateTotal()
  }

  onTransitionEnd(): void {
    return
  }

  abstract centerDisplayString(): string[]

  updateTotal(): void {
    const duration: number = this.state.current.get("config").duration

    let total: any = this.el
      .select(`g.${styles.total}`)
      .selectAll("text")
      .data(this.centerDisplayString())

    total
      .exit()
      .style("font-size", "1px")
      .remove()

    const mergedTotal: D3Selection = total
      .enter()
      .append("svg:text")
      .attr("text-anchor", "middle")
      .merge(total)
      .text((d: string): string => d)

    const node: any = mergedTotal.node()
    if (node) {
      const y = (x: number): number => {
        mergedTotal.style("font-size", x + "px")
        // Text should fill half of available width (0.5 * diameter = radius)
        return this.computed.inner - node.getBBox().width
      }

      // start with min font size
      if (y(this.state.current.get("config").minTotalFontSize) < 0) {
        // Not enough room - do not show total
        total = total.data([])
      } else {
        // change font size until bounding box is completely filled
        approxZero(y, this.state.current.get("config").minTotalFontSize)
        mergedTotal.attr("dy", this.totalYOffset())
      }
    }
  }

  abstract totalYOffset(): string

  updateElementHover(datapoint: HoverPayload): void {
    if (!this.drawn) {
      return
    }

    const arcs: any = this.el.select("g.arcs").selectAll("g")

    const filterFocused: any = (d: Datum): boolean => datapoint.d && this.key(d) === datapoint.d.key
    const filterUnFocused: any = (d: Datum): boolean => (datapoint.d ? this.key(d) !== datapoint.d.key : true)

    arcs
      .filter(filterFocused)
      .select("path")
      .attr("d", this.computed.arcOver)
      .attr("filter", `url(#${this.state.current.get("computed").canvas.shadowDefinitionId})`)

    arcs
      .filter(filterUnFocused)
      .select("path")
      .attr("d", this.computed.arc)
      .attr("filter", null)
  }

  onMouseOver(d: ComputedDatum): void {
    const datumInfo: DatumInfo = {
      key: this.key(d),
      value: this.value(d),
      percentage: d.data.percentage
    }
    const centroid: [number, number] = this.translateBack(this.computed.arc.centroid(d))
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOVER, { d: datumInfo, focusPoint: { centroid } })
  }

  highlightElement(key: string): void {
    const d: ComputedDatum = find((datum: ComputedDatum): boolean => this.key(datum) === key)(this.computed.data)
    this.onMouseOver(d)
  }

  abstract angleRange(): [number, number]

  abstract totalForPercentages(): number

  checkData(): void {
    return
  }

  angleValue(d: Datum): number {
    return this.value(d)
  }

  // Compute
  compute(): void {
    this.previous = this.computed

    // We cannot draw a pie chart with no series or only series that have the value 0
    if (!this.hasData()) {
      this.computed.data = []
      return
    }

    this.checkData()

    let startAngle: number
    let endAngle: number
    ;[startAngle, endAngle] = this.angleRange()

    const d: ComputedInitial = {
      layout: d3Pie()
        .sort(null)
        .value(this.angleValue.bind(this))
        .startAngle(startAngle)
        .endAngle(endAngle),
      total: this.totalForPercentages()
    }

    // data should not become part of this.previous in first computation
    this.previous = defaults(d)(this.previous)

    this.calculatePercentages(d.total)

    this.computed = {
      ...d,
      ...this.computeArcs(d),
      data: d.layout(this.data)
    }
  }

  calculatePercentages(total: number): void {
    forEach((datum: Datum): void => {
      datum.percentage = this.value(datum) / total * 100
    })(this.data)
  }

  computeArcs(computed: ComputedInitial, scale?: number): ComputedArcs {
    const drawingDims: Object<number> = this.state.current.get("computed").canvas.drawingContainerDims,
      r: number = this.computeOuter(drawingDims.width, drawingDims.height, scale),
      inner: number = this.computeInner(r),
      rHover: number = this.hoverOuter(r),
      innerHover: number = Math.max(inner - 1, 0)
    return {
      r,
      inner,
      rHover,
      innerHover,
      arc: d3Arc()
        .innerRadius(inner)
        .outerRadius(r),
      arcOver: d3Arc()
        .innerRadius(innerHover)
        .outerRadius(rHover)
    }
  }

  // Calculation of outer radius
  computeOuter(width: number, height: number, scaleFactor?: number): number {
    return Math.min(width, height) / 2 - this.state.current.get("config").outerBorderMargin
  }

  // Calculation of inner radius
  computeInner(outerRadius: any): number {
    const config: PieChartConfig = this.state.current.get("config"),
      width: number = outerRadius - config.minInnerRadius

    // If there isn't enough space, don't render inner circle
    return width < config.minWidth ? 0 : outerRadius - Math.min(width, config.maxWidth)
  }

  hoverOuter(radius: number): number {
    return radius + 1
  }

  abstract computeTranslate(): [number, number]

  // Translate back to 0,0 in top left
  translateBack(point: [number, number]): [number, number] {
    const currentTranslation: [number, number] = this.currentTranslation
    return [point[0] + currentTranslation[0], point[1] + currentTranslation[1]]
  }

  abstract arcTween(d: ComputedDatum, i: number): (t: number) => string

  removeArcTween(d: ComputedDatum, i: number): (t: number) => string {
    let s0: number
    let e0: number
    s0 = e0 = this.angleRange()[1]
    const f = interpolateObject({ endAngle: d.endAngle, startAngle: d.startAngle }, { endAngle: e0, startAngle: s0 })
    return (t: number): string => this.computed.arc(f(t))
  }

  labelTranslate(d: Datum): string {
    return this.translateString(this.computed.arc.centroid(d))
  }

  translateString(values: [number, number]): string {
    return `translate(${values.join(", ")})`
  }

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

export default AbstractRenderer
