import Events from "../utils/event_catalog"
import * as d3 from "d3-selection"
import { isArray, reduce } from "lodash/fp"
import { TD3Selection, IState, TStateWriter, IEvents, IObject, TSeriesEl } from "./typings"
import * as styles from "../utils/styles"
import * as localStyles from "./styles"

class Canvas {
  breadcrumb: TD3Selection
  container: TD3Selection
  el: TSeriesEl
  events: IEvents
  rootLabel: TD3Selection
  protected elements: IObject = {}
  protected state: IState
  protected elMap: IObject = {}
  stateWriter: TStateWriter

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.container = this.insertContainer(context)
    this.breadcrumb = this.insertBreadcrumb()
    this.el = this.insertEl()
    this.rootLabel = this.insertRootLabel()
    this.listenToMouseOver()
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

  insertBreadcrumb(): TD3Selection {
    const el: TD3Selection = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", localStyles.breadcrumb)
    this.container.node().appendChild(el.node())
    this.elMap.breadcrumb = el
    return el
  }

  insertEl(): TSeriesEl {
    const el: TSeriesEl = d3.select(document.createElementNS(d3.namespaces["svg"], "svg"))
    this.container.node().appendChild(el.node())
    this.elMap.series = el
    return el
  }

  insertRootLabel(): TD3Selection {
    const el: TD3Selection = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", localStyles.rootLabel)
      .html("<span class='value'></span><br><span class='name'></span>")
    this.container.node().appendChild(el.node())
    this.elMap.rootLabel = el
    return el
  }

  prefixedId(id: string): string {
    return this.state.current.get("config").uid + id
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

  drawingDims(): IObject {
    const config: IObject = this.state.current.get("config")
    const dims: IObject = {
      width: config.width,
      height: config.height - this.breadcrumb.node().getBoundingClientRect().height
    }
    this.stateWriter("drawingDims", dims)
    return dims
  }

  draw(): void {
    const config: IObject = this.state.current.get("config"),
      drawingDims: IObject = this.drawingDims()

    this.container
      .classed("hidden", this.state.current.get("config").hidden)
      .style("width", config.width + "px")
      .style("height", config.height + "px")
    this.el.style("width", drawingDims.width + "px").style("height", drawingDims.height + "px")
    this.stateWriter(["containerRect"], this.container.node().getBoundingClientRect())
  }

  remove(): void {
    this.el.node().removeEventListener("mouseenter", this.onMouseEnter.bind(this))
    this.el.node().removeEventListener("mouseleave", this.onMouseLeave.bind(this))
    this.el.node().removeEventListener("click", this.onClick.bind(this))
  }
}

export default Canvas
