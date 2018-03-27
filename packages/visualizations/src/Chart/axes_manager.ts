import Axis from "./axes/axis"
import { filter, find, flow, forEach, invoke, keys, map, omitBy, pickBy } from "lodash/fp"
import { alignAxes } from "./axes/axis_utils"
import {
  AxesData,
  AxisClass,
  AxisOptions,
  AxisPosition,
  D3Selection,
  EventBus,
  Object,
  State,
  StateWriter
} from "./typings"

class AxesManager {
  axes: Object<AxisClass<any>> = {}
  els: Object<D3Selection>
  events: EventBus
  oldAxes: Object<AxisClass<any>> = {}
  state: State
  stateWriter: StateWriter

  constructor(state: State, stateWriter: StateWriter, events: EventBus, els: Object<D3Selection>) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.els = els
  }

  draw(): void {
    this.updateAxes()
    forEach(invoke("remove"))(this.oldAxes)
    this.drawAxes("y")
    this.drawAxes("x")
  }

  private updateAxes(): void {
    const axesOptions: AxesData = this.state.current.get("accessors").data.axes(this.state.current.get("data"))
    const data = this.state.current.get("computed").series.dataForAxes
    // Remove axes that are no longer needed, or whose type has changed
    const axesToRemove = omitBy((axis: AxisClass<any>, key: AxisPosition): boolean => {
      return !axesOptions[key] || axesOptions[key].type !== axis.type || data[key].length === 0
    })(this.axes)
    forEach.convert({ cap: false })(this.remove.bind(this))(axesToRemove)
    // Create or update currently required axes
    forEach.convert({ cap: false })(this.createOrUpdate.bind(this))(axesOptions)
    this.stateWriter("requiredAxes", keys(this.axes))
  }

  private createOrUpdate(options: AxisOptions, position: AxisPosition): void {
    const data = this.state.current.get("computed").series.dataForAxes[position]
    if (data.length === 0) {
      return
    }
    const existing: AxisClass<any> = this.axes[position]
    existing ? this.update(position, options) : this.create(position, options)
  }

  private create(position: AxisPosition, options: AxisOptions): void {
    const el: D3Selection = this.els[`${position[0]}Axes`]
    const axis: Axis = new Axis(this.state, this.stateWriter, this.events, el, options.type, position)
    this.axes[position] = axis as AxisClass<any>
    this.update(position, options)
  }

  private update(position: AxisPosition, options: AxisOptions): void {
    const data = this.state.current.get("computed").series.dataForAxes[position]
    this.axes[position].update(options, data)
  }

  private drawAxes(orientation: "x" | "y"): void {
    const axes: Object<AxisClass<any>> = pickBy((axis: AxisClass<any>): boolean => {
      return orientation === "x" ? axis.isXAxis : !axis.isXAxis
    })(this.axes)
    keys(axes).length === 2 ? alignAxes(axes) : forEach(invoke("compute"))(axes)
    forEach(invoke("draw"))(axes)
  }

  private remove(axis: AxisClass<any>, position: AxisPosition): void {
    this.oldAxes[position] = axis
    this.axes[position] = null
  }
}

export default AxesManager
