import Events from "./event_catalog"
import * as d3 from "d3-selection"
import { isArray, reduce } from "lodash/fp"
import { IEvents, IObject, IState, TD3Selection, TSeriesEl, TStateWriter } from "./typings"
import * as styles from "./styles"

abstract class Canvas {
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
    this.listenToMouseOver()
  }

  insertContainer(context: Element): TD3Selection {
    const container = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", `${styles.chartContainer}`)
    context.appendChild(container.node())
    return container
  }

  abstract createEl(): TSeriesEl

  insertEl(): TSeriesEl {
    const el: TSeriesEl = this.createEl()
    this.container.node().appendChild(el.node())
    this.elMap.series = el
    return el
  }

  abstract mouseOverElement(): TD3Selection

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
    const el: TD3Selection = this.mouseOverElement()
    if (el) {
      el.node().addEventListener("mouseenter", this.onMouseEnter.bind(this))
      el.node().addEventListener("mouseleave", this.onMouseLeave.bind(this))
      el.node().addEventListener("click", this.onClick.bind(this))
    }
  }

  elementFor(component: string): any {
    return this.elMap[component]
  }

  prefixedId(id: string): string {
    return this.state.current.get("config").uid + id
  }

  shadowDefinitionId(): string {
    return this.prefixedId("_shadow")
  }

  trackMouseMove(): void {
    return
  }

  stopMouseMove(): void {
    return
  }

  draw(): void {
    this.container.classed("hidden", this.state.current.get("config").hidden)
    this.stateWriter(["containerRect"], this.container.node().getBoundingClientRect())
  }

  remove(): void {
    const el: TD3Selection = this.mouseOverElement()
    if (el) {
      el.node().removeEventListener("mouseenter", this.onMouseEnter.bind(this))
      el.node().removeEventListener("mouseleave", this.onMouseLeave.bind(this))
      el.node().removeEventListener("click", this.onClick.bind(this))
    }
    this.elements = {}
    this.container.remove()
    this.container = undefined
    this.el = undefined
  }
}

export default Canvas
