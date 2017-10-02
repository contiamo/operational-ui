import { map, flow, find, forEach, indexOf, reduce, filter, sortBy, uniq, bind } from "lodash/fp"
import { TNode, TLink, TState } from "./typings"

class Layout {
  nodes: TNode[]
  links: TLink[]
  state: TState

  constructor(state: TState) {
    this.state = state
  }

  computeLayout(): void {
    const data = this.state.current.get("computed").series.data
    this.nodes = data.nodes
    this.links = data.links
    this.computeNodeYPositions()
    this.computeNodeXPositions()
  }

  // Nodes are assigned the maximum vertical position of incoming neighbors plus one;
  // nodes with no incoming links are considered start nodes.
  computeNodeYPositions(): void {
    let nextNodes: TNode[]
    let i: number = 0
    const that: Layout = this
    function assignNextNodes(nodes: TNode[]): void {
      nextNodes = []
      forEach((node: TNode): void => {
        node.y = i
        forEach((link: TLink): void => {
          if (indexOf(link.target())(nextNodes) < 0) {
            nextNodes.push(link.target())
          }
        })(node.sourceLinks)
      })(nodes)
      if (nextNodes.length > 0 && i < that.nodes.length) {
        ++i
        assignNextNodes(nextNodes)
      }
    }
    assignNextNodes(this.nodes)
  }

  // Shift all nodes that have an x-value >= the given value to the right by one place
  shiftNodesToRight(x: number): any {
    return flow(
      filter((n: TNode): boolean => {
        return n.x >= x
      }),
      forEach((n: TNode): void => {
        n.x += 1
      }),
    )
  }

  // Check that there isn't a non-source node vertically between 2 linked nodes.
  isSourceDirectlyAbove(node: TNode): (xValue: number) => boolean {
    return bind((xValue: number): boolean => {
      const findSourceNodeAtX: any = find((link: TLink): boolean => {
        return link.source().x === xValue
      })
      const maxYVal: any = flow(
        filter((n: TNode): boolean => {
          return n.x === xValue
        }),
        reduce((max: number, n: TNode): number => {
          return Math.max(max, n.y)
        }, 0),
      )(this.nodes)
      return maxYVal === findSourceNodeAtX(node.targetLinks).source().y
    }, this)
  }

  placeNode(used: number[], x: number, node: TNode): void {
    if (indexOf(used)(x) === -1) {
      node.x = x
      used.push(x)
    } else {
      this.placeNode(used, x + 1, node)
    }
  }

  singleSourceAbove(sourcePositions: number[]): any {
    const sourceNodesAbove: any = (x: number): any => {
      return filter((position: number): boolean => {
        return position === x
      })(sourcePositions)
    }
    return (x: number): boolean => {
      return sourceNodesAbove(x).length === 1
    }
  }

  xPositionAvailable(nodePositions: number[]): (x: number) => boolean {
    return (x: number): boolean => {
      return indexOf(x)(nodePositions) === -1
    }
  }

  calculateXPosition(sourcePositions: number[], possiblePositions: number[]): number {
    const sourcePositionsSum: number = reduce((sum: number, val: number): number => {
      return sum + val
    }, 0)(sourcePositions)
    const meanSourcePosition: number = sourcePositionsSum / sourcePositions.length
    let xPosition: number
    if (possiblePositions.length > 0) {
      possiblePositions = sortBy((x: number): number => {
        return Math.abs(x - meanSourcePosition)
      })(possiblePositions)
      xPosition = possiblePositions[0]
    } else {
      xPosition = Math.round(meanSourcePosition)
      // Shift nodes to the right by one place to make space for new node column
      this.shiftNodesToRight(xPosition)(this.nodes)
    }
    return xPosition
  }

  computeNodeXPositions(): void {
    const rows: number[] = uniq(
      sortBy((y: number): number => {
        return y
      })(
        map((node: TNode): number => {
          return node.y
        })(this.nodes),
      ),
    )

    forEach((row: number): void => {
      var nodesInRow: TNode[] = filter((node: TNode): boolean => {
        return node.y === row
      })(this.nodes)
      if (row === 0) {
        // For the top row, spread nodes out equally
        forEach.convert({ cap: false })((node: TNode, i: number): void => {
          node.x = i + 1
        })(nodesInRow)
      } else {
        let nodePositions: number[] = []
        // Place nodes with only one incoming link directly below their source node, if possible.
        const singleSourceNodes: TNode[] = filter((node: TNode): boolean => {
          return node.targetLinks.length === 1
        })(nodesInRow)
        forEach((node: TNode): void => {
          let sourceNodePosition: number = node.targetLinks[0].source().x
          this.placeNode(nodePositions, sourceNodePosition, node)
        })(singleSourceNodes)

        // If there are more than 1 incoming links, look at source node x positions.
        const multipleSourceNodes: TNode[] = filter((node: TNode): boolean => {
          return node.targetLinks.length > 1
        })(nodesInRow)
        forEach((node: TNode): void => {
          // The mean source node position is calculated as a starting point for positioning the node
          const sourcePositions: number[] = map((link: TLink): number => {
            return link.source().x
          })(node.targetLinks)
          // A node should be placed directly under a source node if possible:
          // Calculate possible node x positions that satisfy the following conditions
          let possiblePositions = flow(
            // 1) there can only be one source node directly above
            filter(this.singleSourceAbove(sourcePositions)),
            // 2) there cannot be another (non-source) node in between the node and the source node above
            filter(this.isSourceDirectlyAbove(node)),
            // 3) there can't already be another node on the same row in that position
            filter(this.xPositionAvailable(nodePositions)),
          )(sourcePositions)

          const xPosition: number = this.calculateXPosition(sourcePositions, possiblePositions)
          node.x = xPosition
          nodePositions.push(xPosition)
        })(multipleSourceNodes)
      }
    })(rows)
  }
}

export default Layout
