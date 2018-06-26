import Axis from "./axes/axis"
import Rules from "../Chart/axes/rules"
import { any, assign, defaults, difference, find, forEach, includes, invoke, keys, omitBy, pickBy } from "lodash/fp"
import { alignAxes } from "./axes/axis_utils"
import { AxisClass, AxisConfig, AxisOptions, AxisPosition, D3Selection, EventBus, State, StateWriter } from "./typings"

const generalAxisConfig = {
  fontSize: 11,
  titleFontSize: 12,
}

const xAxisConfig = defaults(generalAxisConfig)({
  margin: 15,
  minTicks: 2,
  rotateLabels: false,
  tickSpacing: 65,
  outerPadding: 3,
})

const yAxisConfig = defaults(generalAxisConfig)({
  margin: 34,
  minTicks: 4,
  minTopOffsetTopTick: 21,
  rotateLabels: false,
  tickSpacing: 40,
  outerPadding: 3,
})

const axisConfig: { [key: string]: AxisConfig } = {
  x1: assign({ tickOffset: 8 })(xAxisConfig),
  x2: assign({ tickOffset: -8 })(xAxisConfig),
  y1: assign({ tickOffset: -8 })(yAxisConfig),
  y2: assign({ tickOffset: 8 })(yAxisConfig),
}

class AxesManager {
  axes: { [key: string]: AxisClass<any> } = {}
  axesDrawn: ("x" | "y")[]
  els: { [key: string]: D3Selection }
  events: EventBus
  oldAxes: { [key: string]: AxisClass<any> } = {}
  rules: { [key: string]: Rules } = {}
  state: State
  stateWriter: StateWriter

  constructor(state: State, stateWriter: StateWriter, events: EventBus, els: { [key: string]: D3Selection }) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.els = els
  }

  draw(): void {
    this.updateAxes()
    forEach(invoke("close"))(this.oldAxes)
    forEach(this.drawAxes.bind(this))(["y", "x"])
    forEach(invoke("adjustMargins"))(this.axes)
    this.events.emit("margins:update")
    forEach(this.drawAxes.bind(this))(["y", "x"])
  }

  updateMargins(): void {
    const defaultMargins: { [key: string]: number } = {
      x1: xAxisConfig.margin,
      x2: xAxisConfig.margin,
      y1: yAxisConfig.margin,
      y2: yAxisConfig.margin,
    }
    const computedMargins: { [key: string]: number } = defaults(defaultMargins)(
      this.state.current.get(["computed", "axes", "margins"]) || {},
    )
    this.stateWriter("margins", computedMargins)
  }

  private updateAxes(): void {
    this.stateWriter("previous", {})
    this.stateWriter("computed", {})
    this.axesDrawn = []

    // Check all required axes have been configured
    const requiredAxes = keys(this.state.current.get("computed").series.dataForAxes)
    const axesOptions = this.state.current.get("accessors").data.axes(this.state.current.get("data"))
    const undefinedAxes = difference(requiredAxes)(keys(axesOptions))
    if (undefinedAxes.length) {
      throw new Error(`The following axes have not been configured: ${undefinedAxes.join(", ")}`)
    }
    this.stateWriter("requiredAxes", requiredAxes)

    // Remove axes that are no longer needed, or whose type has changed
    const axesToRemove = omitBy(
      (axis: AxisClass<any>, key: AxisPosition): boolean => {
        return !axesOptions[key] || axesOptions[key].type === axis.type
      },
    )(this.axes)
    forEach.convert({ cap: false })(this.removeAxis.bind(this))(axesToRemove)
    // Create or update currently required axes
    forEach.convert({ cap: false })(this.createOrUpdate.bind(this))(axesOptions)
    this.setBaselines()
    this.stateWriter("priorityTimeAxis", this.priorityTimeAxis())
  }

  private createOrUpdate(options: Partial<AxisOptions>, position: AxisPosition): void {
    const fullOptions = defaults(axisConfig[position])(options)
    const data = this.state.current.get(["computed", "series", "dataForAxes", position])
    const existing = this.axes[position]
    existing ? this.update(position, fullOptions) : this.create(position, fullOptions)
  }

  private create(position: AxisPosition, options: AxisOptions): void {
    const el = this.els[`${position[0]}Axes`]
    const axis = new Axis(this.state, this.stateWriter, this.events, el, options.type, position)
    this.axes[position] = axis as AxisClass<any>
    this.update(position, options)
  }

  private update(position: AxisPosition, options: AxisOptions): void {
    const data = this.state.current.get(["computed", "series", "dataForAxes", position])
    this.axes[position].update(options, data)
  }

  private setBaselines(): void {
    const xType = (this.axes.x1 || this.axes.x2).type
    const yType = (this.axes.y1 || this.axes.y2).type
    const baseline: "x" | "y" = xType === "quant" && yType !== "quant" ? "y" : "x"
    this.stateWriter("baseline", baseline)
  }

  private priorityTimeAxis(): AxisPosition {
    return find((axis: AxisPosition): boolean => this.axes[axis] && this.axes[axis].type === "time")(
      this.state.current.get("config").timeAxisPriority,
    )
  }

  private drawAxes(orientation: "x" | "y"): void {
    const axes: { [key: string]: AxisClass<any> } = pickBy(
      (axis: AxisClass<any>): boolean => {
        return orientation === "x" ? axis.isXAxis : !axis.isXAxis
      },
    )(this.axes)
    keys(axes).length === 2 ? alignAxes(axes) : forEach(invoke("compute"))(axes)

    // Update rules
    const hasRules = any((axis: AxisClass<any>) => axis.options.showRules)(axes as any)
    hasRules ? this.updateRules(orientation) : this.removeRules(orientation)

    if (includes(orientation)(this.axesDrawn)) {
      forEach((axis: AxisClass<any>) => {
        axis.draw(this.state.current.get(["config", "duration"]))
      })(axes)
    } else {
      forEach(invoke("draw"))(axes)
      this.axesDrawn.push(orientation)
    }
  }

  updateRules(orientation: "x" | "y"): void {
    const rules = this.rules[orientation] || new Rules(this.state, this.els[`${orientation}Rules`], orientation)
    this.rules[orientation] = rules
    rules.draw()
  }

  private removeRules(orientation: "x" | "y"): void {
    const rules = this.rules[orientation]
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
