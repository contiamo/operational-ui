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
    this.drawYAxes()
    this.drawXAxes()
  }

  updateAxes(): void {
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

  createOrUpdate(options: AxisOptions, position: AxisPosition): void {
    const data = this.state.current.get("computed").series.dataForAxes[position]
    if (data.length === 0) {
      return
    }
    const existing: AxisClass<any> = this.axes[position]
    existing ? this.update(position, options) : this.create(position, options)
  }

  create(position: AxisPosition, options: AxisOptions): void {
    const el: D3Selection = this.els[`${position[0]}Axes`]
    const axis: Axis = new Axis(this.state, this.stateWriter, this.events, el, options.type, position)
    this.axes[position] = axis as AxisClass<any>
    this.update(position, options)
  }

  update(position: AxisPosition, options: AxisOptions): void {
    const data = this.state.current.get("computed").series.dataForAxes[position]
    this.axes[position].update(options, data)
  }

  drawYAxes(): void {
    const yAxes: Object<AxisClass<any>> = pickBy((axis: AxisClass<any>, key: AxisPosition): boolean => key[0] === "y")(
      this.axes
    )
    keys(yAxes).length === 2 ? this.align(yAxes) : forEach(invoke("compute"))(yAxes)
    forEach(invoke("draw"))(yAxes)
    // - identify which x axes there are -> range for y axes // WITHIN axis class
    // - identify number of y axes
    // - if 2 y axes - axes_manager.align()
    // - if 1 y axis - axis.compute()
    // - for y axes: axis.draw()
    // - Update y axis margins as necessary / Trigger event??
  }

  drawXAxes(): void {
    // - identify number of x axes
    // - if 2 x axes - axes_manager.align()
    // - if 1 x axis - axis.compute()
    // - for x axes: axis.draw()
  }

  align(axes: Object<AxisClass<any>>): void {
    const computed: any = alignAxes(axes)
    debugger
  }

  remove(axis: AxisClass<any>, position: AxisPosition): void {
    this.oldAxes[position] = axis
    this.axes[position] = null
  }
}

export default AxesManager
