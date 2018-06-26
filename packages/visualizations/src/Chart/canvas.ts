import Events from "../shared/event_catalog"
import * as d3 from "d3-selection"
import { AxisPosition, Canvas, D3Selection, Dimensions, EventBus, SeriesElements, State, StateWriter } from "./typings"
import * as styles from "../shared/styles"
import * as localStyles from "./styles"
import { forEach, get, reduce } from "lodash/fp"

const seriesElements: SeriesElements = [
  ["area", "drawing_clip"],
  ["bars", "drawing_clip"],
  ["flag", "xyrules_clip"],
  ["line", "drawing_clip"],
  ["symbol", "xyrules_clip"],
  ["text", "yrules_clip"],
]

const axes = ["y", "x"]

const legends = [
  { position: "top", float: "left" },
  { position: "top", float: "right" },
  { position: "bottom", float: "left" },
]

class ChartCanvas implements Canvas {
  private chartContainer: D3Selection
  private drawingContainer: D3Selection
  private drawingGroup: D3Selection
  private el: D3Selection
  private elMap: { [key: string]: D3Selection } = {}
  private events: EventBus
  private state: State
  private stateWriter: StateWriter

  constructor(state: State, stateWriter: StateWriter, events: EventBus, context: Element) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.chartContainer = this.renderChartContainer(context)
    this.drawingContainer = this.renderDrawingContainer()
    this.renderLegends()
    this.el = this.renderEl()
    this.renderClipPaths()
    this.drawingGroup = this.renderDrawingGroup()
    this.renderAxes()
    this.renderRules()
    this.renderSeriesDrawingGroups()
    this.renderFocusElements()
    this.events.on("margins:update", this.draw.bind(this))
  }

  // Lifecycle
  draw(): void {
    const config = this.state.current.get("config")
    const dims = this.calculateDrawingContainerDims()
    this.stateWriter("drawingContainerDims", dims)

    // Resize elements
    this.chartContainer
      .attr("class", `${styles.chartContainer} ${this.state.current.get("config").uid}`)
      .classed("hidden", this.state.current.get("config").hidden)
      .style("width", `${config.width}px`)
      .style("height", `${config.height}px`)
    this.stateWriter(["containerRect"], this.chartContainer.node().getBoundingClientRect())

    this.drawingContainer.style("width", `${dims.width}px`).style("height", `${dims.height}px`)

    this.el.style("width", `${dims.width}px`).style("height", `${dims.height}px`)

    this.drawingGroup.attr("transform", `translate(${this.margin("y1")}, ${this.margin("x2")})`)

    const drawingDims = this.calculateDrawingDims()
    this.stateWriter("drawingDims", drawingDims)

    this.updateClipPaths(dims, drawingDims)
    this.el.on("mousemove", this.onMouseMove.bind(this))
  }

  remove(): void {
    this.chartContainer.node().removeEventListener("mouseenter", this.onMouseEnter.bind(this))
    this.chartContainer.node().removeEventListener("mouseleave", this.onMouseLeave.bind(this))
    this.chartContainer.node().removeEventListener("click", this.onClick.bind(this))
    this.chartContainer.remove()
    this.chartContainer = undefined
    this.el = undefined
    this.drawingContainer.remove()
    this.drawingContainer = undefined
  }

  // Helper methods
  elementFor(component: string): D3Selection {
    return this.elMap[component]
  }

  // Rendering
  // Chart container
  private renderChartContainer(context: Element): D3Selection {
    const container = document.createElementNS(d3.namespaces["xhtml"], "div")
    context.appendChild(container)
    container.addEventListener("mouseenter", this.onMouseEnter.bind(this))
    container.addEventListener("mouseleave", this.onMouseLeave.bind(this))
    container.addEventListener("click", this.onClick.bind(this))
    return d3.select(container)
  }

  // Event listeners
  private onMouseEnter(): void {
    this.events.emit(Events.CHART.HOVER)
    this.el.on("mousemove", this.onMouseMove.bind(this))
  }

  private onMouseLeave(): void {
    this.events.emit(Events.CHART.OUT)
    this.el.on("mousemove")
  }

  private onClick(): void {
    this.events.emit(Events.CHART.CLICK)
  }

  private onMouseMove(): void {
    const mouse: [number, number] = d3.mouse(this.el.node() as any)
    this.events.emit(Events.CHART.MOVE, {
      x: mouse[0] - this.margin("y1"),
      y: mouse[1] - this.margin("x2"),
    })
  }

  // Drawing container
  private renderDrawingContainer(): D3Selection {
    const drawingContainer = document.createElementNS(d3.namespaces["xhtml"], "div")
    this.chartContainer.node().appendChild(drawingContainer)
    return d3.select(drawingContainer).attr("class", styles.drawingContainer)
  }

  // Legends
  private renderLegends(): void {
    forEach(this.renderLegend.bind(this))(legends)
  }

  private renderLegend(options: { position: "top" | "bottom"; float: "left" | "right" }): void {
    const legendNode = document.createElementNS(d3.namespaces["xhtml"], "div")
    options.position === "top" ? this.insertLegend(legendNode) : this.appendLegend(legendNode)

    const legend = d3
      .select(legendNode)
      .attr("class", `${styles.legend} ${styles.legendTopBottom} ${options.float}`)
      .style("float", options.float)

    this.elMap[`legend-${options.position}-${options.float}`] = legend
  }

  private insertLegend(legendNode: Element): void {
    const ref = this.drawingContainer.node()
    ref.parentNode.insertBefore(legendNode, ref)
  }

  private appendLegend(legendNode: Element): void {
    this.chartContainer.node().appendChild(legendNode)
  }

  private legendHeight(position: "top" | "bottom", float: "left" | "right"): number {
    return get([position, float])(this.state.current.get("computed").series.dataForLegends)
      ? this.elementFor(`legend-${position}-${float}`).node().offsetHeight
      : 0
  }

  private totalLegendHeight(): number {
    const topLegendHeight = Math.max(this.legendHeight("top", "left"), this.legendHeight("top", "right"))
    const bottomLegendHeight = this.legendHeight("bottom", "left")
    return topLegendHeight + bottomLegendHeight
  }

  // El
  private renderEl(): D3Selection {
    const el = document.createElementNS(d3.namespaces["svg"], "svg")
    this.drawingContainer.node().appendChild(el)
    this.elMap.series = d3.select(el)
    return this.elMap.series
  }

  // Drawing group
  private renderDrawingGroup(): D3Selection {
    return this.el.append("svg:g").attr("class", "drawing")
  }

  private renderAxes(): void {
    forEach(
      (axis: string): void => {
        const axesGroup = this.drawingGroup.append("svg:g").attr("class", `${axis}-axes-group`)
        this.elMap[`${axis}Axes`] = axesGroup
      },
    )(axes)
  }

  private renderRules(): void {
    forEach(
      (axis: string): void => {
        const rulesGroup = this.drawingGroup.append("svg:g").attr("class", `${axis}-rules-group`)
        this.elMap[`${axis}Rules`] = rulesGroup
      },
    )(axes)
  }

  private renderSeriesDrawingGroups(): void {
    const series = this.drawingGroup.append("svg:g").attr("class", "series-drawings-group")
    reduce((memo: { [key: string]: D3Selection }, se: string[]) => {
      const renderer = se[0]
      const clip = se[1]
      memo[renderer] = series
        .append("svg:g")
        .attr("class", `series-${renderer}`)
        .attr("clip-path", `url(#${this.state.current.get("config").uid}_${clip})`)
      return memo
    }, {})(seriesElements)
  }

  // Focus elements
  private renderFocusElements(): void {
    this.elMap.focusGroup = this.renderFocusGroup()
    this.elMap.focus = this.renderFocusLabel()
    this.elMap.componentFocus = this.renderComponentFocus()
  }

  private renderFocusGroup(): D3Selection {
    return this.drawingGroup.append("svg:g").attr("class", localStyles.focusGroup)
  }

  private renderFocusLabel(): D3Selection {
    const focusEl = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", `${styles.focusLegend}`)
      .style("visibility", "hidden")
    this.drawingContainer.node().insertBefore(focusEl.node(), this.el.node())
    return focusEl
  }

  private renderComponentFocus(): D3Selection {
    const focusEl = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", "component-focus")
      .style("visibility", "hidden")
    const ref = this.chartContainer.node()
    ref.insertBefore(focusEl.node(), ref.nextSibling)
    return focusEl
  }

  // Clip paths
  private renderClipPaths(): void {
    this.el.append("defs")
    forEach(this.renderClipPath.bind(this))(["drawing", "yrules", "xyrules"])
  }

  private renderClipPath(clip: string): void {
    this.el
      .select("defs")
      .append("clipPath")
      .attr("class", `chart-clip-path ${clip}`)
      .append("rect")
  }

  private prefixedId(id: string): string {
    return this.state.current.get("config").uid + id
  }

  private margin(axis: AxisPosition): number {
    const margins = this.state.current.get("computed").axes.margins || {}
    return margins[axis] || 0
  }

  private calculateDrawingContainerDims(): Dimensions {
    const config = this.state.current.get("config")
    return {
      height: config.height - this.totalLegendHeight(),
      width: config.width,
    }
  }

  private calculateDrawingDims(): Dimensions {
    const drawingContainerDims = this.state.current.get("computed").canvas.drawingContainerDims
    return {
      width: drawingContainerDims.width - this.margin("y1") - this.margin("y2"),
      height: drawingContainerDims.height - this.margin("x1") - this.margin("x2"),
    }
  }

  private updateClipPaths(dims: Dimensions, drawingDims: Dimensions): void {
    this.el
      .select("defs")
      .select("clipPath.drawing")
      .attr("id", this.prefixedId("_drawing_clip"))
      .select("rect")
      .attr("width", drawingDims.width)
      .attr("height", drawingDims.height)

    this.el
      .select("defs")
      .select("clipPath.yrules")
      .attr("id", this.prefixedId("_yrules_clip"))
      .select("rect")
      .attr("width", dims.width)
      .attr("height", drawingDims.height)
      .attr("transform", `translate(${-this.margin("y1")}, 0)`)

    this.el
      .select("defs")
      .select("clipPath.xyrules")
      .attr("id", this.prefixedId("_xyrules_clip"))
      .select("rect")
      .attr("width", dims.width)
      .attr("height", dims.height)
      .attr("transform", `translate(${-this.margin("y1")}, ${-this.margin("x2")})`)
  }
}

export default ChartCanvas
