import DataHandler from "./data_handler"
import Events from "../utils/event_catalog"
import { ClickPayload, D3Selection, Datum, EventBus, Object, State, StateWriter, SunburstConfig } from "./typings"
import { every, find, filter, forEach, findIndex, get, identity, map, reduce } from "lodash/fp"
import * as styles from "./styles"

// d3 imports
import * as d3 from "d3-selection"
import "d3-transition"
import { interpolate as d3Interpolate, interpolateObject as d3InterpolateObject } from "d3-interpolate"
import { arc as d3Arc } from "d3-shape"
import { scaleLinear as d3ScaleLinear } from "d3-scale"
import { withD3Element, transitionIfVisible, onTransitionEnd } from "../utils/d3_utils"

const arrowPath: string = "M-5 0 L0 -5 L5 0 M-4 -5 L0 -9 L4 -5 M-3 -10 L0 -13 L3 -10"
const spaceForArrow: number = 20

class Renderer {
  angleScale: any
  arc: any
  currentTranslation: [number, number]
  data: Datum[]
  dataHandler: DataHandler
  el: D3Selection
  events: EventBus
  mouseOverDatum: Datum
  previous: Datum[]
  radiusScale: any
  radius: number
  state: State
  stateWriter: StateWriter
  topNode: Datum
  total: number
  zoomNode: Datum

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.dataHandler = new DataHandler(state, stateWriter)
    this.events.on(Events.FOCUS.ELEMENT.CLICK, this.onClick.bind(this))
  }

  draw(): void {
    this.compute()
    // Remove focus and truncation markers before updating chart
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)
    this.removeTruncationArrows()

    const arcs: D3Selection = this.el
      .select("g.arcs")
      .attr("transform", this.translate())
      .selectAll(`path.${styles.arc}`)
      .data(this.data, get("name"))

    const config: SunburstConfig = this.state.current.get("config")
    this.exit(arcs, config.duration, document.hidden || config.disableAnimations)
    this.enterAndUpdate(arcs, config.duration, document.hidden || config.disableAnimations)
  }

  private exit(arcs: D3Selection, duration: number, disableAnimations: boolean): void {
    const exitingArcs: any = disableAnimations
      ? arcs.exit()
      : arcs
          .exit()
          .transition()
          .duration(duration)
          .attrTween("d", this.removeArcTween.bind(this))
    exitingArcs.remove()
  }

  private arcClass(d: Datum): string {
    return `${styles.arc} ${!d.parent ? "parent" : ""} ${d.zoomable ? "zoomable" : ""}`
  }

  private enterAndUpdate(arcs: D3Selection, duration: number, disableAnimations: boolean): void {
    const updatingArcs: D3Selection = arcs
      .enter()
      .append("svg:path")
      .merge(arcs)
      .attr("class", this.arcClass)
      .style("fill", get("color"))
      .on("mouseenter", withD3Element(this.onMouseOver.bind(this)))
      .on("click", (d: Datum): void => this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d, force: true }))

    if (disableAnimations) {
      updatingArcs.attr("d", this.arc.bind(this))
      this.updateTruncationArrows()
    } else {
      // let n: number = 0
      updatingArcs
        .transition()
        .duration(duration)
        .attrTween("d", this.arcTween.bind(this))
        .call(onTransitionEnd, this.updateTruncationArrows.bind(this))
    }
  }

  // Computations
  private compute(): void {
    const drawingDims: SunburstConfig = this.state.current.get("computed").canvas.drawingDims
    this.radius =
      Math.min(drawingDims.width, drawingDims.height) / 2 - this.state.current.get("config").outerBorderMargin

    this.angleScale = d3ScaleLinear()
      .clamp(true)
      .range([0, 2 * Math.PI])
    this.radiusScale = d3ScaleLinear()
      .clamp(true)
      .range([0, this.radius])

    this.arc = d3Arc()
      .startAngle((d: any): number => this.angleScale(d.x0))
      .endAngle(this.endAngle.bind(this))
      .innerRadius((d: any): number => this.radiusScale(d.y0))
      .outerRadius((d: any): number => this.radiusScale(d.y1))

    this.previous = this.data
    this.data = this.dataHandler.prepareData()
  }

  private endAngle(d: Datum): number {
    // Set a minimum segment angle so that the segment can always be seen,
    // UNLESS the segment is not a descendant of the top or zoomed node (i.e. should not be visible)
    const show: boolean = findIndex(this.isEqual(this.zoomNode || this.dataHandler.topNode))(d.ancestors()) > -1
    const minAngle: number = show ? Math.asin(1 / this.radiusScale(d.y0)) || 0 : 0
    return Math.max(this.angleScale(d.x0) + minAngle, Math.min(2 * Math.PI, this.angleScale(d.x1)))
  }

  // Center elements within drawing container
  private translate(): string {
    const drawingDims: Object<number> = this.state.current.get("computed").canvas.drawingDims
    this.currentTranslation = [drawingDims.width / 2, drawingDims.height / 2]
    return `translate(${this.currentTranslation.join(", ")})`
  }

  // Translate back to 0,0 in top left, for focus labels
  private translateBack(point: [number, number]): [number, number] {
    const currentTranslation: [number, number] = this.currentTranslation
    return [point[0] + currentTranslation[0], point[1] + currentTranslation[1]]
  }

  // Helper functions for finding / filtering / comparing nodes
  private isEqual(d1: Datum): (d2: Datum) => boolean {
    return (d2: Datum): boolean => {
      return Boolean(d1) && Boolean(d2) && every(identity)([d1.name === d2.name, this.isSibling(d1)(d2)])
    }
  }

  private isSibling(d1: Datum): (d2: Datum) => boolean {
    return (d2: Datum): boolean => {
      if (!d1.parent && !d2.parent) {
        return true
      }
      return d1.parent && d2.parent && every(identity)([d1.depth === d2.depth, d1.parent.name === d2.parent.name])
    }
  }

  private findSiblings(data: Datum[], d: Datum): Datum[] {
    return filter(this.isSibling(d))(data)
  }

  private findAncestor(data: Datum[], d: Datum): Datum {
    if (!d) {
      return
    }
    const parent: Datum = find(this.isEqual(d.parent))(data)
    return parent || this.findAncestor(data, d.parent)
  }

  private findDatum(data: Datum[], d: Datum): Datum {
    return find(this.isEqual(d))(data)
  }

  // Arc interpolations for entering segments
  private arcTween(d: Datum): (t: number) => string {
    const previousData: Datum[] = this.previous || [],
      // old version of same datum
      old: Datum = find(this.isEqual(d))(previousData),
      // nearest ancestor that already exists
      oldParent: Datum = this.findAncestor(previousData.concat([this.dataHandler.topNode]), d)

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
      const siblings: Datum[] = this.findSiblings(this.data, d)
      const siblingIndex: number = findIndex(this.isEqual(d))(siblings)
      const oldPrecedingSibling: Datum = this.findDatum(previousData, siblings[siblingIndex - 1])

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

  // Arc interpolations for exiting segments
  private removeArcTween(d: Datum): (t: number) => string {
    const oldSiblings: Datum[] = this.findSiblings(this.previous || [], d)
    const currentSiblings: Datum[] = this.findSiblings(this.data, d)
    const oldSiblingIndex: number = findIndex(this.isEqual(d))(oldSiblings)
    const oldPrecedingSibling: Datum = filter
      .convert({ cap: false })((sibling: Datum, i: number): boolean => {
        return i < oldSiblingIndex && !!this.findDatum(currentSiblings, sibling)
      })(oldSiblings)
      .pop()
    const precedingSibling: Datum = this.findDatum(this.data, oldPrecedingSibling)
    const parent: Datum = this.findAncestor(this.data.concat([this.dataHandler.topNode]), d)

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

  // Event handlers
  private onClick(payload: ClickPayload): void {
    // Don't allow zooming on last child
    if (payload.d && !payload.d.children) {
      return
    }

    const zoomNode: Datum = payload.d || this.dataHandler.topNode

    // If the center node is clicked, zoom out by one level
    if (zoomNode === this.zoomNode && payload && payload.force) {
      this.zoomOut(payload)
      return
    }

    // Set new scale domains
    const config: SunburstConfig = this.state.current.get("config")

    let maxChildRadius: number = 0
    let truncated: boolean = false
    forEach((child: Datum): void => {
      if (child.depth - zoomNode.depth <= this.state.current.get("config").maxRings) {
        maxChildRadius = Math.max(maxChildRadius, child.y1)
      } else {
        truncated = true
      }
    })(zoomNode.descendants())

    // If any paths are truncated, reduce radius scale range to allow space for arrow markers
    this.radiusScale.range([0, this.radius - (truncated ? config.arrowOffset + spaceForArrow : 0)])

    // Angle and radius domains
    const angleDomain = d3Interpolate(this.angleScale.domain(), [zoomNode.x0, zoomNode.x1])
    const radiusDomain = d3Interpolate(this.radiusScale.domain(), [zoomNode.y0, maxChildRadius])

    // Save new inner radius to facilitate sizing and positioning of root label
    this.radiusScale.domain(radiusDomain(1))
    const innerRadius: number = this.radiusScale(zoomNode.y1)
    this.stateWriter("innerRadius", innerRadius)

    // If the sunburst is not zoomed in and the root node is fully surrounded by children,
    // make the radius of the central white circle equal to the inner radius of the first ring,
    // to avoid an extra grey ring around the root node.
    const totalRootChildValue: number = reduce((memo: number, child: Datum): number => {
      return memo + child.value
    }, 0)(this.dataHandler.topNode.children)
    const isSurrounded: boolean = zoomNode === this.dataHandler.topNode && zoomNode.value === totalRootChildValue

    transitionIfVisible(this.el.select(`circle.${styles.centerCircle}`), config.duration).attr(
      "r",
      innerRadius * (isSurrounded ? 1 : config.centerCircleRadius)
    )

    // If no payload has been sent (resetting zoom) and the chart hasn't already been zoomed
    // (occurs when no zoom config is passed in from the outside)
    // no need to do anything.
    if (!this.zoomNode && (!payload.d || payload.d === this.dataHandler.topNode)) {
      return
    }

    this.zoomNode = zoomNode
    this.stateWriter("zoomNode", this.zoomNode)

    this.removeTruncationArrows()

    const paths: D3Selection = this.el
      .selectAll(`path.${styles.arc}`)
      .attr("pointer-events", "none")
      .classed("zoomed", (datum: Datum): boolean => datum === this.zoomNode)
      .each(
        withD3Element((datum: Datum, el: Element): void => {
          d3.select(el).attr("pointer-events", null)
        })
      )

    if (document.hidden) {
      this.angleScale.domain(angleDomain(1))
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
        .attrTween("d", (datum: Datum): any => {
          return () => this.arc(datum)
        })
        .call(onTransitionEnd, this.updateTruncationArrows.bind(this))
    }
  }

  private zoomOut(payload: ClickPayload): void {
    this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d: payload.d.parent })
  }

  private onMouseOver(d: Datum, el: Element): void {
    if (d === this.zoomNode) {
      return
    }
    const centroid: [number, number] = this.translateBack(this.arc.centroid(d))
    const hideLabel: boolean = d3.select(el).classed(styles.arrow)
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOVER, { d, hideLabel, focusPoint: { centroid } })

    this.mouseOverDatum = d
    this.highlightPath(d, el)
  }

  private highlightPath(d: Datum, el: Element) {
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
      .filter((d: Datum): boolean => d !== this.zoomNode)
      .style("opacity", 0.3)

    // Then highlight only those that are an ancestor of the current segment.
    this.el
      .selectAll(`path.${styles.arc}`)
      .filter((d: Datum): boolean => sequenceArray.indexOf(d) >= 0 && d !== this.zoomNode)
      .style("opacity", 1)

    d3.select(el).on("mouseleave", this.onMouseLeave.bind(this)(d, el))
  }

  private onMouseLeave(d: Datum, el: Element): any {
    return () => {
      if (this.mouseOverDatum !== d) {
        return
      }
      this.mouseOverDatum = null

      // Remove focus label
      this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)

      this.el
        .selectAll(`path.${styles.arc}`)
        .filter((d: Datum): boolean => d !== this.zoomNode)
        .style("opacity", 1)

      this.el.select("div.explanation").style("visibility", "hidden")
    }
  }

  // Arrows to denote path truncation
  private removeTruncationArrows(): void {
    this.el
      .select("g.arrows")
      .selectAll("path")
      .remove()
  }

  private arrowTransformation(d: Datum): string {
    const radAngle: number = d3Interpolate(this.angleScale(d.x0), this.angleScale(d.x1))(0.5)
    const degAngle: number = radAngle * 180 / Math.PI
    const r: number = this.radiusScale(d.y1) + this.state.current.get("config").arrowOffset
    return `translate(0, ${-r}) rotate(${degAngle} 0 ${r})`
  }

  private updateTruncationArrows(): void {
    const centerNode: Datum = this.zoomNode || this.dataHandler.topNode,
      config: SunburstConfig = this.state.current.get("config")

    const data: Datum[] = map(get("parent"))(
      filter((d: Datum): boolean => {
        return d.depth - centerNode.depth > config.maxRings && d.parent.depth - centerNode.depth <= config.maxRings
      })(this.data)
    )

    const arrows: D3Selection = this.el
      .select("g.arrows")
      .attr("transform", this.translate())
      .selectAll(`path.${styles.arrow}`)
      .data(data, get("name"))

    arrows.exit().remove()

    arrows
      .enter()
      .append("svg:path")
      .attr("class", styles.arrow)
      .merge(arrows)
      .attr("d", arrowPath)
      .on("mouseenter", withD3Element(this.onMouseOver.bind(this)))
      .on("click", (d: Datum): void => this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d, force: true }))
      .attr("transform", this.arrowTransformation.bind(this))
  }
}

export default Renderer
