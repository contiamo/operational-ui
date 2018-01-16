import { bind, extend, find, flow, forEach, get, groupBy, map, reduce, sortBy, times } from "lodash/fp"
import { IState, IConfig, TStateWriter, IAccessors, TDatum } from "./typings"
import { hierarchy as d3Hierarchy, partition as d3Partition } from "d3-hierarchy"

class DataHandler {
  children: (d: TDatum) => TDatum[]
  color: (d: TDatum) => string
  data: any
  name: (d: TDatum) => string
  state: IState
  stateWriter: TStateWriter
  value: (d: TDatum) => number

  constructor(state: IState, stateWriter: TStateWriter) {
    this.state = state
    this.stateWriter = stateWriter
    this.assignAccessors()
  }

  assignAccessors(): void {
    const accessors: IAccessors = this.state.current.get("accessors").series
    forEach.convert({ cap: false })((accessor: (d: TDatum) => any, key: string): void => {
      ;(this as any)[key] = accessor
    })(accessors)
  }

  // computeTotals(): void {
  //   const aggregate = (data: TDatum): void => {
  //     const children: TDatum[] = this.children(data)
  //     if (children.length > 0) {
  //       forEach(aggregate)(children)
  //     }

  //     data.value = this.value(data) || reduce((sum: number, child: TDatum): number => {
  //       return this.value(child) ? sum + this.value(child) : sum
  //     }, 0)(children)
  //   }

  //   aggregate(this.data.data)
  // }

  partition(data: any): any {
    const config: IConfig = this.state.current.get("config")
    const radius: number = Math.min(config.width, config.height) / 2
    return d3Partition().size([2 * Math.PI, radius])(data)
  }

  prepareData(): any {
    this.data = d3Hierarchy(this.state.current.get("data").data)
      .sum(this.value)
      .sort((a: TDatum, b: TDatum) => b.value - a.value)

    const assignColorsByLevel = (data: TDatum): void => {
      const color: string = this.color(data.data) || data.data.color || "#ddd"
      forEach((child: TDatum): void => {
        child.data.color = this.color(child.data) || color
        const children: TDatum = this.children(child)
        if (children.length > 0) {
          assignColorsByLevel(child)
        }
      })(this.children(data))
    }

    assignColorsByLevel(this.data)

    // For efficiency, filter nodes to keep only those large enough to see.
    const nodes = this.partition(this.data)
      .descendants()
      .filter((d: TDatum) => d.x1 - d.x0 > 0.005) // 0.005 radians = 0.29 degrees

    this.stateWriter("data", nodes)
  }
}

export default DataHandler
