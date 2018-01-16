import Events from "../utils/event_catalog"
import { IConfig, IEvents, IObject, IState, TD3Selection, TDatum, IAccessors } from "./typings"
import { defaults, find, filter, forEach, isEmpty, isFunction, keys, map, merge, reduce, values } from "lodash/fp"
import * as d3 from "d3-selection"
import "d3-transition"
import { pie as d3Pie, arc as d3Arc } from "d3-shape"
import { interpolateObject } from "d3-interpolate"
import { scaleLinear as d3ScaleLinear } from "d3-scale"
import * as styles from "./styles"

// y is a step-function (with two x values resulting in the same y value)
// on the positive integer domain which is monotonic decreasing
function approxZero(y: (x: number) => number, initialX: number): number {
  // make sure to get points with different y value
  const p0: { x: number; y: number } = { x: initialX, y: y(initialX) }
  const p1: { x: number; y: number } = { x: initialX + 2, y: y(initialX + 2) }

  // Solve for 0
  const m: number = (p0.y - p1.y) / (p0.x - p1.x)
  const xZero: number = -p0.y / m + p0.x

  // Find nearest integer value for x that has y > 0
  let xInt: number = Math.round(xZero)
  let i: number
  for (i = 0; i <= 10; i = i + 1) {
    if (y(xInt) <= 0) {
      xInt = xInt - 1
    }
  }

  return xInt
}

// Accessors of series in prepared data
function dataKey(d: TDatum): string {
  return d.data.key
}
function dataLabelValue(d: TDatum): string {
  return d.data.percentage ? d.data.percentage.toFixed(1) + "%" : undefined
}

class Renderer {
  children: (d: TDatum) => TDatum[]
  color: (d: TDatum) => string
  computed: IObject = {}
  currentTranslation: [number, number]
  data: IObject[]
  drawn: boolean = false
  el: TD3Selection
  events: IEvents
  name: (d: TDatum) => string
  previous: IObject
  state: IState
  total: number
  value: (d: TDatum) => number

  constructor(state: IState, events: IEvents, el: TD3Selection) {
    this.state = state
    this.events = events
    this.el = el
    this.assignAccessors()
    // this.events.on(Events.FOCUS.ELEMENT.HIGHLIGHT, this.highlightElement.bind(this))
    // this.events.on(Events.FOCUS.ELEMENT.MOUSEOVER, this.updateElementHover.bind(this))
    // this.events.on(Events.FOCUS.ELEMENT.MOUSEOUT, this.updateElementHover.bind(this))
    // this.events.on(Events.CHART.MOUSEOUT, this.updateElementHover.bind(this))
  }

  assignAccessors(): void {
    const accessors: IAccessors = this.state.current.get("accessors").series
    forEach.convert({ cap: false })((accessor: (d: TDatum) => any, key: string): void => {
      ;(this as any)[key] = accessor
    })(accessors)
  }

  // computeTotal(): void {
  //   this.total = reduce((memo: number, datum: TDatum): number => {
  //     const value: number = this.value(datum)
  //     return memo + (value || 0)
  //   }, 0)(this.data)
  // }

  hasData(): boolean {
    return this.data.length > 0
  }

  draw(): void {
    this.data = this.state.current.get("computed").series.data
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

    // Arcs
    const arcs: TD3Selection = this.el
      .select("g.arcs")
      .attr("transform", this.translateString(this.computeTranslate()))
      .selectAll("g")
      .data(this.data, (d: any) => this.name(d.data))

    this.exit(arcs)
    this.enterAndUpdate(arcs)
  }

