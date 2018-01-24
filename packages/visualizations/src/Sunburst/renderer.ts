import Events from "../utils/event_catalog"
import { IConfig, IEvents, IObject, IState, TD3Selection, TDatum, IAccessors, TStateWriter } from "./typings"
import { defaults, find, filter, forEach, isEmpty, isFunction, keys, map, merge, reduce, values } from "lodash/fp"
import * as d3 from "d3-selection"
import { interpolate as d3Interpolate } from "d3-interpolate"
import "d3-transition"
import { pie as d3Pie, arc as d3Arc } from "d3-shape"
import { interpolateObject } from "d3-interpolate"
import { scaleLinear as d3ScaleLinear } from "d3-scale"
import { hierarchy as d3Hierarchy, partition as d3Partition } from "d3-hierarchy"
import * as styles from "./styles"
import { withD3Element } from "../utils/d3_utils"

// // Accessors of series in prepared data
// function dataKey(d: TDatum): string {
//   return d.data.key
// }

class Renderer {
  angleScale: any
  arc: any
  children: (d: TDatum) => TDatum[]
  color: (d: TDatum) => string
  computed: IObject = {}
  currentTranslation: [number, number]
  data: any
  drawn: boolean = false
  el: TD3Selection
  events: IEvents
  mouseOverDatum: TDatum
  name: (d: TDatum) => string
  previous: IObject
  radiusScale: any
  radius: number
  state: IState
  stateWriter: TStateWriter
  topNode: TDatum
  total: number
  value: (d: TDatum) => number
  zoomNode: TDatum

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TD3Selection) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.assignAccessors()

    this.events.on(Events.FOCUS.ELEMENT.CLICK, this.onClick.bind(this))
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
      .selectAll(`path.${styles.arc}`)
      .data(this.data, (d: any) => this.name(d.data))

    const duration: number = this.state.current.get("config").duration
    this.exit(arcs, duration)
    this.enterAndUpdate(arcs, duration)
  }

  exit(arcs: TD3Selection, duration: number): void {
    arcs
      .exit()
      .select(`path.${styles.arc}`)
      .transition()
      .duration(duration)
      .attrTween("d", this.removeArcTween.bind(this))
      .remove()
  }

  enterAndUpdate(arcs: TD3Selection, duration: number): void {
    arcs
      .enter()
      .append("svg:path")
      .attr(
        "class",
        (d: TDatum): string => `${styles.arc} ${!d.parent ? "parent" : ""} ${d.zoomable ? "zoomable" : ""}`
      )
      .style("fill", (d: IObject) => this.color(d.data))
      .style("stroke", "#fff")
      .on("mouseenter", withD3Element(this.onMouseOver.bind(this)))
      .on("click", (d: IObject) => this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d, force: true }))
      .merge(arcs)
      .transition()
      .duration(duration)
      .attrTween("d", this.arcTween.bind(this))
  }

  onClick(payload: IObject): void {
    const zoomNode: TDatum = payload.d || this.topNode
    // Don't allow zooming on last child
    if (!zoomNode.children) {
      return
    }

    // If the center node is clicked, zoom out
    if (zoomNode === this.zoomNode && payload && payload.force) {
      this.zoomOut(payload)
      return
    }

    // Set new scale domains
    const angleDomain = d3Interpolate(this.angleScale.domain(), [zoomNode.x0, zoomNode.x1]),
      radiusDomain = d3Interpolate(this.radiusScale.domain(), [zoomNode.y0, 1])

    // Save new inner radius to facilitate sizing and positioning of center content
    const innerRadius: number = this.radiusScale.domain([zoomNode.y0, 1])(zoomNode.y1)
    this.stateWriter("innerRadius", innerRadius)

    // If no payload has been sent (resetting zoom) and the chart hasn't already been zoomed
    // (occurs when no zoom config is passed in from the outside)
    // no need to do anything.
    if (!this.zoomNode && !payload.d) {
      return
    }

    this.zoomNode = zoomNode
    this.stateWriter("zoomNode", this.zoomNode)

    this.el
      .selectAll("path")
      .attr("pointer-events", "none")
      .style("fill", (datum: TDatum): string => (datum === this.zoomNode ? "#fff" : this.color(datum.data)))
      .style("stroke", (datum: TDatum): string => (datum === this.zoomNode ? this.color(datum.data) : "#fff"))
      .classed("zoomed", (datum: TDatum): boolean => datum === this.zoomNode)
      .transition()
      .duration(this.state.current.get("config").duration)
      .each(
        withD3Element((datum: TDatum, el: Element): void => {
          d3.select(el).attr("pointer-events", null)
        })
      )
      .tween("scale", () => {
        return (t: number): void => {
          this.angleScale.domain(angleDomain(t))
          this.radiusScale.domain(radiusDomain(t))
        }
      })
      .attrTween("d", (datum: TDatum): any => {
        return () => this.arc(datum)
      })
  }

  zoomOut(payload: IObject): void {
    this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d: payload.d.parent })
  }

  onMouseOver(d: TDatum, el: Element): void {
    if (d === this.zoomNode) {
      return
    }
    const centroid: [number, number] = this.translateBack(this.arc.centroid(d))
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOVER, { d, focusPoint: { centroid } })
    this.mouseOverDatum = d
    this.highlightPath(d, el)
  }

  highlightPath(d: TDatum, el: Element) {
    const percentage: number = Number((100 * d.value / this.total).toPrecision(3))
    let percentageString: string = percentage + "%"
    if (percentage < 0.1) {
      percentageString = "< 0.1%"
    }

    this.el.select("span.percentage").text(percentageString)

    this.el.select("div.explanation").style("visibility", "")

    let sequenceArray = d.ancestors().reverse()
    sequenceArray.shift() // remove root node from the array

    // Fade all the segments (leave inner circle as is).
    this.el
      .selectAll(`path.${styles.arc}`)
      .filter((d: TDatum): boolean => d !== this.zoomNode)
      .style("opacity", 0.3)

    // Then highlight only those that are an ancestor of the current segment.
    this.el
      .selectAll(`path.${styles.arc}`)
      .filter((d: TDatum): boolean => sequenceArray.indexOf(d) >= 0 && d !== this.zoomNode)
      .style("opacity", 1)

    d3.select(el).on("mouseleave", this.onMouseLeave.bind(this)(d, el))
  }

  onMouseLeave(d: TDatum, el: Element): any {
    return () => {
      if (this.mouseOverDatum !== d) {
        return
      }
      this.mouseOverDatum = null

      // Remove focus label
      this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)

      this.el
        .selectAll(`path.${styles.arc}`)
        .filter((d: TDatum): boolean => d !== this.zoomNode)
        .style("opacity", 1)

      this.el.select("div.explanation").style("visibility", "hidden")
    }
  }

  // highlightElement(key: string): void {
  //   const d: TDatum = find((datum: TDatum): boolean => dataKey(datum) === key)(this.computed.data)
  //   this.onMouseOver(d)
  // }

  // // Compute
  compute(): void {
    const drawingDims: IConfig = this.state.current.get("computed").canvas.drawingDims
    this.radius =
      Math.min(drawingDims.width, drawingDims.height) / 2 - this.state.current.get("config").outerBorderMargin

    this.angleScale = d3ScaleLinear().range([0, 2 * Math.PI])
    this.radiusScale = d3ScaleLinear().range([0, this.radius])
    this.arc = d3Arc()
      .startAngle((d: TDatum) => Math.max(0, Math.min(2 * Math.PI, this.angleScale(d.x0))))
      .endAngle((d: TDatum) => Math.max(0, Math.min(2 * Math.PI, this.angleScale(d.x1))))
      .innerRadius((d: TDatum) => Math.max(0, this.radiusScale(d.y0)))
      .outerRadius((d: TDatum) => Math.max(0, this.radiusScale(d.y1)))

    this.prepareData()
    this.previous = this.computed
    this.computed = this.data
  }

  prepareData(): void {
    const hierarchyData = d3Hierarchy(this.state.current.get("data").data)
      .sum(this.value)
      .each(this.assignColors.bind(this))
      .sort((a: TDatum, b: TDatum) => b.value - a.value)

    this.total = hierarchyData.value

    this.topNode = d3Partition()(hierarchyData)
      .descendants()
      .find((d: TDatum) => d.depth === 0)

    this.stateWriter("topNode", this.topNode)

    this.data = d3Partition()(hierarchyData)
      .descendants()
      .filter((d: TDatum): boolean => d.parent)
      .reverse()

    forEach((d: TDatum): void => {
      d.zoomable = !!d.children
    })(this.data)

    this.stateWriter("data", this.data)
  }

  assignColors(node: any): void {
    if (node.parent && !this.color(node.data)) {
      node.data.color = this.color(node.parent.data)
    }
  }

  hoverOuter(radius: number): number {
    return radius + 1
  }

  computeTranslate(): [number, number] {
    const drawingDims: IObject = this.state.current.get("computed").canvas.drawingDims
    this.currentTranslation = [drawingDims.width / 2, drawingDims.height / 2]
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
      s0 = old.x0
      e0 = old.x1
    } else if (!old && previous) {
      s0 = previous.x1
      e0 = previous.x1
    } else if (!previous && previousData.length > 0) {
      s0 = last.x1
      e0 = last.x1
    } else {
      s0 = 0
      e0 = 0
    }

    const f = interpolateObject({ x0: s0, x1: e0, y0: 0, y1: 0 }, { x0: d.x0, x1: d.x1, y0: d.y0, y1: d.y1 })

    return (t: number): string => this.arc(f(t))
  }

  removeArcTween(d: TDatum, i: number): (t: number) => string {
    let s0: number
    let e0: number
    s0 = e0 = 2 * Math.PI

    const f = interpolateObject({ x0: d.x0, x1: d.x1, y0: d.y0, y1: d.y1 }, { x0: s0, x1: e0, y0: 0, y1: 0 })

    return (t: number): string => this.arc(f(t))
  }

  labelTranslate(d: TDatum): string {
    return this.translateString(this.computed.arc.centroid(d))
  }

  translateString(values: [number, number]): string {
    return `translate(${values.join(", ")})`
  }

  // // Remove & clean up
  // remove(): void {
  //   if (this.drawn) {
  //     this.el.remove()
  //     this.drawn = false
  //   }
  // }
}

export default Renderer
