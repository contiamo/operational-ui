import Events from "../utils/event_catalog"
import * as d3 from "d3-selection"
import { isArray, reduce } from "lodash/fp"
import { TD3Selection, IState, TStateWriter, IEvents, IObject, TSeriesEl } from "./typings"
import * as styles from "../utils/styles"

class Canvas {
  container: TD3Selection
  el: TSeriesEl
  events: IEvents
  protected elements: IObject = {}
  protected state: IState
  protected elMap: IObject = {}
  stateWriter: TStateWriter

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.container = this.insertContainer(context)
    this.el = this.insertEl()
    this.elements.defs = this.el.append("defs")
    this.listenToMouseOver()
    this.appendShadows()
    this.appendBackground()
    this.insertFocusElements()
    this.stateWriter("elements", this.elements)
  }

  insertContainer(context: Element): TD3Selection {
    const container = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", `${styles.chartContainer}`)
    context.appendChild(container.node())
    return container
  }

  insertEl(): TSeriesEl {
    const el: TSeriesEl = d3.select(document.createElementNS(d3.namespaces["svg"], "svg"))
    this.container.node().appendChild(el.node())
    this.elMap.series = el
    return el
  }

  prefixedId(id: string): string {
    return this.state.current.get("config").uid + id
  }

  shadowDefinitionId(): string {
    return this.prefixedId("_shadow")
  }

  appendShadows(): void {
    const shadow: TD3Selection = this.elements.defs
      .append("filter")
      .attr("id", this.shadowDefinitionId())
      .attr("height", "130%")
    shadow
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", "3")
    shadow
      .append("feOffset")
      .attr("dx", "2")
      .attr("dy", "2")
      .attr("result", "offsetblur")
    shadow
      .append("feComponentTransfer")
      .append("feFuncA")
      .attr("type", "linear")
      .attr("slope", "0.5")

    const shadowFeMerge: TD3Selection = shadow.append("feMerge")
    shadowFeMerge.append("feMergeNode")
    shadowFeMerge.append("feMergeNode").attr("in", "SourceGraphic")
    this.stateWriter("shadowDefinitionId", this.shadowDefinitionId())
  }

  appendBackground(): void {
    this.elements.background = this.el
      .append("rect")
      .attr("class", styles.chartBackground)
      .attr("x", 0)
      .attr("y", 0)
  }

  insertFocusElements(): void {
    const main: TD3Selection = this.insertFocusLabel()
    const component: TD3Selection = this.insertComponentFocus()
    this.elMap.focus = { main, component }
  }

  insertFocusLabel(): TD3Selection {
    const focusEl = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", `${styles.focusLegend}`)
      .style("visibility", "hidden")
    this.container.node().appendChild(focusEl.node())
    return focusEl
  }

  insertComponentFocus(): TD3Selection {
    const focusEl = d3.select(document.createElementNS(d3.namespaces["xhtml"], "div")).attr("class", "component-focus")
    const ref: Node = this.container.node()
    ref.insertBefore(focusEl.node(), ref.nextSibling)
    return focusEl
  }

  onMouseEnter(): void {
    this.events.emit(Events.CHART.MOUSEOVER)
    this.trackMouseMove()
  }

  onMouseLeave(): void {
    this.events.emit(Events.CHART.MOUSEOUT)
    this.stopMouseMove()
  }

  onClick(): void {
    this.events.emit(Events.CHART.CLICK)
  }

  listenToMouseOver(): void {
    this.el.node().addEventListener("mouseenter", this.onMouseEnter.bind(this))
    this.el.node().addEventListener("mouseleave", this.onMouseLeave.bind(this))
    this.el.node().addEventListener("click", this.onClick.bind(this))
  }

  elementFor(component: string): any {
    return this.elMap[component]
  }

  trackMouseMove(): void {
    return
  }

  stopMouseMove(): void {
    return
  }

  draw(): void {
    const config: IObject = this.state.current.get("config")
    this.container
      .classed("hidden", this.state.current.get("config").hidden)
      .style("width", config.width + "px")
      .style("height", config.height + "px")
    this.el.style("width", config.width + "px").style("height", config.height + "px")
    this.elements.background.attr("width", config.width).attr("height", config.height)
    this.stateWriter(["containerRect"], this.container.node().getBoundingClientRect())
  }

  remove(): void {
    this.el.node().removeEventListener("mouseenter", this.onMouseEnter.bind(this))
    this.el.node().removeEventListener("mouseleave", this.onMouseLeave.bind(this))
    this.el.node().removeEventListener("click", this.onClick.bind(this))
    this.elements = {}
    this.container.remove()
    this.container = undefined
    this.el = undefined
  }
}

export default Canvas
