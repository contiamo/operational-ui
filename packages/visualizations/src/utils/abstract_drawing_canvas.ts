import AbstractCanvas from "./abstract_canvas"
import * as d3 from "d3-selection"
import { forEach, reduce, isArray } from "lodash/fp"

abstract class AbstractDrawingCanvas extends AbstractCanvas {
  drawingContainer: any

  insertEl(): void {
    this.drawingContainer = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", "drawing-container")
    this.container.node().appendChild(this.drawingContainer.node())
    // El inside drawing container
    this.el = this.createEl()
    this.drawingContainer.node().appendChild(this.el.node())
  }

  createInitialElements(): void {
    this.elements.defs = this.el.append("defs")
  }

  mouseOverElement(): any {
    return this.container
  }

  appendDrawingGroup(): void {
    this.elements.drawing = this.el.append("svg:g").attr("class", "drawing")
  }

  appendDrawingClip(): void {
    this.elements.defs
      .append("clipPath")
      .attr("class", "chart-clip-path")
      .attr("id", this.prefixedId("_xrules_group"))
      .append("rect")
  }

  appendYRulesClip(): void {
    this.elements.defs
      .append("clipPath")
      .attr("class", "chart-clip-path")
      .attr("id", this.prefixedId("_yrules_clip"))
      .append("rect")
  }

  appendBackground(): void {
    this.elements.background = this.el
      .append("rect")
      .attr("class", "chart-background")
      .attr("x", 0)
      .attr("y", 0)
  }

  appendRules(axes: string[]): void {
    forEach((axis: string): void => {
      this.elements[axis + "Rules"] = this.elements.drawing.append("svg:g").attr("class", axis + "-rules-group")
    })(axes)
  }

  appendAxes(axes: string[]): void {
    forEach((axis: string): void => {
      this.elements[axis + "Axes"] = this.elements.drawing.append("svg:g").attr("class", axis + "-axes-group")
    })(axes)
  }

  appendSeriesDrawingGroups(seriesElements: string[] | string[][]): void {
    let series: any = this.elements.drawing.append("svg:g").attr("class", "series-drawings-group")
    this.elements.series = reduce((memo: {}, se: string | string[]): any => {
      if (isArray(se)) {
        let renderer: string = se[0]
        let clip: string = se[1]
        memo[renderer] = series
          .append("svg:g")
          .attr("class", "series-" + renderer)
          .attr("clip-path", "url(#" + this.state.current.get("config").uid + "_" + clip + ")")
      } else {
        memo[se as any] = series.append("svg:g").attr("class", "series-" + se)
      }
      return memo
    }, {})(seriesElements)
  }

  appendFocus(): void {
    this.elements.focus = this.elements.drawing.append("svg:g").attr("class", "focus-group")
  }

  insertLegendBefore(element: any): void {
    let ref: Node = this.drawingContainer.node()
    ref.parentNode.insertBefore(element.node(), ref)
  }

  insertLegendAfter(element: any): void {
    let ref: Node = this.drawingContainer.node()
    ref.parentNode.insertBefore(element.node(), ref.nextSibling)
  }

  drawingContainerDims(): { height: number; width: number } {
    let legendDimensions: { height: number; width: number } = this.totalLegendDimensions()
    return {
      height: this.state.current.get("config").height - legendDimensions.height,
      width: this.state.current.get("config").width - legendDimensions.width,
    }
  }

  totalLegendDimensions(): { height: number; width: number } {
    // @TODO
    return {
      height: 50,
      width: 50,
    }
    // let legend: any = this.state.legend
    // return {
    //   height:
    //     legend && (legend.position === "top" || legend.position === "bottom") ? legend.dimensions().height + 1 : 0,
    //   width: legend && legend.position === "right" ? legend.dimensions().width + 1 : 0,
    // }
  }

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
    let duration: number = this.state.current.get("config").duration
    let drawingContainerDims: { width: number; height: number } = this.drawingContainerDims()

    this.drawingContainer
      .style("width", drawingContainerDims.width + "px")
      .style("height", drawingContainerDims.height + "px")
    this.el.style("width", drawingContainerDims.width + "px").style("height", drawingContainerDims.height + "px")
    this.elements.background
      .transition()
      .duration(duration)
      .ease("linear")
      .attr("width", drawingContainerDims.width)
      .attr("height", drawingContainerDims.height)
    this.elements.defs
      .select("#" + this.drawingClipDefinitionId() + " rect")
      .transition()
      .duration(duration)
      .ease("linear")
      .attr("width", this.state.current.get("conputed").canvas.drawingWidth)
      .attr("height", this.state.current.get("conputed").canvas.drawingHeight + 1)
    this.elements.defs
      .select("#" + this.yRulesDefinitionId() + " rect")
      .transition()
      .duration(duration)
      .ease("linear")
      .attr("width", drawingContainerDims.width)
      .attr("height", this.state.current.get("conputed").canvas.drawingHeight)
      .attr("transform", "translate(" + -this.state.current.get("config").margin.left + ", 0)")
    this.elements.drawing
      .transition()
      .duration(duration)
      .ease("linear")
      .attr("transform", "translate(" + this.state.current.get("config").drawingMargin.join(",") + ")")
  }

  resize(): void {
    this.draw()
  }

  remove(): void {
    super.remove()
    if (!this.drawingContainer) {
      return
    }
    $(this.drawingContainer.node()).off()
    this.drawingContainer.remove()
    this.drawingContainer = undefined
  }
}

export = AbstractDrawingCanvas
