import Nodes from "./renderers/nodes"
import Links from "./renderers/links"
import { IState, IEvents, TSeriesEl, IData } from "./typings"

class Renderer {
  links: Links
  nodes: Nodes
  state: IState
  el: TSeriesEl

  constructor(state: IState, events: IEvents, el: TSeriesEl) {
    this.el = el
    this.links = new Links(state, events, el)
    this.nodes = new Nodes(state, events, el)
  }

  draw(data: IData): void {
    this.links.draw(data.links)
    this.nodes.draw(data.nodes)
  }

  close(): void {
    this.el.node().innerHTML = ""
  }
}

export default Renderer
