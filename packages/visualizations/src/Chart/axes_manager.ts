import Axis from "./axes/axis"
import Rules from "../Chart/axes/rules"
import { any, assign, defaults, find, forEach, get, invoke, keys, map, omitBy, pickBy } from "lodash/fp"
import { alignAxes } from "./axes/axis_utils"
import {
  AxesData,
  AxisClass,
  AxisConfig,
  AxisOptions,
  AxisPosition,
  AxisType,
  ChartConfig,
  D3Selection,
  EventBus,
  Object,
  State,
  StateWriter,
  XAxisConfig,
  YAxisConfig,
} from "./typings"

const xAxisConfig: Partial<XAxisConfig> = {
  fontSize: 11,
  margin: 15,
  minTicks: 2,
  tickSpacing: 65,
  outerPadding: 3,
}

const yAxisConfig: Partial<YAxisConfig> = {
  fontSize: 11,
  margin: 34,
  minTicks: 4,
  minTopOffsetTopTick: 21,
  tickSpacing: 40,
  outerPadding: 3,
}

const axisConfig: Object<AxisConfig> = {
  x1: assign({ tickOffset: 4 })(xAxisConfig),
  x2: assign({ tickOffset: -4 })(xAxisConfig),
  y1: assign({ tickOffset: -4 })(yAxisConfig),
  y2: assign({ tickOffset: 4 })(yAxisConfig),
}

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
    forEach(invoke("close"))(this.oldAxes)
    forEach(this.drawAxes.bind(this))(["y", "x"])
  }

  updateMargins(): void {
    const defaultMargins: Object<number> = {
      x1: xAxisConfig.margin,
      x2: xAxisConfig.margin,
      y1: yAxisConfig.margin,
      y2: yAxisConfig.margin,
    }
    const computedMargins: Object<number> = defaults(defaultMargins)(
      this.state.current.get("computed").axes.margins || {}
    )
    this.stateWriter("margins", computedMargins)
  }

  private updateAxes(): void {
    this.stateWriter("previous", {})
    this.stateWriter("computed", {})
    this.axesDrawn = []
    const axesOptions: AxesData = this.state.current.get("accessors").data.axes(this.state.current.get("data"))
    // Remove axes that are no longer needed, or whose type has changed
    const axesToRemove = omitBy((axis: AxisClass<any>, key: AxisPosition): boolean => {
      return !axesOptions[key] || axesOptions[key].type === axis.type
    })(this.axes)
    forEach.convert({ cap: false })(this.removeAxis.bind(this))(axesToRemove)
    // Create or update currently required axes
    forEach.convert({ cap: false })(this.createOrUpdate.bind(this))(axesOptions)
    this.setBaselines()
    this.stateWriter("requiredAxes", keys(this.axes))
    this.stateWriter("priorityTimeAxis", this.priorityTimeAxis())
  }

  private createOrUpdate(options: Partial<AxisOptions>, position: AxisPosition): void {
    const fullOptions: AxisOptions = defaults(axisConfig[position])(options)
    const data = this.state.current.get("computed").series.dataForAxes[position]
    const existing: AxisClass<any> = this.axes[position]
    existing ? this.update(position, fullOptions) : this.create(position, fullOptions)
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

  private setBaselines(): void {
    const xType: AxisType = (this.axes.x1 || this.axes.x2).type
    const yType: AxisType = (this.axes.y1 || this.axes.y2).type
    const baseline: "x" | "y" = xType === "quant" && yType !== "quant" ? "y" : "x"
    this.stateWriter("baseline", baseline)
  }

  private priorityTimeAxis(): AxisPosition {
    return find((axis: AxisPosition): boolean => this.axes[axis] && this.axes[axis].type === "time")(
      this.state.current.get("config").timeAxisPriority
    )
  }

  private drawAxes(orientation: "x" | "y"): void {
    const axes: Object<AxisClass<any>> = pickBy((axis: AxisClass<any>): boolean => {
      return orientation === "x" ? axis.isXAxis : !axis.isXAxis
    })(this.axes)
    keys(axes).length === 2 ? alignAxes(axes) : forEach(invoke("compute"))(axes)
    forEach(invoke("draw"))(axes)

    // Update rules
    const hasRules: boolean = any((axis: AxisClass<any>): boolean => axis.showRules)(axes as any)
    hasRules ? this.updateRules(orientation) : this.removeRules(orientation)

    this.axesDrawn.push(orientation)
  }

  private onMarginsUpdated(isXAxis: boolean): void {
    const computed = this.state.current.get("computed").axes
    forEach((position: AxisPosition) => {
      const axis = this.axes[position]
      if (!axis) {
        return
      }
      axis.updateOptions({ margin: computed.margins[position] })
    })(isXAxis ? ["x1", "x2"] : ["y1", "y2"])
    const axesToUpdate: "x" | "y" = isXAxis ? "y" : "x"
    this.drawAxes(axesToUpdate)
  }

  updateRules(orientation: "x" | "y"): void {
    const rules: Rules = this.rules[orientation] || new Rules(this.state, this.els[`${orientation}Rules`], orientation)
    this.rules[orientation] = rules
    rules.draw()
  }

  private removeRules(orientation: "x" | "y"): void {
    const rules: Rules = this.rules[orientation]
    if (!rules) {
      return
    }
    rules.close()
    delete this.rules[orientation]
  }

  private removeAxis(axis: AxisClass<any>, position: AxisPosition): void {
    this.oldAxes[position] = axis
    this.axes[position] = null
  }
}

export default AxesManager
