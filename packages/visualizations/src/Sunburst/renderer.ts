import DataHandler from "./data_handler"
import Events from "../shared/event_catalog"
import { ClickPayload, D3Selection, Datum, EventBus, State, StateWriter } from "./typings"
import { every, find, filter, forEach, findIndex, get, identity, keys, map, reduce } from "lodash/fp"
import * as styles from "./styles"

// d3 imports
import * as d3 from "d3-selection"
import "d3-transition"
import { interpolate as d3Interpolate, interpolateObject as d3InterpolateObject } from "d3-interpolate"
import { arc as d3Arc } from "d3-shape"
import { scaleLinear as d3ScaleLinear } from "d3-scale"
import { withD3Element, onTransitionEnd } from "../utils/d3_utils"

const arrowPath: string = "M-5 0 L0 -5 L5 0 M-4 -5 L0 -9 L4 -5 M-3 -10 L0 -13 L3 -10"
const spaceForArrow: number = 20

class Renderer {
  private angleScale: any
  private arc: any
  private currentTranslation: [number, number]
  private data: Datum[]
  private dataHandler: DataHandler
  private el: D3Selection
  private events: EventBus
  private mouseOverDatum: Datum
  private previous: Datum[]
  private radiusScale: any
  private radius: number
  private state: State
  private stateWriter: StateWriter
  private total: number
  private zoomNode: Datum

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
    this.events.emit(Events.FOCUS.ELEMENT.OUT)
    this.removeTruncationArrows()

    const arcs = this.el
      .select("g.arcs")
      .attr("transform", this.translate())
      .selectAll(`path.${styles.arc}`)
      .data(this.data, get("id"))

