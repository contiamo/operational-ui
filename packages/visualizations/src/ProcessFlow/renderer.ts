import { map, flow, groupBy, sortBy, forEach } from "lodash/fp"
import * as d3 from "d3-selection"
import * as $ from "jquery"
import "d3-transition"
import { scaleLinear as d3ScaleLinear } from "d3-scale"
import { symbol as d3Symbol, symbolDiamond, symbolSquare, symbolCircle } from "d3-shape"
import Layout from "./layout"
import DataHandler from "./data_handler"
import { TNode, TLink, TInputData, TProps } from "./typings"
import Nodes from "./renderers/nodes"
import Links from "./renderers/links"

class Renderer {
  computed: any
  config: any
  dataHandler: DataHandler
  layout: Layout
  nodes: Nodes
  links: Links

  constructor() {
    this.layout = new Layout()
    this.links = new Links()
    this.nodes = new Nodes()
  }

  draw(computed: any, config: any): void {
    this.computed = computed
    this.config = config
    this.layout.computeLayout(computed.data)
    this.positionNodes()
    this.links.draw(computed.svg, config, this.layout.links)
    this.nodes.draw(computed.svg, config, this.layout.nodes)
  }

  positionNodes(): void {
    let nodesByRow: {}[] = groupBy("y")(this.layout.nodes)
    const rows: string[] = Object.keys(nodesByRow),
      xValues: number[] = map(function(node: TNode): number {
        return node.x
      })(this.layout.nodes),
      maxX: number = Math.max(...xValues),
      xGridSpacing: number = this.config.width / (maxX + 1),
      yGridSpacing: number = this.config.height / (rows.length + 1)

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
