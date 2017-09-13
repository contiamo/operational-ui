import { map, flow, find, forEach, indexOf, reduce, filter, sortBy, uniq, bind } from "lodash/fp"
import { TNode, TLink, TData } from "./typings"

class Layout {
  nodes: TNode[]
  links: TLink[]

  computeLayout(data: TData): void {
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
      forEach(function(node: TNode): void {
        node.y = i
        forEach(function(link: TLink): void {
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
      filter(function(n: TNode): boolean {
        return n.x >= x
      }),
      forEach(function(n: TNode): void {
        n.x += 1
      }),
    )
  }

  // Check that there isn't a non-source node vertically between 2 linked nodes.
  isSourceDirectlyAbove(node: TNode): (xValue: number) => boolean {
    return bind(function(xValue: number): boolean {
      const findSourceNodeAtX: any = find(function(link: TLink): boolean {
        return link.source().x === xValue
      })
      const maxYVal: any = flow(
        filter(function(n: TNode): boolean {
          return n.x === xValue
        }),
        reduce(function(max: number, n: TNode): number {
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
    const sourceNodesAbove: any = function(x: number): any {
      return filter(function(position: number): boolean {
        return position === x
      })(sourcePositions)
    }
    return function(x: number): boolean {
      return sourceNodesAbove(x).length === 1
    }
  }

  xPositionAvailable(nodePositions: number[]): (x: number) => boolean {
    return function(x: number): boolean {
      return indexOf(x)(nodePositions) === -1
    }
  }

  calculateXPosition(sourcePositions: number[], possiblePositions: number[]): number {
    const sourcePositionsSum: number = reduce(function(sum: number, val: number): number {
      return sum + val
    }, 0)(sourcePositions)
    const meanSourcePosition: number = sourcePositionsSum / sourcePositions.length
    let xPosition: number
    if (possiblePositions.length > 0) {
      possiblePositions = sortBy(function(x: number): number {
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
    const that: Layout = this,
      rows: number[] = uniq(
        sortBy(function(y) {
          return y
        })(
          map(function(node: TNode) {
            return node.y
          })(that.nodes),
        ),
      )

    forEach(function(row: number): void {
      var nodesInRow: TNode[] = filter(function(node: TNode): boolean {
        return node.y === row
      })(that.nodes)
      if (row === 0) {
        // For the top row, spread nodes out equally
        forEach.convert({ cap: false })(function(node: TNode, i: number): void {
          node.x = i + 1
        })(nodesInRow)
      } else {
        let nodePositions: number[] = []
        // Place nodes with only one incoming link directly below their source node, if possible.
        const singleSourceNodes: TNode[] = filter(function(node: TNode): boolean {
          return node.targetLinks.length === 1
        })(nodesInRow)
        forEach(function(node: TNode): void {
          let sourceNodePosition: number = node.targetLinks[0].source().x
          that.placeNode(nodePositions, sourceNodePosition, node)
        })(singleSourceNodes)

        // If there are more than 1 incoming links, look at source node x positions.
        const multipleSourceNodes: TNode[] = filter(function(node: TNode): boolean {
          return node.targetLinks.length > 1
        })(nodesInRow)
        forEach(function(node: TNode): void {
          // The mean source node position is calculated as a starting point for positioning the node
          const sourcePositions: number[] = map(function(link: TLink): number {
            return link.source().x
          })(node.targetLinks)
          // A node should be placed directly under a source node if possible:
          // Calculate possible node x positions that satisfy the following conditions
          let possiblePositions = flow(
            // 1) there can only be one source node directly above
            filter(that.singleSourceAbove(sourcePositions)),
            // 2) there cannot be another (non-source) node in between the node and the source node above
            filter(that.isSourceDirectlyAbove(node)),
            // 3) there can't already be another node on the same row in that position
            filter(that.xPositionAvailable(nodePositions)),
          )(sourcePositions)

          const xPosition: number = that.calculateXPosition(sourcePositions, possiblePositions)
          node.x = xPosition
          nodePositions.push(xPosition)
        })(multipleSourceNodes)
      }
    })(rows)
  }
}

export default Layout
