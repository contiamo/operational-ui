import { map, flow, find, forEach, indexOf, reduce, filter, sortBy, uniq, bind } from "lodash/fp"
import { TNode, TLink, IState, IData } from "./typings"

const placeNode = (used: number[], x: number, node: TNode): void => {
  if (find((val: number): boolean => val === x)(used)) {
    placeNode(used, x + 1, node)
  } else {
    node.x = x
    used.push(x)
  }
}

const placeSingleSourceNodes = (nodesInRow: TNode[], nodePositions: number[]): void => {
  const singleSourceNodes: TNode[] = filter((node: TNode): boolean => node.targetLinks.length === 1)(nodesInRow)
  forEach((node: TNode): void => {
    let sourceNodePosition: number = node.targetLinks[0].source().x
    placeNode(nodePositions, sourceNodePosition, node)
  })(singleSourceNodes)
}

const singleSourceAbove = (sourcePositions: number[]): any => {
  const sourceNodesAbove: any = (x: number): any => {
    return filter((position: number): boolean => position === x)(sourcePositions)
  }
  return (x: number): boolean => sourceNodesAbove(x).length === 1
}

// Check that there isn't a non-source node vertically between 2 linked nodes.
const isSourceDirectlyAbove = (node: TNode, nodes: TNode[]): (xValue: number) => boolean => {
  return (xValue: number): boolean => {
    const findSourceNodeAtX: any = find((link: TLink): boolean => link.source().x === xValue)
    const maxYVal: any = flow(
      filter((n: TNode): boolean => n.x === xValue),
      reduce((max: number, n: TNode): number => {
        return Math.max(max, n.y)
      }, 0),
    )(nodes)
    return maxYVal === findSourceNodeAtX(node.targetLinks).source().y
  }
}

const xPositionAvailable = (nodePositions: number[]): (x: number) => boolean => {
  return (x: number): boolean => indexOf(x)(nodePositions) === -1
}

// Shift all nodes that have an x-value >= the given value to the right by one place
const shiftNodesToRight = (x: number): any => {
  return flow(
    filter((n: TNode): boolean => n.x >= x),
    forEach((n: TNode): void => { n.x += 1 }),
  )
}

// The mean source node position is calculated as a starting point for positioning the node
const calculateXPosition = (sourcePositions: number[], possiblePositions: number[]): { xPosition: number, newColumn: boolean } => {
  let newColumn: boolean = false
  const sourcePositionsSum: number = reduce((sum: number, val: number): number => {
    return sum + val
  }, 0)(sourcePositions)
  const meanSourcePosition: number = sourcePositionsSum / sourcePositions.length
  let xPosition: number
  if (possiblePositions.length > 0) {
    possiblePositions = sortBy((x: number): number => Math.abs(x - meanSourcePosition))(possiblePositions)
    xPosition = possiblePositions[0]
  } else {
    xPosition = Math.round(meanSourcePosition)
    // Shift nodes to the right by one place to make space for new node column
    newColumn = true
  }
  return { xPosition, newColumn }
}

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
        filter(singleSourceAbove(sourcePositions)),
        // 2) there cannot be another (non-source) node in between the node and the source node above
        filter(isSourceDirectlyAbove(node, this.nodes)),
        // 3) there can't already be another node on the same row in that position
        filter(xPositionAvailable(nodePositions)),
      )(sourcePositions)

      const calculated: { xPosition: number, newColumn: boolean } = calculateXPosition(sourcePositions, possiblePositions)
      if (calculated.newColumn) {
        shiftNodesToRight(calculated.xPosition)(this.nodes)
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
        placeSingleSourceNodes(nodesInRow, nodePositions)
        // If there are more than 1 incoming links, calculate optimal x position for node,
        //  and move other nodes as required.
        this.placeMultipleSourceNodes(nodesInRow, nodePositions)
      }
    })(rows)
  }
}

export default Layout
