import Canvas from "./canvas"
import * as d3 from "d3-selection"
import { forEach, isArray, reduce } from "lodash/fp"
import { IEvents, IObject, IState, TD3Selection, TSeriesEl, TStateWriter } from "./typings"
import * as styles from "./styles"

abstract class DrawingCanvas extends Canvas {
  drawingContainer: TD3Selection
  protected elements: IObject = {}
  protected legendMap: IObject = {}

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element) {
    super(state, stateWriter, events, context)
    this.elements.defs = this.el.append("defs")
  }

  insertEl(): TSeriesEl {
    const el: TSeriesEl = this.createEl()
    this.drawingContainer = this.insertDrawingContainer()
    this.drawingContainer.node().appendChild(el.node())
    this.elMap.series = el
    return el
  }

  insertDrawingContainer(): TD3Selection {
    const drawingContainer = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", styles.drawingContainer)
    this.container.node().appendChild(drawingContainer.node())
    return drawingContainer
  }

  mouseOverElement(): TD3Selection {
    return this.container
  }

  prefixedId(id: string): string {
    return this.state.current.get("config").uid + id
  }

  appendDrawingGroup(): void {
    this.elements.drawing = this.el.append("svg:g").attr("class", "drawing")
  }

  appendDrawingClip(): void {
    this.elements.defs
      .append("clipPath")
      .attr("class", "chart-clip-path")
      .attr("id", this.drawingClipDefinitionId())
      .append("rect")
  }

  appendYRulesClip(): void {
    this.elements.defs
      .append("clipPath")
      .attr("class", "chart-clip-path")
      .attr("id", this.yRulesDefinitionId())
      .append("rect")
  }

  appendBackground(): void {
    this.elements.background = this.el
      .append("rect")
      .attr("class", styles.chartBackground)
      .attr("x", 0)
      .attr("y", 0)
  }

  appendRules(axes: string[], axesMap: IObject): void {
    forEach((axis: string): void => {
      axesMap[axis + "Rules"] = this.elements.drawing.append("svg:g").attr("class", axis + "-rules-group")
    })(axes)
  }

  appendAxes(axes: string[], axesMap: IObject): void {
    forEach((axis: string): void => {
      axesMap[axis + "Axes"] = this.elements.drawing.append("svg:g").attr("class", axis + "-axes-group")
    })(axes)
  }

  appendSeriesDrawingGroups(seriesElements: string[] | string[][]): void {
    let series: TD3Selection = this.elements.drawing.append("svg:g").attr("class", "series-drawings-group")
    this.elements.series = reduce((memo: IObject, se: string | string[]): IObject => {
      if (isArray(se)) {
        let renderer: string = se[0]
        let clip: string = se[1]
        memo[renderer] = series
          .append("svg:g")
          .attr("class", "series-" + renderer)
          .attr("clip-path", "url(#" + this.prefixedId(`_${clip}`) + ")")
      } else {
        memo[se as string] = series.append("svg:g").attr("class", "series-" + se)
      }
      return memo
    }, {})(seriesElements)
  }

  insertLegend(position: string, float: string): void {
    const legendPositionClass: string = ["top", "bottom"].indexOf(position) > -1 ? styles.legendTopBottom : ""
    let legend: TD3Selection = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", `${styles.legend} ${legendPositionClass} ${float}`)
      .style("float", float)

    position === "bottom" ? this.insertLegendAfter(legend) : this.insertLegendBefore(legend)

    // @TODO why is this line necessary??
    this.legendMap = this.legendMap || {}
    this.legendMap[position] = this.legendMap[position] || {}
    this.legendMap[position][float] = legend
    this.elMap.legends = this.legendMap
    this.stateWriter("legends", this.legendMap)
  }

  insertLegendBefore(element: TD3Selection): void {
    let ref: Node = this.drawingContainer.node()
    ref.parentNode.insertBefore(element.node(), ref)
  }

  insertLegendAfter(element: TD3Selection): void {
    let ref: Node = this.drawingContainer.node()
    ref.parentNode.insertBefore(element.node(), ref.nextSibling)
  }

  drawingContainerDims(): { height: number; width: number } {
    const config = this.state.current.get("config"),
      legendHeight: number = this.totalLegendHeight(),
      dims = {
        height: config.height - legendHeight,
        width: config.width
      }
    this.stateWriter("drawingContainerDims", dims)
    return dims
  }

  abstract totalLegendHeight(): number

  drawingClipDefinitionId(): string {
    return this.prefixedId("_drawing_clip")
  }

  yRulesDefinitionId(): string {
    return this.prefixedId("_yrules_clip")
  }

  shadowDefinitionId(): string {
    return this.prefixedId("_shadow")
  }

  draw(): void {
    super.draw()
    let config: IObject = this.state.current.get("config")
    let drawingContainerDims: { width: number; height: number } = this.drawingContainerDims()

    this.container.style("width", config.width + "px").style("height", config.height + "px")
    this.drawingContainer
      .style("width", drawingContainerDims.width + "px")
      .style("height", drawingContainerDims.height + "px")
    this.el.style("width", drawingContainerDims.width + "px").style("height", drawingContainerDims.height + "px")
    this.elements.background.attr("width", drawingContainerDims.width).attr("height", drawingContainerDims.height)
  }

  resize(): void {
    this.draw()
  }

  remove(): void {
    super.remove()
    this.elements = {}
    if (!this.drawingContainer) {
      return
    }
    this.drawingContainer.remove()
    this.drawingContainer = undefined
  }
}

export default DrawingCanvas
