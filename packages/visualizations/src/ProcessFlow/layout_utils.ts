import { flow, find, forEach, indexOf, reduce, filter, sortBy } from "lodash/fp"
import { TNode, TLink } from "./typings"

let LayoutUtils: any = {
  placeSingleSourceNodes: (nodesInRow: TNode[], nodePositions: number[]): void => {
    const singleSourceNodes: TNode[] = filter((node: TNode): boolean => node.targetLinks.length === 1)(nodesInRow)
    const placeNode = (used: number[], x: number, node: TNode): void => {
      if (find((val: number): boolean => val === x)(used)) {
        placeNode(used, x + 1, node)
      } else {
        node.x = x
        used.push(x)
      }
    }
    forEach((node: TNode): void => {
      let sourceNodePosition: number = node.targetLinks[0].source().x
      placeNode(nodePositions, sourceNodePosition, node)
    })(singleSourceNodes)
  },

  singleSourceAbove: (sourcePositions: number[]): any => {
    const sourceNodesAbove: any = (x: number): any => {
      return filter((position: number): boolean => position === x)(sourcePositions)
    }
    return (x: number): boolean => sourceNodesAbove(x).length === 1
  },

  // Check that there isn't a non-source node vertically between 2 linked nodes.
  isSourceDirectlyAbove: (node: TNode, nodes: TNode[]): (xValue: number) => boolean => {
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
  },

  xPositionAvailable: (nodePositions: number[]): (x: number) => boolean => {
    return (x: number): boolean => indexOf(x)(nodePositions) === -1
  },

  // Shift all nodes that have an x-value >= the given value to the right by one place
  shiftNodesToRight: (x: number): any => {
    return flow(
      filter((n: TNode): boolean => n.x >= x),
      forEach((n: TNode): void => { n.x += 1 }),
    )
  },

  // The mean source node position is calculated as a starting point for positioning the node
  calculateXPosition: (sourcePositions: number[], possiblePositions: number[]): { xPosition: number, newColumn: boolean } => {
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
}

export default LayoutUtils
