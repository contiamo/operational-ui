import Events from "../utils/event_catalog"
import * as d3 from "d3-selection"
import { Canvas, TD3Selection, IState, TStateWriter, TSeriesEl, IEvents, IObject } from "./typings"
import * as styles from "../utils/styles"

class PieChartCanvas implements Canvas {
  drawingContainer: TD3Selection
  protected elements: IObject = {}
  chartContainer: TD3Selection
  el: TSeriesEl
  events: IEvents
  protected state: IState
  protected elMap: IObject = {}
  stateWriter: TStateWriter

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.chartContainer = this.insertChartContainer(context)
    this.insertLegend()
    this.drawingContainer = this.insertDrawingContainer()
    this.el = this.insertEl()
    this.appendShadows()
    this.appendDrawingGroup()
    this.insertFocusElements()
    this.stateWriter("elements", this.elements)
  }

  // Chart container
  insertChartContainer(context: Element): TD3Selection {
    const container = document.createElementNS(d3.namespaces["xhtml"], "div")
    context.appendChild(container)
    container.addEventListener("mouseenter", this.onMouseEnter.bind(this))
    container.addEventListener("mouseleave", this.onMouseLeave.bind(this))
    container.addEventListener("click", this.onClick.bind(this))
    return d3.select(container).attr("class", styles.chartContainer)
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

  // Legend
  insertLegend(): void {
    const legendNode: Element = document.createElementNS(d3.namespaces["xhtml"], "div")
    this.chartContainer.node().appendChild(legendNode)

    const legend: TD3Selection = d3
      .select(legendNode)
      .attr("class", `${styles.legend} ${styles.legendTopBottom} left`)
      .style("float", "left")

    this.elMap.legend = legend
    this.stateWriter("legend", legend)
  }

  // Drawing container
  insertDrawingContainer(): TD3Selection {
    const drawingContainer = document.createElementNS(d3.namespaces["xhtml"], "div")
    this.chartContainer.node().appendChild(drawingContainer)
    return d3.select(drawingContainer).attr("class", styles.drawingContainer)
  }

  // El
  insertEl(): TSeriesEl {
    const el: Element = document.createElementNS(d3.namespaces["svg"], "svg")
    this.drawingContainer.node().appendChild(el)
    this.elMap.series = d3.select(el)
    return this.elMap.series
  }

  // Defs
  appendShadows(): void {
    this.elements.defs = this.el.append("defs")
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

  prefixedId(id: string): string {
    return this.state.current.get("config").uid + id
  }

  shadowDefinitionId(): string {
    return this.prefixedId("_shadow")
  }

  // Drawing group
  appendDrawingGroup(): void {
    this.elements.drawing = this.el.append("svg:g").attr("class", "drawing")
  }

  // Focus elements
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
    this.chartContainer.node().appendChild(focusEl.node())
    return focusEl
  }

  insertComponentFocus(): TD3Selection {
    const focusEl = d3.select(document.createElementNS(d3.namespaces["xhtml"], "div")).attr("class", "component-focus")
    const ref: Node = this.chartContainer.node()
    ref.insertBefore(focusEl.node(), ref.nextSibling)
    return focusEl
  }

  // Lifecycle
  draw(): void {
    this.chartContainer.classed("hidden", this.state.current.get("config").hidden)
    this.stateWriter(["containerRect"], this.chartContainer.node().getBoundingClientRect())

    const config: IObject = this.state.current.get("config")
    const dims: { width: number; height: number } = this.drawingContainerDims()

    this.chartContainer.style("width", `${config.width}px`).style("height", `${config.height}px`)
    this.drawingContainer.style("width", `${dims.width}px`).style("height", `${dims.height}px`)
    this.el.style("width", `${dims.width}px`).style("height", `${dims.height}px`)
    this.stateWriter("drawingContainerRect", this.drawingContainer.node().getBoundingClientRect())
  }

  drawingContainerDims(): { height: number; width: number } {
    const config = this.state.current.get("config")
    const dims = {
      height: config.height - this.elMap.legend.node().offsetHeight,
      width: config.width
    }
    this.stateWriter("drawingContainerDims", dims)
    return dims
  }

  remove(): void {
    this.chartContainer.node().removeEventListener("mouseenter", this.onMouseEnter.bind(this))
    this.chartContainer.node().removeEventListener("mouseleave", this.onMouseLeave.bind(this))
    this.chartContainer.node().removeEventListener("click", this.onClick.bind(this))
    this.elements = {}
    this.chartContainer.remove()
    this.chartContainer = undefined
    this.el = undefined
    this.elements = {}
    this.drawingContainer.remove()
    this.drawingContainer = undefined
  }

  // Helper method
  elementFor(component: string): any {
    return this.elMap[component]
  }
}

export default PieChartCanvas
