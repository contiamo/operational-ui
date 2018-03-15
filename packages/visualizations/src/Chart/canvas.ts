import Events from "../utils/event_catalog"
import * as d3 from "d3-selection"
import {
  Canvas,
  D3Selection,
  EventBus,
  Object,
  ChartConfig,
  SeriesEl,
  SeriesElements,
  State,
  StateWriter
} from "./typings"
import * as styles from "../utils/styles"
import { forEach, reduce } from "lodash/fp"

const seriesElements: SeriesElements = [
  ["area", "drawing_clip"],
  ["bars", "drawing_clip"],
  ["flag", "yrules_clip"],
  ["line", "drawing_clip"],
  ["range", "drawing_clip"],
  ["symbol", "drawing_clip"],
  ["text", "yrules_clip"]
]

const axes: string[] = ["y", "x"]

const legends: { position: "top" | "bottom"; float: "left" | "right" }[] = [
  { position: "top", float: "left" },
  { position: "top", float: "right" },
  { position: "bottom", float: "left" }
]

class ChartCanvas implements Canvas {
  private chartContainer: D3Selection
  private drawingContainer: D3Selection
  private el: SeriesEl
  private elements: Object<D3Selection> = {}
  private elMap: Object<D3Selection> = {}
  private events: EventBus
  private mousePosition: { absolute: { x: number; y: number }; relative: { x: number; y: number } }
  private state: State
  private stateWriter: StateWriter