    const config = this.state.current.get("config")
    this.exit(arcs, config.duration, document.hidden || config.disableAnimations)
    this.enterAndUpdate(arcs, config.duration, document.hidden || config.disableAnimations)
  }

  private exit(arcs: D3Selection, duration: number, disableAnimations: boolean): void {
    if (disableAnimations) {
      arcs.exit().remove()
      this.updateZoom()
    } else {
      arcs
        .exit()
        .transition()
        .duration(duration)
        .attrTween("d", this.removeArcTween.bind(this))
        .style("opacity", 1e-6)
        .remove()
        .call(onTransitionEnd, this.updateZoom.bind(this))
    }
  }

  private updateZoom(): void {
    const matchers = this.state.current.get("config").zoomNode
    const zoomNode: Datum = find(
      (d: Datum): boolean => {
        return every(identity)(
          reduce((memo: boolean[], matcher: string): boolean[] => {
            memo.push(d.data[matcher] === matchers[matcher])
            return memo
          }, [])(keys(matchers)),
        )
      },
    )(this.data)
    this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d: zoomNode })
  }

  isFirstLevelChild(d: Datum): boolean {
    return d.parent === (this.zoomNode || this.dataHandler.topNode)
  }

  private arcClass(d: Datum): string {
    const parentClass = !d.parent ? "parent" : ""
    const zoomClass = d.zoomable ? "zoomable" : ""
    const emptyClass = d.data.empty && this.isFirstLevelChild(d) ? "empty" : ""
    return `${styles.arc} ${parentClass} ${zoomClass} ${emptyClass}`
  }

  private enterAndUpdate(arcs: D3Selection, duration: number, disableAnimations: boolean): void {
    const updatingArcs: D3Selection = arcs
      .enter()
      .append("svg:path")
      .merge(arcs)
      .attr("class", this.arcClass.bind(this))
      .style("fill", get("color"))
      .on("mouseenter", withD3Element(this.onMouseOver.bind(this)))
      .on("click", (d: Datum): void => this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d, force: true }))

    if (disableAnimations) {
      updatingArcs.attr("d", this.arc.bind(this))
      this.updateTruncationArrows()
    } else {
      updatingArcs
        .transition()
        .duration(duration)
        .attrTween("d", this.arcTween.bind(this))
        .call(onTransitionEnd, this.updateTruncationArrows.bind(this))
    }
  }

  // Computations
  private compute(): void {
    const drawingDims = this.state.current.get("computed").canvas.drawingDims
    this.radius =
      Math.min(drawingDims.width, drawingDims.height) / 2 - this.state.current.get("config").outerBorderMargin

    this.angleScale = d3ScaleLinear()
      .clamp(true)
      .range([0, 2 * Math.PI])

    this.radiusScale = d3ScaleLinear()
      .clamp(true)
      .range([0, this.radius])

    this.arc = d3Arc()
      .startAngle(this.startAngle.bind(this))
      .endAngle(this.endAngle.bind(this))
      .innerRadius(this.innerRadius.bind(this))
      .outerRadius(this.outerRadius.bind(this))

    this.previous = this.data
    this.data = this.dataHandler.prepareData()
  }

  private startAngle(d: Datum): number {
    const minAngle: number = Math.asin(1 / this.radiusScale(d.y0)) || 0
    const strokeAdjustment: number = d.data.empty ? minAngle : 0
    return this.angleScale(d.x0) + strokeAdjustment
  }

  private endAngle(d: Datum): number {
    // Set a minimum segment angle so that the segment can always be seen,
    // UNLESS the segment is not a descendant of the top or zoomed node (i.e. should not be visible)
    const show: boolean = findIndex(this.isEqual(this.zoomNode || this.dataHandler.topNode))(d.ancestors()) > -1
    const minAngle: number = show ? Math.asin(1 / this.radiusScale(d.y0)) || 0 : 0
    const strokeAdjustment: number = d.data.empty ? -minAngle : 0
    return Math.max(this.angleScale(d.x0) + minAngle, Math.min(2 * Math.PI, this.angleScale(d.x1))) + strokeAdjustment
  }

  private innerRadius(d: Datum): number {
    const strokeAdjustment: number = d.data.empty ? 1 : 0
    return this.radiusScale(d.y0) + strokeAdjustment
  }

  private outerRadius(d: Datum): number {
    const strokeAdjustment: number = d.data.empty ? 1 : 0
    return this.radiusScale(d.y1) - strokeAdjustment
  }

  // Center elements within drawing container
  private translate(): string {
    const drawingDims = this.state.current.get("computed").canvas.drawingDims
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
    const parent = find(this.isEqual(d.parent))(data)
    return parent || this.findAncestor(data, d.parent)
  }

  private findDatum(data: Datum[], d: Datum): Datum {
    return find(this.isEqual(d))(data)
  }

  // Arc interpolations for entering segments
  private arcTween(d: Datum) {
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
      .convert({ cap: false })(
        (sibling: Datum, i: number): boolean => {
          return i < oldSiblingIndex && !!this.findDatum(currentSiblings, sibling)
        },
      )(oldSiblings)
      .pop()
    const precedingSibling = this.findDatum(this.data, oldPrecedingSibling)
    const parent = this.findAncestor(this.data.concat([this.dataHandler.topNode]), d)

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

    const zoomNode = payload.d || this.dataHandler.topNode

    // If the center node is clicked, zoom out by one level
    if (zoomNode === this.zoomNode && payload && payload.force) {
      this.zoomOut(payload)
      return
    }

    // Set new scale domains
    const config = this.state.current.get("config")

    let maxChildRadius: number = 0
    let truncated: boolean = false
    forEach(
      (child: Datum): void => {
        if (child.depth - zoomNode.depth <= this.state.current.get("config").maxRings) {
          maxChildRadius = Math.max(maxChildRadius, child.y1)
        } else {
          truncated = true
        }
      },
    )(zoomNode.descendants())

    // If any paths are truncated, reduce radius scale range to allow space for arrow markers
    this.radiusScale.range([0, this.radius - (truncated ? config.arrowOffset + spaceForArrow : 0)])

    // Angle and radius domains
    const angleDomain = d3Interpolate(this.angleScale.domain(), [zoomNode.x0, zoomNode.x1])
    const radiusDomain = d3Interpolate(this.radiusScale.domain(), [zoomNode.y0, maxChildRadius])

    // Save new inner radius to facilitate sizing and positioning of root label
    this.radiusScale.domain(radiusDomain(1))
    const innerRadius = this.radiusScale(zoomNode.y1)
    this.stateWriter("innerRadius", innerRadius)

    // If the sunburst is not zoomed in and the root node is fully surrounded by children,
    // make the radius of the central white circle equal to the inner radius of the first ring,
    // to avoid an extra grey ring around the root node.
    const totalRootChildValue = reduce((memo: number, child: Datum) => {
      return memo + child.value
    }, 0)(this.dataHandler.topNode.children)
    const isSurrounded = zoomNode === this.dataHandler.topNode && zoomNode.value === totalRootChildValue

    document.hidden || config.disableAnimations
      ? this.el
          .select(`circle.${styles.centerCircle}`)
          .attr("r", innerRadius * (isSurrounded ? 1 : config.centerCircleRadius))
      : this.el
          .select(`circle.${styles.centerCircle}`)
          .transition()
          .duration(config.duration)
          .attr("r", innerRadius * (isSurrounded ? 1 : config.centerCircleRadius))

    // If no payload has been sent (resetting zoom) and the chart hasn't already been zoomed
    // (occurs when no zoom config is passed in from the outside)
    // no need to do anything.
    if (!this.zoomNode && (!payload.d || payload.d === this.dataHandler.topNode)) {
      return
    }

    this.zoomNode = zoomNode
    this.stateWriter("zoomNode", this.zoomNode)

    this.removeTruncationArrows()

    const paths = this.el
      .selectAll(`path.${styles.arc}`)
      .attr("pointer-events", "none")
      .classed("zoomed", (datum: Datum) => datum === this.zoomNode)
      .classed("empty", (datum: Datum) => datum.data.empty && this.isFirstLevelChild(datum))
      .each(
        withD3Element(
          (datum: Datum, el: Element): void => {
            d3.select(el).attr("pointer-events", null)
          },
        ),
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
        .attrTween("d", (datum: Datum) => {
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
    if (d.data.empty && !this.isFirstLevelChild(d)) {
      return
    }

    const labelPosition = this.arc.centroid(d)[1] > 0 ? "below" : "above"
    const hideLabel = d3.select(el).classed(styles.arrow)
    this.events.emit(Events.FOCUS.ELEMENT.HOVER, {
      d,
      hideLabel,
      focusPoint: { labelPosition, centroid: this.getFocusPoint(d) },
    })

    this.mouseOverDatum = d
    this.highlightPath(d, el)
  }

  private getFocusPoint(d: Datum): [number, number] {
    const r = (3 * this.arc.outerRadius()(d) + this.arc.innerRadius()(d)) / 4
    const a = (this.arc.startAngle()(d) + this.arc.endAngle()(d)) / 2 - Math.PI / 2
    return this.translateBack([Math.cos(a) * r, Math.sin(a) * r])
  }

  private highlightPath(d: Datum, el: Element) {
    const percentage: number = Number(((100 * d.value) / this.total).toPrecision(3))
    let percentageString: string = percentage + "%"
    if (percentage < 0.1) {
      percentageString = "< 0.1%"
    }

    this.el.select("span.percentage").text(percentage < 0.1 ? "< 0.1%" : `${percentage}%`)

    this.el.select("div.explanation").style("visibility", "")

    const sequenceArray = d.ancestors()
    sequenceArray.pop() // remove root node from the array

    // Fade all the segments (leave inner circle as is).
    this.el
      .selectAll(`path.${styles.arc}`)
      .filter((d: Datum) => d !== this.zoomNode)
      .style("opacity", 0.5)

    // Then highlight only those that are an ancestor of the current segment.
    this.el
      .selectAll(`path.${styles.arc}`)
      .filter((d: Datum) => sequenceArray.indexOf(d) >= 0 && d !== this.zoomNode)
      .style("opacity", 1)

    d3.select(el).on("mouseleave", this.onMouseLeave.bind(this)(d, el))
  }

  private onMouseLeave(d: Datum, el: Element) {
    return () => {
      if (this.mouseOverDatum !== d) {
        return
      }
      this.mouseOverDatum = null

      // Remove focus label
      this.events.emit(Events.FOCUS.ELEMENT.OUT)

      this.el
        .selectAll(`path.${styles.arc}`)
        .filter((d: Datum) => d !== this.zoomNode)
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
    const degAngle: number = (radAngle * 180) / Math.PI
    const r: number = this.radiusScale(d.y1) + this.state.current.get("config").arrowOffset
    return `translate(0, ${-r}) rotate(${degAngle} 0 ${r})`
  }

  private updateTruncationArrows(): void {
    const centerNode = this.zoomNode || this.dataHandler.topNode
    const config = this.state.current.get("config")

    const data: Datum[] = map(get("parent"))(
      filter(
        (d: Datum): boolean => {
          return d.depth - centerNode.depth > config.maxRings && d.parent.depth - centerNode.depth <= config.maxRings
        },
      )(this.data),
    )

    const arrows = this.el
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
      .on("click", (d: Datum) => this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d, force: true }))
      .attr("transform", this.arrowTransformation.bind(this))
  }
}

export default Renderer
