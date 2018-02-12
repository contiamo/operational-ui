import Events from "../utils/event_catalog"
import { IConfig, IEvents, IObject, IState, TD3Selection, TDatum, IAccessors, TStateWriter } from "./typings"
import { every, find, filter, forEach, findIndex, identity, isEmpty, map, reduce } from "lodash/fp"
import * as styles from "./styles"
import { withD3Element, transitionIfVisible } from "../utils/d3_utils"

// d3 imports
import * as d3 from "d3-selection"
import "d3-transition"
import { interpolate as d3Interpolate, interpolateObject as d3InterpolateObject } from "d3-interpolate"
import { pie as d3Pie, arc as d3Arc } from "d3-shape"
import { scaleLinear as d3ScaleLinear } from "d3-scale"
import { hierarchy as d3Hierarchy, partition as d3Partition } from "d3-hierarchy"

class Renderer {
  angleScale: any
  arc: any
  children: (d: TDatum) => TDatum[]
  color: (d: TDatum) => string
  currentTranslation: [number, number]
  data: TDatum[]
  drawn: boolean = false
  el: TD3Selection
  events: IEvents
  mouseOverDatum: TDatum
  name: (d: TDatum) => string
  previous: TDatum[]
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
    this.events.on(Events.FOCUS.ELEMENT.CLICK, this.onClick.bind(this))
  }

  assignAccessors(): void {
    const accessors: IAccessors = this.state.current.get("accessors").series
    // In prepared data, original data is saved in d.data, so accessors need to be modified accordingly
    forEach.convert({ cap: false })((accessor: (d: TDatum) => any, key: string): void => {
      ;(this as any)[key] = (d: TDatum): any => (d.data ? accessor(d.data) : accessor(d))
    })(accessors)
  }

  hasData(): boolean {
    return this.data.length > 0
  }

  draw(): void {
    this.assignAccessors()
    this.compute()
    this.drawn ? this.updateDraw() : this.initialDraw()
  }

  initialDraw(): void {
    // groups
    this.el.append("svg:g").attr("class", "arcs")
    this.el.append("circle").attr("class", styles.centerCircle)

    if (this.hasData()) {
      this.updateDraw()
    }

    this.drawn = true
  }

  updateDraw(): void {
    // Remove focus before updating chart
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)

    const drawingDims: any = this.state.current.get("computed").canvas.drawingDims
    this.el
      .select(`circle.${styles.centerCircle}`)
      .attr("cx", drawingDims.width / 2)
      .attr("cy", drawingDims.height / 2)

    // Arcs
    const arcs: TD3Selection = this.el
      .select("g.arcs")
      .attr("transform", this.translateString(this.computeTranslate()))
      .selectAll(`path.${styles.arc}`)
      .data(this.data, this.name)

    const config: IConfig = this.state.current.get("config")
    this.exit(arcs, config.duration, document.hidden || config.suppressAnimation)
    this.enterAndUpdate(arcs, config.duration, document.hidden || config.suppressAnimation)
  }

  exit(arcs: TD3Selection, duration: number, hidden: boolean): void {
    const exitingArcs: any = hidden
      ? arcs.exit()
      : arcs
          .exit()
          .transition()
          .duration(duration)
          .attrTween("d", this.removeArcTween.bind(this))
    exitingArcs.remove()
  }

  enterAndUpdate(arcs: TD3Selection, duration: number, hidden: boolean): void {
    const updatingArcs: TD3Selection = arcs
      .enter()
      .append("svg:path")
      .style("fill", this.color)
      .style("stroke", "#fff")
      .on("mouseenter", withD3Element(this.onMouseOver.bind(this)))
      .on("click", (d: IObject) => this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d, force: true }))
      .merge(arcs)
      .attr(
        "class",
        (d: TDatum): string => `${styles.arc} ${!d.parent ? "parent" : ""} ${d.zoomable ? "zoomable" : ""}`
      )

    if (hidden) {
      updatingArcs.attr("d", this.arc.bind(this))
    } else {
      updatingArcs
        .transition()
        .duration(duration)
        .attrTween("d", this.arcTween.bind(this))
    }
  }

  onClick(payload: IObject): void {
    // Don't allow zooming on last child
    if (payload.d && !payload.d.children) {
      return
    }

    const zoomNode: TDatum = payload.d || this.topNode

    // If the center node is clicked, zoom out
    if (zoomNode === this.zoomNode && payload && payload.force) {
      this.zoomOut(payload)
      return
    }

    // Set new scale domains
    const config: IObject = this.state.current.get("config"),
      maxChildRadius: number = reduce((memo: number, child: TDatum) => {
        return child.depth - zoomNode.depth <= this.state.current.get("config").maxRings
          ? Math.max(memo, child.y1)
          : memo
      }, 0)(zoomNode.descendants()),
      angleDomain = d3Interpolate(this.angleScale.domain(), [zoomNode.x0, zoomNode.x1]),
      radiusDomain = d3Interpolate(this.radiusScale.domain(), [zoomNode.y0, maxChildRadius])

    // Save new inner radius to facilitate sizing and positioning of root label
    const innerRadius: number = this.radiusScale.domain([zoomNode.y0, maxChildRadius])(zoomNode.y1)
    this.stateWriter("innerRadius", innerRadius)

    // If the sunburst is not zoomed in and the root node is fully surrounded by children,
    // make the radius of the central white circle equal to the inner radius of the first ring,
    // to avoid an extra grey ring around the root node.
    const totalRootChildValue: number = reduce((memo: number, child: TDatum): number => {
      return memo + child.value
    }, 0)(this.topNode.children)
    const rootIsSurrounded: boolean = zoomNode === this.topNode && zoomNode.value === totalRootChildValue

    transitionIfVisible(this.el.select(`circle.${styles.centerCircle}`), config.duration).attr(
      "r",
      rootIsSurrounded ? innerRadius : innerRadius * config.centerCircleRadius
    )

    // If no payload has been sent (resetting zoom) and the chart hasn't already been zoomed
    // (occurs when no zoom config is passed in from the outside)
    // no need to do anything.
    if (!this.zoomNode && !payload.d) {
      return
    }

    this.zoomNode = zoomNode
    this.stateWriter("zoomNode", this.zoomNode)

    const paths: TD3Selection = this.el
      .selectAll("path")
      .attr("pointer-events", "none")
      .classed("zoomed", (datum: TDatum): boolean => datum === this.zoomNode)
      .each(
        withD3Element((datum: TDatum, el: Element): void => {
          d3.select(el).attr("pointer-events", null)
        })
      )

    if (document.hidden) {
      this.angleScale.domain(angleDomain(1))
      this.radiusScale.domain(radiusDomain(1))
      paths.attr("d", this.arc.bind(this))
    } else {
      paths
        .transition()
        .duration(config.duration)
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

    const sequenceArray = d.ancestors()
    sequenceArray.pop() // remove root node from the array

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

  // Compute
  compute(): void {
    const drawingDims: IConfig = this.state.current.get("computed").canvas.drawingDims
    this.radius =
      Math.min(drawingDims.width, drawingDims.height) / 2 - this.state.current.get("config").outerBorderMargin

    this.angleScale = d3ScaleLinear()
      .clamp(true)
      .range([0, 2 * Math.PI])
    this.radiusScale = d3ScaleLinear()
      .clamp(true)
      .range([0, this.radius])

    this.arc = d3Arc()
      .startAngle((d: TDatum): number => this.angleScale(d.x0))
      .endAngle(this.endAngle.bind(this))
      .innerRadius((d: TDatum): number => this.radiusScale(d.y0))
      .outerRadius((d: TDatum): number => this.radiusScale(d.y1))

    this.previous = this.data
    this.prepareData()
  }

  endAngle(d: TDatum): number {
    // Set a minimum segment angle so that the segment can always be seen,
    // UNLESS the segment is not the child of the top or zoomed node (i.e. should not be visible)
    const show: boolean =
      findIndex((datum: TDatum): boolean => this.isEqual(this.zoomNode || this.topNode, datum))(d.ancestors()) > -1
    const minAngle: number = show ? Math.asin(1 / this.radiusScale(d.y0)) || 0 : 0
    return Math.max(this.angleScale(d.x0) + minAngle, Math.min(2 * Math.PI, this.angleScale(d.x1)))
  }

  checkDataValidity(): void {
    // All data points must have a value assigned
    const noValueData: TDatum[] = filter((d: TDatum): boolean => !d.value)(this.data)

    if (noValueData.length > 0) {
      throw new Error(`The following nodes do not have values: ${map(this.name)(noValueData)}`)
    }

    // Parent nodes cannot be smaller than the sum of their children
    const childrenExceedParent: TDatum[] = filter((d: TDatum): boolean => {
      const childSum: number = reduce((sum: number, child: TDatum): number => sum + child.value, 0)(d.children)
      return d.value < childSum
    })(this.data)

    if (childrenExceedParent.length > 0) {
      throw new Error(
        `The following nodes are smaller than the sum of their child nodes: ${map(this.name)(childrenExceedParent)}`
      )
    }
  }

  prepareData(): void {
    const data: IObject = this.state.current.get("accessors").data.data(this.state.current.get("data")) || {}

    const sortingFunction: any = this.state.current.get("config").sort
      ? (a: TDatum, b: TDatum) => b.value - a.value
      : undefined

    const hierarchyData = d3Hierarchy(data)
      .each(this.assignColors.bind(this))
      .sort(sortingFunction)

    this.total = hierarchyData.value

    this.topNode = d3Partition()(hierarchyData)
      .descendants()
      .find((d: TDatum): boolean => d.depth === 0)

    this.stateWriter("topNode", this.topNode)

    this.data = d3Partition()(hierarchyData)
      .descendants()
      .filter((d: TDatum): boolean => !isEmpty(d.data))

    this.checkDataValidity()

    forEach((d: TDatum): void => {
      d.zoomable = d.parent && !!d.children
    })(this.data)

    this.stateWriter("data", this.data)
  }

  assignColors(node: any): void {
    if (node.parent && !this.color(node)) {
      node.data.color = this.color(node.parent)
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

  isSibling(d1: TDatum, d2: TDatum): boolean {
    if (!d1.parent && !d2.parent) {
      return true
    }
    if (!d1.parent || !d2.parent) {
      return false
    }
    return every(identity)([d1.depth === d2.depth, this.name(d1.parent) === this.name(d2.parent)])
  }

  isEqual(d1: TDatum, d2: TDatum): boolean {
    if (!d1 || !d2) {
      return false
    }
    return every(identity)([this.name(d1) === this.name(d2), this.isSibling(d1, d2)])
  }

  findSiblings(data: TDatum[], d: TDatum): TDatum[] {
    return filter((datum: TDatum): boolean => this.isSibling(datum, d))(data)
  }

  findAncestor(data: TDatum[], d: TDatum): TDatum {
    if (!d) {
      return
    }
    const parent: TDatum = find((datum: TDatum): boolean => this.isEqual(datum, d.parent))(data)
    return parent || this.findAncestor(data, d.parent)
  }

  findDatum(data: TDatum[], d: TDatum): TDatum {
    return find((datum: TDatum): boolean => this.isEqual(datum, d))(data)
  }

  arcTween(d: TDatum): (t: number) => string {
    const previousData: TDatum[] = this.previous || [],
      // old version of same datum
      old: TDatum = find((datum: TDatum): boolean => this.isEqual(datum, d))(previousData),
      // nearest ancestor that already exists
      oldParent: TDatum = this.findAncestor(previousData.concat([this.topNode]), d)

    let x0: number
    let x1: number
    let y0: number
    let y1: number
    if (old) {
      x0 = old.x0
      x1 = old.x1
      y0 = old.y0
      y1 = old.y1
    } else if (!old && oldParent) {
      // find siblings - same parent, same depth
      const siblings: TDatum[] = this.findSiblings(this.data, d)
      const siblingIndex: number = findIndex((datum: TDatum): boolean => this.isEqual(datum, d))(siblings)
      const oldPrecedingSibling: TDatum = this.findDatum(previousData, siblings[siblingIndex - 1])

      x0 = oldPrecedingSibling ? oldPrecedingSibling.x1 : oldParent.x0
      x1 = oldPrecedingSibling ? oldPrecedingSibling.x1 : oldParent.x0
      y0 = d.y0
      y1 = d.y1
    } else if (!old && !oldParent) {
      x0 = 0
      x1 = 0
      y0 = d.y0
      y1 = d.y1
    }

    const f = d3InterpolateObject({ x0, x1, y0, y1 }, d)
    return (t: number): string => this.arc(f(t))
  }

  removeArcTween(d: TDatum): (t: number) => string {
    const oldSiblings: TDatum[] = this.findSiblings(this.previous || [], d)
    const currentSiblings: TDatum[] = this.findSiblings(this.data, d)
    const oldSiblingIndex: number = findIndex((datum: TDatum): boolean => this.isEqual(datum, d))(oldSiblings)
    const oldPrecedingSibling: TDatum = filter
      .convert({ cap: false })((sibling: TDatum, i: number): boolean => {
        return i < oldSiblingIndex && !!this.findDatum(currentSiblings, sibling)
      })(oldSiblings)
      .pop()
    const precedingSibling: TDatum = this.findDatum(this.data, oldPrecedingSibling)
    const parent: TDatum = this.findAncestor(this.data.concat([this.topNode]), d)

    let x: number
    if (precedingSibling) {
      x = precedingSibling.x1
    } else if (parent) {
      x = parent.x0
    } else {
      x = 0
    }

    const f = d3InterpolateObject({ x0: x, x1: x }, d)
    return (t: number): string => this.arc(f(1 - t))
  }

  labelTranslate(d: TDatum): string {
    return this.translateString(this.arc.centroid(d))
  }

  translateString(values: [number, number]): string {
    return `translate(${values.join(", ")})`
  }
}

export default Renderer
