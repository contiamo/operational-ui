import AbstractFacade from "../utils/abstract_facade"
import DataHandler from "./data_handler"
import Canvas from "./canvas"
import Series from "./series"

class Facade extends AbstractFacade {
  dataHandler: DataHandler
  series: Series

  defaultConfig(): any {
    return {
      data: {},
      config: {
        width: 500,
        height: 1000,
        maxNodeSize: 1500,
        maxLinkWidth: 15,
        labelOffset: 5,
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

  initializeSeries(): void {
    this.series = new Series(this.state.readOnly(), this.state.writer(["series"]))
  }

  initializeComponents(): void {
    this.components = {
      canvas: new Canvas(this.state.readOnly(), this.state.writer(["canvas"]), this.context),
    }
  }

  draw(): Element {
    this.series.prepareData()
    this.components.canvas.draw()
    this.series.draw()
    this.drawn = true
    this.dirty = false
    return this.state.computed(["canvas", "el"]).node()
  }
}

export default Facade
