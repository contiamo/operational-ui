import { map, flow, groupBy, sortBy, forEach } from "lodash/fp"
import * as $ from "jquery"
import Layout from "./layout"
import Nodes from "./renderers/nodes"
import Links from "./renderers/links"
import { TNode, TState } from "./typings"

class Renderer {
  computed: any
  config: any
  layout: Layout
  links: Links
  nodes: Nodes
  state: TState

  constructor(state: TState) {
    this.state = state
    this.layout = new Layout(state)
    this.links = new Links(state)
    this.nodes = new Nodes(state)
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
      xValues: number[] = map((node: TNode): number => {
        return node.x
      })(this.layout.nodes),
      maxX: number = Math.max(...xValues),
      config: any = this.state.current.config,
      xGridSpacing: number = config.width / (maxX + 1),
      yGridSpacing: number = config.height / (rows.length + 1)

    // Assign y values
    forEach((node: TNode): void => {
      node.y = (node.y + 1) * yGridSpacing
    })(this.layout.nodes)
    forEach((row: string): void => {
      flow(
        sortBy((node: TNode): number => {
          return node.x
        }),
        forEach((node: TNode): void => {
          node.x *= xGridSpacing
        }),
      )(nodesByRow[parseInt(row, 10)])
    })(rows)
  }

  //@TODO check this
  close(): any {
    $(this.computed.el.node()).html("")
  }
}

export default Renderer
