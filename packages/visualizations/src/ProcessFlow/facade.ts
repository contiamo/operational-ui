import AbstractFacade from "../utils/abstract_facade"
import Canvas from "./canvas"
import Series from "./series"
import Focus from "./focus"
import { uniqueId } from "lodash/fp"

class ProcessFlow extends AbstractFacade {
  series: Series
  canvas: Canvas

  defaultConfig(): any {
    return {
      data: {},
      config: {
        duration: 1e3,
        width: 500,
        height: 1000,
        maxNodeSize: 1500,
        maxLinkWidth: 8,
        minNodeSize: 100,
        minLinkWidth: 1,
        labelOffset: 5,
        labelPadding: 5,
        linkStroke: "#aaa",
        visualizationName: this.visualizationName(),
        uid: uniqueId(this.visualizationName()),
        showNodeFocusLabels: true,
        showLinkFocusLabels: true,
      },
      accessors: {
        journeys: {
          data: (d: any) => d.journeys,
        },
        nodes: {
          data: (d: any) => d.nodes,
          color: (d: any) => d.color,
        },
      },
      computed: {
        series: {},
        canvas: {},
      },
    }
  }

  visualizationName(): string {
    return "processflow"
  }

  insertCanvas(): void {
    this.canvas = new Canvas(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context)
  }

  initializeComponents(): void {
    this.components = {
      focus: new Focus(
        this.state.readOnly(),
        this.state.computedWriter(["focus"]),
        this.events,
        this.canvas.elementFor("focus"),
      ),
    }
  }

  initializeSeries(): void {
    this.series = new Series(
      this.state.readOnly(),
      this.state.computedWriter(["series"]),
      this.events,
      this.canvas.elementFor("series"),
    )
  }

  draw(): Element {
    this.series.prepareData()
    this.canvas.draw()
    this.series.draw()
    this.drawn = true
    this.dirty = false
    return this.canvas.elementFor("series").node()
  }
}

export default ProcessFlow
