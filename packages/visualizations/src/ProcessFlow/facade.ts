import AbstractFacade from "../utils/abstract_facade"
import DataHandler from "./data_handler"
import Canvas from "./canvas"
import Renderer from "./renderer"

class Facade extends AbstractFacade {
  dataHandler: DataHandler

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

  initializeComponents(): void {
    this.components = {
      dataHandler: new DataHandler(),
      renderer: new Renderer(this.context),
    }
  }

  draw(): any {
    const accessors = {
      node: this.state.accessors("node"),
      link: this.state.accessors("link"),
    }
    let computed: any = this.components.dataHandler.prepareData(this.state.data(), accessors)
    this.components.renderer.setData(computed)
    this.components.renderer.setConfig(this.state.config())
    this.drawn = true
    this.dirty = false
    return this.components.renderer.draw(computed)
  }
}

export default Facade
