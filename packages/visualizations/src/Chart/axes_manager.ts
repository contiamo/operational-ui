import Axis from "./axes/axis"
import Rules from "../Chart/axes/rules"
import { filter, find, flow, forEach, get, includes, invoke, keys, map, omitBy, pickBy } from "lodash/fp"
import { alignAxes } from "./axes/axis_utils"
import {
  AxesData,
  AxisClass,
  AxisOptions,
  AxisPosition,
  AxisType,
  D3Selection,
  EventBus,
  Object,
  State,
  StateWriter
} from "./typings"

class AxesManager {
  axes: Object<AxisClass<any>> = {}
  axesDrawn: ("x" | "y")[]
  els: Object<D3Selection>
  events: EventBus
  oldAxes: Object<AxisClass<any>> = {}
  rules: Object<Rules> = {}
  state: State
  stateWriter: StateWriter

  constructor(state: State, stateWriter: StateWriter, events: EventBus, els: Object<D3Selection>) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.els = els
    this.events.on("margins:updated", this.onMarginsUpdated.bind(this))
  }

  draw(): void {
    this.updateAxes()
    forEach(invoke("remove"))(this.oldAxes)
    forEach(this.drawAxes.bind(this))(["y", "x"])
  }

  private updateAxes(): void {
    this.stateWriter("previous", {})
    this.stateWriter("computed", {})
    this.axesDrawn = []
    const axesOptions: AxesData = this.state.current.get("accessors").data.axes(this.state.current.get("data"))
    const data = this.state.current.get("computed").series.dataForAxes
    // Remove axes that are no longer needed, or whose type has changed
    const axesToRemove = omitBy((axis: AxisClass<any>, key: AxisPosition): boolean => {
      return !axesOptions[key] || axesOptions[key].type !== axis.type
    })(this.axes)
    forEach.convert({ cap: false })(this.remove.bind(this))(axesToRemove)
    // Create or update currently required axes
    forEach.convert({ cap: false })(this.createOrUpdate.bind(this))(axesOptions)
    this.stateWriter("requiredAxes", keys(this.axes))
  }

  private createOrUpdate(options: AxisOptions, position: AxisPosition): void {
    const data = this.state.current.get("computed").series.dataForAxes[position]
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

    // Update rules
    const hasRules: boolean = includes("quant")(map((axis: AxisClass<any>): AxisType => axis.type)(axes as any))
    hasRules ? this.updateRules(orientation) : this.removeRules(orientation)

    this.axesDrawn.push(orientation)
  }

  private onMarginsUpdated(isXAxis: boolean): void {
    const axesToUpdate: "x" | "y" = isXAxis ? "y" : "x"
    if (includes(axesToUpdate)(this.axesDrawn)) {
      this.drawAxes(axesToUpdate)
    }
  }

  updateRules(orientation: "x" | "y"): void {
    const rules: Rules = this.rules[orientation] || new Rules(this.state, this.els[`${orientation}Rules`], orientation)
    rules.draw()
  }

  removeRules(orientation: "x" | "y"): void {
    const rules: Rules = this.rules[orientation]
    if (!rules) {
      return
    }
    rules.close()
    delete this.rules[orientation]
  }

  private remove(axis: AxisClass<any>, position: AxisPosition): void {
    this.oldAxes[position] = axis
    this.axes[position] = null
  }
}

export default AxesManager
