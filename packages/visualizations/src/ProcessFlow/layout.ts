import { map, flow, find, forEach, indexOf, reduce, filter, sortBy, uniq, bind } from "lodash/fp"
import { TNode, TLink, IState, IData } from "./typings"
import Utils from "./layout_utils"

class Layout {
  nodes: TNode[]
  state: IState

  constructor(state: IState) {
    this.state = state
  }

  computeLayout(nodes: TNode[]): void {
    const data: IData = this.state.current.get("computed").series.data
    this.nodes = nodes
    this.computeNodeYPositions()
    this.computeNodeXPositions()
  }

  // Nodes are assigned the maximum vertical position of incoming neighbors plus one;
  // nodes with no incoming links are considered start nodes.
  computeNodeYPositions(): void {
    let nextNodes: TNode[]
    let i: number = 0
    const assignNextNodes = (nodes: TNode[]): void => {
      nextNodes = []
      forEach((node: TNode): void => {
        node.y = i
        forEach((link: TLink): void => {
          if (indexOf(link.target())(nextNodes) < 0) {
            nextNodes.push(link.target())
          }
        })(node.sourceLinks)
      })(nodes)
      if (nextNodes.length > 0 && i < this.nodes.length) {
        if (nodes.length === nextNodes.length) {
          throw new Error('The data contains at least one loop. Handle loops before rendering, by passing the journeys through the ProcessFlowLoopHandler from the "contiamo-visualizations" package.')
        }
        ++i
        assignNextNodes(nextNodes)
      }
    }
    assignNextNodes(this.nodes)
  }

  placeMultipleSourceNodes(nodesInRow: TNode[], nodePositions: number[]): void {
    const multipleSourceNodes: TNode[] = filter((node: TNode): boolean => node.targetLinks.length > 1)(nodesInRow)
    forEach((node: TNode): void => {
      const sourcePositions: number[] = map((link: TLink): number => link.source().x)(node.targetLinks)
      // A node should be placed directly under a source node if possible:
      // Calculate possible node x positions that satisfy the following conditions
      let possiblePositions = flow(
        // 1) there can only be one source node directly above
        filter(Utils.singleSourceAbove(sourcePositions)),
        // 2) there cannot be another (non-source) node in between the node and the source node above
        filter(Utils.isSourceDirectlyAbove(node, this.nodes)),
        // 3) there can't already be another node on the same row in that position
        filter(Utils.xPositionAvailable(nodePositions)),
      )(sourcePositions)

      const calculated: { xPosition: number, newColumn: boolean } = Utils.calculateXPosition(sourcePositions, possiblePositions)
      if (calculated.newColumn) {
        Utils.shiftNodesToRight(calculated.xPosition)(this.nodes)
      }
      node.x = calculated.xPosition
      nodePositions.push(calculated.xPosition)
    })(multipleSourceNodes)
  }

  computeNodeXPositions(): void {
    const rows: number[] = uniq(sortBy((y: number): number => y)(map((node: TNode): number => node.y)(this.nodes)))

    forEach((row: number): void => {
      var nodesInRow: TNode[] = filter((node: TNode): boolean => node.y === row)(this.nodes)
      if (row === 0) {
        // For the top row, spread nodes out equally
        forEach.convert({ cap: false })((node: TNode, i: number): void => {
          node.x = i + 1
        })(nodesInRow)
      } else {
        let nodePositions: number[] = []
        // Place nodes with only one incoming link directly below their source node, if possible.
        Utils.placeSingleSourceNodes(nodesInRow, nodePositions)
        // If there are more than 1 incoming links, calculate optimal x position for node,
        //  and move other nodes as required.
        this.placeMultipleSourceNodes(nodesInRow, nodePositions)
      }
    })(rows)
  }
}

export default Layout
