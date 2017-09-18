import AbstractChart from "../utils/abstract_chart"
import EventHandler from "../utils/event_handler"
import StateHandler from "../utils/state_handler"
import DataHandler from "./data_handler"
import Canvas from "./canvas"
import { TInputData } from "./typings"
import Renderer from "./renderer"
import { forEach } from "lodash/fp"

class Facade extends AbstractChart {
  dataHandler: DataHandler

  constructor(context: any) {
    super(context)
    this.events = new EventHandler()
    this.state = new StateHandler({
      data: {},
      config: {
        width: 500,
        height: 1000,
        maxNodeSize: 1500,
        maxLinkWidth: 15,
        labelOffset: 5,
        linkStroke: "#aaa",
        arrowFill: "#ccc"
      },
      accessors: {
        journeys: {
          data: (d: any) => d.journeys
        },
        nodes: {
          data: (d: any) => d.nodes,
          color: (d: any) => d.color
        }
      },
      computed: {}
    })

    this.components = {
      dataHandler: new DataHandler(),
      renderer: new Renderer(this.context)
    }
  }

  data(data?: TInputData) {
    return this.state.data(data)
  }

  config(config?: Object) {
    return this.state.config(config)
  }

  accessors(type: string, accessors: Object) {
    return this.state.accessors(type, accessors)
  }

  draw() {
    // @TODO only update if something has changed?
    const accessors = {
      node: this.state.accessors("node"),
      link: this.state.accessors("link")
    }
    let computed: any = this.components.dataHandler.prepareData(this.state.data(), accessors)
    this.components.renderer.setData(computed)
    this.components.renderer.setConfig(this.state.config())
    return this.components.renderer.draw(computed)
  }

  on(event: string, handler: any) {
    this.events.on(event, handler)
  }

  off(event: string, handler: any) {
    this.events.off(event, handler)
  }
}

export default Facade
