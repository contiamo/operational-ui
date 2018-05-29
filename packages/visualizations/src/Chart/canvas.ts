import Events from "../utils/event_catalog"
import * as d3 from "d3-selection"
import {
  AxisPosition,
  Canvas,
  D3Selection,
  EventBus,
  Object,
  ChartConfig,
  MousePosition,
  SeriesEl,
  SeriesElements,
  State,
  StateWriter,
} from "./typings"
import * as styles from "../utils/styles"
import * as localStyles from "./styles"
import { forEach, reduce } from "lodash/fp"

const seriesElements: SeriesElements = [
  ["area", "drawing_clip"],
  ["bars", "drawing_clip"],
  ["flag", "xyrules_clip"],
  ["line", "drawing_clip"],
  ["symbol", "xyrules_clip"],
  ["text", "yrules_clip"],
]

const axes: string[] = ["y", "x"]

const legends: { position: "top" | "bottom"; float: "left" | "right" }[] = [
  { position: "top", float: "left" },
  { position: "top", float: "right" },
  { position: "bottom", float: "left" },
]

class ChartCanvas implements Canvas {
  private chartContainer: D3Selection
  private drawingContainer: D3Selection
  private el: SeriesEl
  private elements: Object<D3Selection> = {}
  private elMap: Object<D3Selection> = {}
  private events: EventBus
  private mousePosition: MousePosition
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
    this.renderDrawingGroup()
    this.renderAxes()
    this.renderRules()
    this.renderSeriesDrawingGroups()
    this.renderFocusElements()
    this.stateWriter("elements", this.elements)
    this.events.on("margins:update", (isXAxis: boolean): void => {
      this.draw()
      this.events.emit("margins:updated", isXAxis)
    })
  }

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
    const event: any = d3.event
    const mouse: [number, number] = d3.mouse(this.el.node() as any)
    this.mousePosition = {
      x: mouse[0] - this.margin("y1"),
      y: mouse[1] - this.margin("x2"),
    }
    this.events.emit(Events.CHART.MOVE, this.mousePosition)
  }

  // Legends
  private renderLegends(): void {
    forEach((options: any): void => {
      if (options.position === "top") {
        this.renderLegendBefore(options)
      } else {
        this.renderLegendAfter(options)
      }
    })(legends)
  }

  private renderLegendBefore(options: { position: "top" | "bottom"; float: "left" | "right" }): void {
    const legendNode: Element = document.createElementNS(d3.namespaces["xhtml"], "div")
    const ref: Node = this.drawingContainer.node()
    ref.parentNode.insertBefore(legendNode, ref)

    const legend: D3Selection = d3
      .select(legendNode)
      .attr("class", `${styles.legend} ${styles.legendTopBottom} ${options.float}`)
      .style("float", options.float)

    this.elMap[`legend-${options.position}-${options.float}`] = legend
  }

  private renderLegendAfter(options: { position: "top" | "bottom"; float: "left" | "right" }): void {
    const legendNode: Element = document.createElementNS(d3.namespaces["xhtml"], "div")
    this.chartContainer.node().appendChild(legendNode)

    const legend: D3Selection = d3
      .select(legendNode)
      .attr("class", `${styles.legend} ${styles.legendTopBottom} ${options.float}`)
      .style("float", options.float)

    this.elMap[`legend-${options.position}-${options.float}`] = legend
  }

  private legendHeight(position: "top" | "bottom", float: "left" | "right"): number {
    return this.state.current.get("computed").series.dataForLegends[position][float].length > 0
      ? this.elementFor(`legend-${position}-${float}`).node().offsetHeight
      : 0
  }

  private totalLegendHeight(): number {
    const topLegendHeight: number = Math.max(this.legendHeight("top", "left"), this.legendHeight("top", "right"))
    const bottomLegendHeight: number = this.legendHeight("bottom", "left")
    this.stateWriter("topLegendHeight", topLegendHeight)
    this.stateWriter("bottomLegendHeight", bottomLegendHeight)
    return topLegendHeight + bottomLegendHeight
  }

  // Drawing container
  private renderDrawingContainer(): D3Selection {
    const drawingContainer = document.createElementNS(d3.namespaces["xhtml"], "div")
    this.chartContainer.node().appendChild(drawingContainer)
    return d3.select(drawingContainer).attr("class", styles.drawingContainer)
  }

  // El
  private renderEl(): SeriesEl {
    const el: Element = document.createElementNS(d3.namespaces["svg"], "svg")
    this.drawingContainer.node().appendChild(el)
    this.elMap.series = d3.select(el)
    return this.elMap.series
  }

  // Drawing group
  private renderDrawingGroup(): void {
    this.elements.drawing = this.el.append("svg:g").attr("class", "drawing")
  }

  private renderAxes(): void {
    forEach((axis: string): void => {
      const axesGroup: D3Selection = this.elements.drawing.append("svg:g").attr("class", `${axis}-axes-group`)
      this.elements[`${axis}Axes`] = axesGroup
      this.elMap[`${axis}Axes`] = axesGroup
    })(axes)
  }

  private renderRules(): void {
    forEach((axis: string): void => {
      const rulesGroup: D3Selection = this.elements.drawing.append("svg:g").attr("class", `${axis}-rules-group`)
      this.elements[axis + "Rules"] = rulesGroup
      this.elMap[`${axis}Rules`] = rulesGroup
    })(axes)
  }

  private renderSeriesDrawingGroups(): void {
    const series: D3Selection = this.elements.drawing.append("svg:g").attr("class", "series-drawings-group")
    this.elements.series = reduce((memo: Object<D3Selection>, se: string[]): Object<D3Selection> => {
      const renderer: string = se[0]
      const clip: string = se[1]
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
    return this.elements.drawing.append("svg:g").attr("class", localStyles.focusGroup)
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
    const ref: Node = this.chartContainer.node()
    ref.insertBefore(focusEl.node(), ref.nextSibling)
    return focusEl
  }

  // Clip paths
  private renderClipPaths(): void {
    this.elements.defs = this.el.append("defs")
    forEach(this.renderClipPath.bind(this))(["drawing", "yrules", "xyrules"])
  }

  private renderClipPath(clip: string): void {
    this.elements.defs
      .append("clipPath")
      .attr("class", `chart-clip-path ${clip}`)
      .append("rect")
  }

  private prefixedId(id: string): string {
    return this.state.current.get("config").uid + id
  }

  private margin(axis: AxisPosition): number {
    const margins: Object<number> = this.state.current.get("computed").axes.margins || {}
    return margins[axis] || 0
  }

  private calculateDrawingContainerDims(): void {
    const config = this.state.current.get("config")
    this.stateWriter("drawingContainerDims", {
      height: config.height - this.totalLegendHeight(),
      width: config.width,
    })
  }

  private calculateDrawingDims(): void {
    const drawingContainerDims: { height: number; width: number } = this.state.current.get("computed").canvas
      .drawingContainerDims
    this.stateWriter("drawingDims", {
      width: drawingContainerDims.width - this.margin("y1") - this.margin("y2"),
      height: drawingContainerDims.height - this.margin("x1") - this.margin("x2"),
    })
  }

  private updateClipPaths() {
    // Set clip path ids
    const dims: { width: number; height: number } = this.state.current.get("computed").canvas.drawingContainerDims
    const drawingDims: { width: number; height: number } = this.state.current.get("computed").canvas.drawingDims

    this.elements.defs
      .select("clipPath.drawing")
      .attr("id", this.prefixedId("_drawing_clip"))
      .select("rect")
      .attr("width", drawingDims.width)
      .attr("height", drawingDims.height)

    this.elements.defs
      .select("clipPath.yrules")
      .attr("id", this.prefixedId("_yrules_clip"))
      .select("rect")
      .attr("width", dims.width)
      .attr("height", drawingDims.height)
      .attr("transform", `translate(${-this.margin("y1")}, 0)`)

    this.elements.defs
      .select("clipPath.xyrules")
      .attr("id", this.prefixedId("_xyrules_clip"))
      .select("rect")
      .attr("width", dims.width)
      .attr("height", dims.height)
      .attr("transform", `translate(${-this.margin("y1")}, ${-this.margin("x2")})`)
  }

  // Lifecycle
  draw(): void {
    this.calculateDrawingContainerDims()

    // Set classes
    this.chartContainer.attr("class", `${styles.chartContainer} ${this.state.current.get("config").uid}`)
    this.chartContainer.classed("hidden", this.state.current.get("config").hidden)

    this.stateWriter(["containerRect"], this.chartContainer.node().getBoundingClientRect())

    const config: ChartConfig = this.state.current.get("config")
    const dims: { width: number; height: number } = this.state.current.get("computed").canvas.drawingContainerDims

    this.chartContainer.style("width", `${config.width}px`).style("height", `${config.height}px`)
    this.drawingContainer.style("width", `${dims.width}px`).style("height", `${dims.height}px`)
    this.el.style("width", `${dims.width}px`).style("height", `${dims.height}px`)

    this.elements.drawing.attr("transform", `translate(${this.margin("y1")}, ${this.margin("x2")})`)
    this.stateWriter("drawingContainerRect", this.drawingContainer.node().getBoundingClientRect())

    this.calculateDrawingDims()
    this.updateClipPaths()
    this.el.on("mousemove", this.onMouseMove.bind(this))
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
  elementFor(component: string): D3Selection {
    return this.elMap[component]
  }
}

export default ChartCanvas
