import AbstractFacade from "../utils/abstract_facade"
import DataHandler from "./data_handler"
import Canvas from "./canvas"
import Series from "./series"
import Focus from "./focus"

class Facade extends AbstractFacade {
  dataHandler: DataHandler
  series: Series
  canvas: Canvas

  defaultConfig(): any {
    return {
      data: {},
      config: {
        width: 500,
        height: 1000,
        maxNodeSize: 1500,
        maxLinkWidth: 15,
        labelOffset: 5,
        labelPadding: 5,
        linkStroke: "#aaa",
        visualizationName: "processflow",
        arrowFill: "#ccc",
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

  insertCanvas(): void {
    this.canvas = new Canvas(this.state.readOnly(), this.state.writer(["canvas"]), this.events, this.context)
  }

  initializeComponents(): void {
    this.components = {
      focus: new Focus(
        this.state.readOnly(),
        this.state.writer(["focus"]),
        this.events,
        this.canvas.elementFor("focus"),
      ),
    }
  }

  initializeSeries(): void {
    this.series = new Series(
      this.state.readOnly(),
      this.state.writer(["series"]),
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

export default Facade