  exit(arcs: TD3Selection): void {
    const duration: number = this.state.current.get("config").duration

    const exitingArcs: TD3Selection = arcs.exit()

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

  enterAndUpdate(arcs: TD3Selection): void {
    const duration: number = this.state.current.get("config").duration
    let n: number = 0

    const enteringArcs: TD3Selection = arcs
      .enter()
      .append("svg:g")
      .attr("class", styles.arc)
      .on("mouseenter", this.onMouseOver.bind(this))

    enteringArcs.append("svg:path").style("fill", (d: IObject) => this.color(d.data))

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
      .each(() => (n = n + 1))
      .on("end", (): void => {
        n = n - 1
        if (n < 1) {
          this.onTransitionEnd()
        }
      })

    arcs
      .merge(enteringArcs)
      .select(`text.${styles.label}`)
      .transition()
      .duration(duration)
      // .attr("transform", this.labelTranslate.bind(this))
      .text(dataLabelValue)

    this.updateTotal()
  }

  onTransitionEnd(): void {
    return
  }

  centerDisplayString(): string[] {
    return this.computed.inner > 0 ? [this.computed.total.toString()] : []
  }

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

    const mergedTotal: TD3Selection = total
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
        mergedTotal.attr("dy", "0.35em")
      }
    }
  }

  // updateElementHover(datapoint: IObject): void {
  //   if (!this.drawn) {
  //     return
  //   }

  //   const arcs: any = this.el.select("g.arcs").selectAll("g")

  //   const filterFocused: any = (d: TDatum): boolean =>
  //       datapoint.d && datapoint.d.data && dataKey(d) === dataKey(datapoint.d),
  //     filterUnFocused: any = (d: TDatum): boolean =>
  //       datapoint.d && datapoint.d.data ? dataKey(d) !== dataKey(datapoint.d) : true

  //   arcs
  //     .filter(filterFocused)
  //     .select("path")
  //     .attr("d", this.computed.arcOver)
  //     .attr("filter", `url(#${this.state.current.get("computed").canvas.shadowDefinitionId})`)

  //   arcs
  //     .filter(filterUnFocused)
  //     .select("path")
  //     .attr("d", this.computed.arc)
  //     .attr("filter", null)
  // }

  onMouseOver(d: TDatum): void {
    const centroid: [number, number] = this.translateBack(this.computed.arc.centroid(d))
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOVER, { d, focusPoint: { centroid } })
  }

  // highlightElement(key: string): void {
  //   const d: TDatum = find((datum: TDatum): boolean => dataKey(datum) === key)(this.computed.data)
  //   this.onMouseOver(d)
  // }

  // // Compute
  compute(): void {
    this.previous = this.computed
    this.computed = this.data
    this.computed.arc = d3Arc()
    //   let d: IObject = {}

    //   // We cannot draw a pie chart with no series or only series that have the value 0
    //   if (!this.hasData()) {
    //     return
    //   }

    //   this.computed.data = []
    //   const computeByLevel = (parent: IObject): void => {
    //     const children: IObject[] = this.children(parent)
    //     const layout: any = d3Pie()
    //       .sort(null)
    //       .value((d: any): number => d.value)
    //       .startAngle(parent.startAngle || 0)
    //       .endAngle(parent.endAngle || 2 * Math.PI)

    //     // parent.children = merge(layout(children))(parent.children)

    //     forEach((child: IObject): void => {
    //       console.log(layout(children))
    //       debugger
    //       let d: IObject = {}
    //       d.total = parent.value
    //       child.computed = d
    //       child.previous = defaults(child.computed)(child.previous)
    //       child.computed.percentage = child.value / d.total * 100
    //       this.computeArcs(child)

    //       computeByLevel(child)
    //     })(children)
    //     this.computed.data = this.computed.data.concat(children)
    //   }

    //   computeByLevel(this.data.data)
    //   console.log(this.computed.data)
  }

  calculatePercentages(data: IObject, total: number): void {
    forEach((datum: IObject): void => {
      datum.percentage = datum.value / total * 100
    })(this.children(data))
  }

  computeArcs(data: IObject): void {
    const computed: IObject = data.computed
    const drawingDims: IObject = this.state.current.get("computed").canvas.drawingContainerDims
    this.computeRadialExtent(data)
    data.computed.rHover = this.hoverOuter(data.computed.r)
    data.computed.innerHover = Math.max(data.computed.inner - 1, 0)
    data.computed.arc = d3Arc()
      .innerRadius(data.computed.inner)
      .outerRadius(data.computed.r)
    data.computed.arcOver = d3Arc()
      .innerRadius(data.computed.innerHover)
      .outerRadius(data.computed.rHover)
  }

  computeRadialExtent(data: IObject): void {
    const config: IConfig = this.state.current.get("config")
    const outer: number = Math.min(config.width, config.height) / 2 - this.state.current.get("config").outerBorderMargin
    const width: number = outer - config.minInnerRadius
    const inner: number = width < config.minWidth ? 0 : outer - Math.min(width, config.maxWidth)
    const ringWidth: number = (outer - inner) / this.state.current.get("computed").series.maxLevel
    data.computed.inner = inner + ringWidth * (data.level - 1)
    data.computed.r = data.computed.inner + ringWidth
  }

  hoverOuter(radius: number): number {
    return radius + 1
  }

  computeTranslate(): [number, number] {
    const config: IObject = this.state.current.get("config")
    this.currentTranslation = [config.width / 2, config.height / 2]
    return this.currentTranslation
  }

  // Translate back to 0,0 in top left
  translateBack(point: [number, number]): [number, number] {
    const currentTranslation: [number, number] = this.currentTranslation
    return [point[0] + currentTranslation[0], point[1] + currentTranslation[1]]
  }

  arcTween(d: TDatum): (t: number) => string {
    const previousData: IObject[] = this.previous.data || [],
      old: TDatum = find((datum: IObject): boolean => datum.index === d.index)(previousData),
      previous: TDatum = find((datum: IObject): boolean => datum.index === d.index - 1)(previousData),
      last: TDatum = previousData[previousData.length - 1]

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

    const startAngle: number = Math.max(0, Math.min(2 * Math.PI, d.x0))
    const endAngle: number = Math.max(0, Math.min(2 * Math.PI, d.x1))
    const innerRadius: number = Math.max(0, d.y0)
    const outerRadius: number = Math.max(0, d.y1)
    const f = interpolateObject(
      { endAngle: e0, startAngle: s0, innerRadius: 0, outerRadius: 0 },
      { endAngle, startAngle, innerRadius, outerRadius }
    )
    return (t: number): string => this.computed.arc(f(t))
  }

  // angleScale(value: number): number {
  //   return d3ScaleLinear()
  //     .range([0, 2 * Math.PI])(value)
  // }

  // // @TODO replace 100 with computed radius
  // radiusScale(value: number): number {
  //   return d3ScaleLinear()
  //     .range([0, 1])(value)
  // }

  removeArcTween(d: TDatum, i: number): (t: number) => string {
    let s0: number
    let e0: number
    s0 = e0 = 2 * Math.PI
    const f = interpolateObject({ endAngle: d.endAngle, startAngle: d.startAngle }, { endAngle: e0, startAngle: s0 })
    return (t: number): string => this.computed.arc(f(t))
  }

  labelTranslate(d: TDatum): string {
    debugger
    return this.translateString(this.computed.arc.centroid(d))
  }

  translateString(values: [number, number]): string {
    return `translate(${values.join(", ")})`
  }

  // dataForLegend(): IObject[] {
  //   return map((datum: IObject): IObject => {
  //     return {
  //       label: this.key(datum),
  //       color: this.color(datum)
  //     }
  //   })(this.data)
  // }

  // // Remove & clean up
  // remove(): void {
  //   if (this.drawn) {
  //     this.el.remove()
  //     this.drawn = false
  //   }
  // }
}

export default Renderer
