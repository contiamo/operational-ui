import { map, flow, groupBy, sortBy, forEach } from "lodash/fp"
import Layout from "./layout"
import Nodes from "./renderers/nodes"
import Links from "./renderers/links"
import { TNode, TState, TEvents, IConfig, TSeriesEl } from "./typings"

class Renderer {
  layout: Layout
  links: Links
  nodes: Nodes
  state: TState
  el: TSeriesEl

  constructor(state: TState, events: TEvents, el: TSeriesEl) {
    this.state = state
    this.el = el
    this.layout = new Layout(state)
    this.links = new Links(state, events, el)
    this.nodes = new Nodes(state, events, el)
  }

  draw(): void {
    this.layout.computeLayout()
    this.positionNodes()
    this.links.draw(this.layout.links)
    this.nodes.draw(this.layout.nodes)
  }

  positionNodes(): void {
    let nodesByRow: {}[] = groupBy("y")(this.layout.nodes)
    const rows: string[] = Object.keys(nodesByRow),
      xValues: number[] = map((node: TNode): number => node.x)(this.layout.nodes),
      maxX: number = Math.max(...xValues),
      config: IConfig = this.state.current.get("config"),
      xGridSpacing: number = config.width / (maxX + 1),
      yGridSpacing: number = config.height / (rows.length + 1)

    // Assign y values
    forEach((node: TNode): void => {
      node.y = (node.y + 1) * yGridSpacing
    })(this.layout.nodes)
    forEach((row: string): void => {
      flow(
        sortBy((node: TNode): number => node.x),
        forEach((node: TNode): void => {
          node.x *= xGridSpacing
        }),
      )(nodesByRow[parseInt(row, 10)])
    })(rows)
  }

  close(): any {
    this.el.node().innerHTML = ""
  }
}

export default Renderer