  constructor(state: State, stateWriter: StateWriter, events: EventBus, context: Element) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.chartContainer = this.insertChartContainer(context)
    this.drawingContainer = this.insertDrawingContainer()
    this.insertLegends()
    this.el = this.insertEl()
    this.insertClipPaths()
    this.insertDrawingGroup()
    this.insertRules()
    this.insertAxes()
    this.insertSeriesDrawingGroups()
    this.insertFocusElements()
    this.stateWriter("elements", this.elements)
  }

  // Chart container
  private insertChartContainer(context: Element): D3Selection {
    const container = document.createElementNS(d3.namespaces["xhtml"], "div")
    context.appendChild(container)
    container.addEventListener("mouseenter", this.onMouseEnter.bind(this))
    container.addEventListener("mouseleave", this.onMouseLeave.bind(this))
    container.addEventListener("click", this.onClick.bind(this))
    return d3.select(container).attr("class", styles.chartContainer)
  }

  private onMouseEnter(): void {
    this.events.emit(Events.CHART.MOUSEOVER)
  }

  private onMouseLeave(): void {
    this.events.emit(Events.CHART.MOUSEOUT)
  }

  private onClick(): void {
    this.events.emit(Events.CHART.CLICK)
  }

  // Legends
  private insertLegends(): void {
    forEach((options: any): void => {
      if (options.position === "top") {
        this.insertLegendBefore(options)
      } else {
        this.insertLegendAfter(options)
      }
    })(legends)
  }

  private insertLegendBefore(options: { position: "top" | "bottom"; float: "left" | "right" }): void {
    const legendNode: Element = document.createElementNS(d3.namespaces["xhtml"], "div")
    const ref: Node = this.drawingContainer.node()
    ref.parentNode.insertBefore(legendNode, ref)

    const legend: D3Selection = d3
      .select(legendNode)
      .attr("class", `${styles.legend} ${styles.legendTopBottom} ${options.float}`)
      .style("float", options.float)

    this.elMap[`legend-${options.position}-${options.float}`] = legend
  }

  private insertLegendAfter(options: { position: "top" | "bottom"; float: "left" | "right" }): void {
    const legendNode: Element = document.createElementNS(d3.namespaces["xhtml"], "div")
    this.chartContainer.node().appendChild(legendNode)

    const legend: D3Selection = d3
      .select(legendNode)
      .attr("class", `${styles.legend} ${styles.legendTopBottom} ${options.float}`)
      .style("float", options.float)

    this.elMap[`legend-${options.position}-${options.float}`] = legend
  }

  private totalLegendHeight(): number {
    const topLegendHeight: number = Math.max(
      this.elementFor("legend-top-left").node().offsetHeight,
      this.elementFor("legend-top-right").node().offsetHeight
    )
    return topLegendHeight + this.elementFor("legend-bottom-left").node().offsetHeight
  }

  // Drawing container
  private insertDrawingContainer(): D3Selection {
    const drawingContainer = document.createElementNS(d3.namespaces["xhtml"], "div")
    this.chartContainer.node().appendChild(drawingContainer)
    return d3.select(drawingContainer).attr("class", styles.drawingContainer)
  }

  // El
  private insertEl(): SeriesEl {
    const el: Element = document.createElementNS(d3.namespaces["svg"], "svg")
    this.drawingContainer.node().appendChild(el)
    this.elMap.series = d3.select(el)
    return this.elMap.series
  }

  // Drawing group
  private insertDrawingGroup(): void {
    this.elements.drawing = this.el.append("svg:g").attr("class", "drawing")
  }

  private insertRules(): void {
    forEach((axis: string): void => {
      this.elements[axis + "Rules"] = this.elements.drawing.append("svg:g").attr("class", axis + "-rules-group")
    })(axes)
  }

  private insertAxes(): void {
    forEach((axis: string): void => {
      this.elements[axis + "Axes"] = this.elements.drawing.append("svg:g").attr("class", axis + "-axes-group")
    })(axes)
  }

  private insertSeriesDrawingGroups(): void {
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
  private insertFocusElements(): void {
    this.elMap.focus = this.insertFocusLabel()
    this.elMap.componentFocus = this.insertComponentFocus()
  }

  private insertFocusLabel(): D3Selection {
    const focusEl = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", `${styles.focusLegend}`)
      .style("visibility", "hidden")
    this.chartContainer.node().appendChild(focusEl.node())
    return focusEl
  }

  private insertComponentFocus(): D3Selection {
    const focusEl = d3.select(document.createElementNS(d3.namespaces["xhtml"], "div")).attr("class", "component-focus")
    const ref: Node = this.chartContainer.node()
    ref.insertBefore(focusEl.node(), ref.nextSibling)
    return focusEl
  }

  // Clip paths
  private insertClipPaths(): void {
    this.elements.defs = this.el.append("defs")
    this.insertDrawingClip()
    this.insertYRulesClip()
  }

  private insertDrawingClip(): void {
    this.elements.defs
      .append("clipPath")
      .attr("class", "chart-clip-path")
      .attr("id", this.prefixedId("_xrules_group"))
      .append("rect")
  }

  private insertYRulesClip(): void {
    this.elements.defs
      .append("clipPath")
      .attr("class", "chart-clip-path")
      .attr("id", this.prefixedId("_yrules_clip"))
      .append("rect")
  }

  private prefixedId(id: string): string {
    return this.state.current.get("config").uid + id
  }

  private drawingContainerDims(): { height: number; width: number } {
    const config = this.state.current.get("config")
    const dims = {
      height: config.height - this.totalLegendHeight(),
      width: config.width
    }
    this.stateWriter("drawingContainerDims", dims)
    return dims
  }

  // Lifecycle
  draw(): void {
    this.chartContainer.classed("hidden", this.state.current.get("config").hidden)
    this.stateWriter(["containerRect"], this.chartContainer.node().getBoundingClientRect())

    const config: ChartConfig = this.state.current.get("config")
    const dims: { width: number; height: number } = this.drawingContainerDims()

    this.chartContainer.style("width", `${config.width}px`).style("height", `${config.height}px`)
    this.drawingContainer.style("width", `${dims.width}px`).style("height", `${dims.height}px`)
    this.el.style("width", `${dims.width}px`).style("height", `${dims.height}px`)
    this.stateWriter("drawingContainerRect", this.drawingContainer.node().getBoundingClientRect())
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
