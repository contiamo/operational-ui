import { IAccessors, IObject, IState, TDatum, TStateWriter } from "./typings"
import { hierarchy as d3Hierarchy, partition as d3Partition } from "d3-hierarchy"
import { filter, forEach, isEmpty, map, reduce } from "lodash/fp"

class DataHandler {
  color: (d: TDatum) => string
  data: TDatum[]
  name: (d: TDatum) => string
  state: IState
  stateWriter: TStateWriter
  topNode: TDatum
  total: number
  value: (d: TDatum) => number

  constructor(state: IState, stateWriter: TStateWriter) {
    this.state = state
    this.stateWriter = stateWriter
  }

  assignAccessors(): void {
    const accessors: IAccessors = this.state.current.get("accessors").series
    // In prepared data, original data is saved in d.data, so accessors need to be modified accordingly
    forEach.convert({ cap: false })((accessor: (d: TDatum) => any, key: string): void => {
      ;(this as any)[key] = (d: TDatum): any => (d.data ? accessor(d.data) : accessor(d))
    })(accessors)
  }

  prepareData(): TDatum[] {
    this.assignAccessors()

    const data: IObject = this.state.current.get("accessors").data.data(this.state.current.get("data")) || {}

    const sortingFunction: any = this.state.current.get("config").sort
      ? (a: TDatum, b: TDatum) => b.value - a.value
      : undefined

    const hierarchyData = d3Hierarchy(data)
      .each(this.assignColors.bind(this))
      .each(this.assignNames.bind(this))
      .eachAfter(this.assignValues.bind(this))
      .sort(sortingFunction)

    this.total = hierarchyData.value

    this.topNode = d3Partition()(hierarchyData)
      .descendants()
      .find((d: TDatum): boolean => d.depth === 0)

    this.stateWriter("topNode", this.topNode)

    this.data = d3Partition()(hierarchyData)
      .descendants()
      .filter((d: TDatum): boolean => !isEmpty(d.data))

    this.checkDataValidity()

    forEach((d: TDatum): void => {
      d.zoomable = d.parent && !!d.children
    })(this.data)

    this.stateWriter("data", this.data)
    return this.data
  }

  assignColors(node: any): void {
    const propagateColors: boolean = this.state.current.get("config").propagateColors
    node.color =
      propagateColors && node.parent && !this.color(node)
        ? this.color(node.parent) || node.parent.color
        : this.color(node)
  }

  assignNames(node: any): void {
    node.name = this.name(node)
  }

  assignValues(node: any): void {
    if (this.value(node)) {
      node.value = +this.value(node)
      return
    }
    let sum: number = 0
    const children = node.children
    let i: number = children && children.length
    while (--i >= 0) {
      sum += +children[i].value
    }
    node.value = sum
  }

  checkDataValidity(): void {
    // All data points must have a value assigned
    const noValueData: TDatum[] = filter((d: TDatum): boolean => !d.value)(this.data)

    if (noValueData.length > 0) {
      throw new Error(`The following nodes do not have values: ${map(this.name)(noValueData)}`)
    }

    // Parent nodes cannot be smaller than the sum of their children
    const childrenExceedParent: TDatum[] = filter((d: TDatum): boolean => {
      const childSum: number = reduce((sum: number, child: TDatum): number => sum + child.value, 0)(d.children)
      return d.value < childSum
    })(this.data)

    if (childrenExceedParent.length > 0) {
      throw new Error(
        `The following nodes are smaller than the sum of their child nodes: ${map(this.name)(childrenExceedParent)}`
      )
    }
  }
}

export default DataHandler
