import { Accessor, Accessors, Datum, RawData, State, StateWriter } from "./typings"
import { hierarchy as d3Hierarchy, partition as d3Partition, HierarchyNode } from "d3-hierarchy"
import { filter, forEach, isEmpty, map, reduce } from "lodash/fp"

class DataHandler {
  private color: (d: Datum) => string
  private data: Datum[]
  private id: (d: Datum) => string
  private name: (d: Datum) => string
  private state: State
  private stateWriter: StateWriter
  private total: number
  private value: (d: Datum) => number
  topNode: Datum

  constructor(state: State, stateWriter: StateWriter) {
    this.state = state
    this.stateWriter = stateWriter
  }

  private assignAccessors(): void {
    const accessors: Accessors<Datum> = this.state.current.get("accessors").series

    // In prepared data, original data is saved in d.data, so accessors need to be modified accordingly
    forEach.convert({ cap: false })(
      (accessor: Accessor<any, any>, key: string): void => {
        ;(this as any)[key] = (d: Datum) => (d.data ? accessor(d.data) : accessor(d))
      },
    )(accessors)
  }

  prepareData(): Datum[] {
    this.assignAccessors()

    const data: RawData = this.state.current.get("accessors").data.data(this.state.current.get("data")) || {}

    const sortingFunction = (a: Datum, b: Datum) => {
      // Empty segments should always be last
      if (a.data.empty) {
        return 1
      }
      if (b.data.empty) {
        return -1
      }
      // Sort largest to smallest
      return b.value - a.value
    }

    const hierarchyData: HierarchyNode<RawData> = d3Hierarchy(data)
      .each(this.assignColors.bind(this))
      .each(this.assignNames.bind(this))
      .each(this.assignIDs.bind(this))
      .eachAfter(this.assignValues.bind(this))
      .sort(this.state.current.get("config").sort ? sortingFunction : undefined)

    this.total = hierarchyData.value

    this.topNode = d3Partition()(hierarchyData)
      .descendants()
      .find((d: Datum): boolean => d.depth === 0)

    this.stateWriter("topNode", this.topNode)

    this.data = d3Partition()(hierarchyData)
      .descendants()
      .filter((d: Datum): boolean => !isEmpty(d.data))

    this.checkDataValidity()

    forEach(
      (d: Datum): void => {
        d.zoomable = d.parent && !!d.children
      },
    )(this.data)

    this.stateWriter("data", this.data)
    return this.data
  }

  private assignColors(node: Datum): void {
    if (node.data.empty) {
      node.color = "#fff"
      return
    }

    const propagateColors: boolean = this.state.current.get("config").propagateColors
    node.color = propagateColors && node.depth > 1 ? node.parent.color : node.depth > 0 ? this.color(node) : undefined
  }

  private assignNames(node: Datum): void {
    node.name = this.name(node)
  }

  private assignIDs(node: Datum): void {
    node.id = this.id(node)
  }

  private assignValues(node: Datum): void {
    if (this.value(node)) {
      node.value = +this.value(node)
      return
    }
    let sum: number = 0
    const children = node.children
    let i: number = children && children.length - 1
    while (i >= 0) {
      sum += +children[i].value
      i = i - 1
    }
    node.value = sum
  }

  private checkDataValidity(): void {
    // All data points must have a value assigned
    const noValueData: Datum[] = filter((d: Datum): boolean => !d.value)(this.data)

    if (noValueData.length > 0) {
      throw new Error(`The following nodes do not have values: ${map(this.name)(noValueData)}`)
    }

    // Parent nodes cannot be smaller than the sum of their children
    const childrenExceedParent: Datum[] = filter(
      (d: Datum): boolean => {
        const childSum: number = reduce((sum: number, child: Datum): number => sum + child.value, 0)(d.children)
        return d.value < childSum
      },
    )(this.data)

    if (childrenExceedParent.length > 0) {
      throw new Error(
        `The following nodes are smaller than the sum of their child nodes: ${map(this.name)(childrenExceedParent)}`,
      )
    }
  }
}

export default DataHandler
