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
    }
  }

  initializeSeries(): void {
    this.series = new Series()
  }

  initializeComponents(): void {
    this.components = {
      canvas: new Canvas(this.context, this.state.state),
    }
  }

  draw(): HTMLElement {
    const accessors = {
      node: this.state.accessors("node"),
      link: this.state.accessors("link"),
    }
    let computed: any = {}
    this.series.setData(computed, this.state.data(), accessors)
    this.components.canvas.draw(computed)
    this.series.draw(computed, this.state.config())
    this.drawn = true
    this.dirty = false
    return computed.el.node()
  }
}

export default Facade
