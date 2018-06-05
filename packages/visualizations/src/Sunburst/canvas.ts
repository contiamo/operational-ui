import Events from "../shared/event_catalog"
import * as d3 from "d3-selection"
import { Canvas, D3Selection, Dimensions, EventBus, State, StateWriter, SunburstConfig } from "./typings"
import * as styles from "../shared/styles"
import * as localStyles from "./styles"

class SunburstCanvas implements Canvas {
  private breadcrumb: D3Selection
  private chartContainer: D3Selection
  private el: D3Selection
  private elMap: { [key: string]: D3Selection } = {}
  private events: EventBus
  private rootLabel: D3Selection
  private state: State
  private stateWriter: StateWriter

  constructor(state: State, stateWriter: StateWriter, events: EventBus, context: Element) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.chartContainer = this.renderChartContainer(context)
    this.breadcrumb = this.renderBreadcrumb()
    this.el = this.renderEl()
    this.rootLabel = this.renderRootLabel()
    this.renderFocus()
  }

  // Chart container
  private renderChartContainer(context: Element): D3Selection {
    const container: Element = document.createElementNS(d3.namespaces["xhtml"], "div")
    context.appendChild(container)
    return d3.select(container).attr("class", styles.chartContainer)
  }

  // Breadcrumb
  private renderBreadcrumb(): D3Selection {
    const el: Element = document.createElementNS(d3.namespaces["xhtml"], "div")
    this.chartContainer.node().appendChild(el)
    this.elMap.breadcrumb = d3.select(el).attr("class", localStyles.breadcrumb)
    return this.elMap.breadcrumb
  }

  // El
  private renderEl(): D3Selection {
    const elNode: Element = document.createElementNS(d3.namespaces["svg"], "svg")
    elNode.addEventListener("mouseenter", this.onMouseEnter.bind(this))
    elNode.addEventListener("mouseleave", this.onMouseLeave.bind(this))
    elNode.addEventListener("click", this.onClick.bind(this))
    this.chartContainer.node().appendChild(elNode)

    const el: D3Selection = d3.select(elNode)
    el.append("svg:g").attr("class", "arcs")
    el.append("svg:g").attr("class", "arrows")
    el.append("circle").attr("class", localStyles.centerCircle)
    this.elMap.series = el
    return el
  }

  private onMouseEnter(): void {
    this.events.emit(Events.CHART.HOVER)
  }

  private onMouseLeave(): void {
    this.events.emit(Events.CHART.OUT)
  }

  private onClick(): void {
    this.events.emit(Events.CHART.CLICK)
  }

  // Root label
  private renderRootLabel(): D3Selection {
    const el = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", localStyles.rootLabel)
      .html("<span class='value'></span><br><span class='name'></span>")
    this.chartContainer.node().appendChild(el.node())
    this.elMap.rootLabel = el
    return el
  }

  // FocusElement
  private renderFocus(): D3Selection {
    const focus = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", `${styles.focusLegend} ${styles.focusLegendAbove}`)
      .style("visibility", "hidden")
    this.chartContainer.node().appendChild(focus.node())
    this.elMap.focus = focus
    return focus
  }

  private drawingDims(): Dimensions {
    const config = this.state.current.get("config")
    return {
      width: config.width,
      height: config.height - this.breadcrumb.node().getBoundingClientRect().height,
    }
  }

  // Lifecycle
  draw(): void {
    const config = this.state.current.get("config")
    const drawingDims = this.drawingDims()
    this.stateWriter("drawingDims", drawingDims)

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

  remove(): void {
    this.el.node().removeEventListener("mouseenter", this.onMouseEnter.bind(this))
    this.el.node().removeEventListener("mouseleave", this.onMouseLeave.bind(this))
    this.el.node().removeEventListener("click", this.onClick.bind(this))
  }

  // Helper method
  elementFor(component: string): D3Selection {
    return this.elMap[component]
  }
}

export default SunburstCanvas
