import { map, flow, groupBy, sortBy, forEach } from "lodash/fp"
import * as d3 from "d3-selection"
import * as $ from "jquery"
import "d3-transition"
import { scaleLinear as d3ScaleLinear } from "d3-scale"
import { symbol as d3Symbol, symbolDiamond, symbolSquare, symbolCircle } from "d3-shape"
import Layout from "./layout"
import DataHandler from "./data_handler"
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
      xValues: number[] = map(function(node: TNode): number {
        return node.x
      })(this.layout.nodes),
      maxX: number = Math.max(...xValues),
      config: any = this.state.config(),
      xGridSpacing: number = config.width / (maxX + 1),
      yGridSpacing: number = config.height / (rows.length + 1)

    // Assign y values
    forEach(function(node: TNode): void {
      node.y = (node.y + 1) * yGridSpacing
    })(this.layout.nodes)
    forEach(function(row: string): void {
      flow(
        sortBy(function(node: TNode): number {
          return node.x
        }),
        forEach(function(node: TNode): void {
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
