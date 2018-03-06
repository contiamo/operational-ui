import Events from "../utils/event_catalog"
import * as d3 from "d3-selection"
import { Canvas, TD3Selection, IState, TStateWriter, IEvents, IObject, TSeriesEl } from "./typings"
import * as styles from "../utils/styles"
import * as localStyles from "./styles"

class SunburstCanvas implements Canvas {
  breadcrumb: TD3Selection
  chartContainer: TD3Selection
  el: TSeriesEl
  events: IEvents
  rootLabel: TD3Selection
  protected state: IState
  protected elMap: IObject = {}
  stateWriter: TStateWriter

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.chartContainer = this.insertChartContainer(context)
    this.breadcrumb = this.insertBreadcrumb()
    this.el = this.insertEl()
    this.rootLabel = this.insertRootLabel()
    this.insertFocus()
  }

  // Chart container
  insertChartContainer(context: Element): TD3Selection {
    const container: Element = document.createElementNS(d3.namespaces["xhtml"], "div")
    context.appendChild(container)
    return d3.select(container).attr("class", styles.chartContainer)
  }

  // Breadcrumb
  insertBreadcrumb(): TD3Selection {
    const el: Element = document.createElementNS(d3.namespaces["xhtml"], "div")
    this.chartContainer.node().appendChild(el)
    this.elMap.breadcrumb = d3.select(el).attr("class", localStyles.breadcrumb)
    return this.elMap.breadcrumb
  }

  // El
  insertEl(): TSeriesEl {
    const elNode: Element = document.createElementNS(d3.namespaces["svg"], "svg")
    elNode.addEventListener("mouseenter", this.onMouseEnter.bind(this))
    elNode.addEventListener("mouseleave", this.onMouseLeave.bind(this))
    elNode.addEventListener("click", this.onClick.bind(this))
    this.chartContainer.node().appendChild(elNode)

    const el: TSeriesEl = d3.select(elNode)
    el.append("svg:g").attr("class", "arcs")
    el.append("svg:g").attr("class", "arrows")
    el.append("circle").attr("class", localStyles.centerCircle)
    this.elMap.series = el
    return el
  }

  onMouseEnter(): void {
    this.events.emit(Events.CHART.MOUSEOVER)
  }

  onMouseLeave(): void {
    this.events.emit(Events.CHART.MOUSEOUT)
  }

  onClick(): void {
    this.events.emit(Events.CHART.CLICK)
  }

  // Root label
  insertRootLabel(): TD3Selection {
    const el: TD3Selection = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", localStyles.rootLabel)
      .html("<span class='value'></span><br><span class='name'></span>")
    this.chartContainer.node().appendChild(el.node())
    this.elMap.rootLabel = el
    return el
  }

  // FocusElement
  insertFocus(): TD3Selection {
    const focus = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", `${styles.focusLegend}`)
      .style("visibility", "hidden")
    this.chartContainer.node().appendChild(focus.node())
    this.elMap.focus = focus
    return focus
  }

  // Lifecycle
  draw(): void {
    const config: IObject = this.state.current.get("config"),
      drawingDims: IObject = this.drawingDims()

    this.chartContainer
      .style("visibility", this.state.current.get("config").hidden ? "hidden" : "visible")
      .style("width", config.width + "px")
      .style("height", config.height + "px")
    this.el.style("width", drawingDims.width + "px").style("height", drawingDims.height + "px")
    this.el
      .select(`circle.${localStyles.centerCircle}`)
      .attr("cx", drawingDims.width / 2)
      .attr("cy", drawingDims.height / 2)

    this.stateWriter(["containerRect"], this.chartContainer.node().getBoundingClientRect())
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

  remove(): void {
    this.el.node().removeEventListener("mouseenter", this.onMouseEnter.bind(this))
    this.el.node().removeEventListener("mouseleave", this.onMouseLeave.bind(this))
    this.el.node().removeEventListener("click", this.onClick.bind(this))
  }

  // Helper method
  elementFor(component: string): any {
    return this.elMap[component]
  }
}

export default SunburstCanvas
