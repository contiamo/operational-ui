import AbstractFacade from "../utils/abstract_facade"
import DataHandler from "./data_handler"
import Canvas from "./canvas"
import Renderer from "./renderer"
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
      computed: {},
    }
  }

  initializeSeries(): void {
    this.series = new Series(this.state)
  }

  initializeComponents(): void {
    this.components = {
      canvas: new Canvas(this.state, this.context),
    }
  }

  draw(): Element {
    this.series.prepareData()
    this.components.canvas.draw()
    this.series.draw()
    this.drawn = true
    this.dirty = false
    return this.state.computed("el").node()
  }
}

export default Facade
