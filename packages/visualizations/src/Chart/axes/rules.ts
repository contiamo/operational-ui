import { AxisPosition, D3Selection, State } from "../typings"
import * as styles from "./styles"
import { clone, includes } from "lodash/fp"

class Rules {
  el: D3Selection
  orientation: "x" | "y"
  state: State
  yRules: boolean

  constructor(state: State, el: D3Selection, orientation: "x" | "y") {
    this.state = state
    this.el = el
    this.orientation = orientation
    this.yRules = this.orientation === "y"
  }

  draw(): void {
    const computedAxes = this.state.current.get("computed").axes.computed
    const axisComputed = computedAxes[`${this.orientation}1`] || computedAxes[`${this.orientation}2`]
    const requiredAxes = this.state.current.get("computed").axes.requiredAxes
    const data = clone(axisComputed.ticks)
    if (includes(this.yRules ? "x1" : "y1")(requiredAxes)) {
      data.shift()
    }
    if (includes(this.yRules ? "x2" : "y2")(requiredAxes)) {
      data.pop()
    }
    const startAttributes = this.startAttributes()
    const attributes = this.attributes()

    const rules = this.el.selectAll(`line.${styles.rules}`).data(data, String)

    rules
      .exit()
      .transition()
      .duration(this.state.current.get("config").duration)
      .attr("x1", attributes.x1)
      .attr("x2", attributes.x2)
      .attr("y1", attributes.y1)
      .attr("y2", attributes.y2)
      .style("opacity", 1e-6)
      .remove()

    rules
      .enter()
      .append("svg:line")
      .attr("class", (d: any) => `rule ${styles.rules} ${d === 0 ? "zero" : ""}`)
      .attr("x1", startAttributes.x1)
      .attr("x2", startAttributes.x2)
      .attr("y1", startAttributes.y1)
      .attr("y2", startAttributes.y2)
      .merge(rules)
      .transition()
      .duration(this.state.current.get("config").duration)
      .attr("x1", attributes.x1)
      .attr("x2", attributes.x2)
      .attr("y1", attributes.y1)
      .attr("y2", attributes.y2)
  }

  private startAttributes() {
    const previousAxes = this.state.current.get("computed").axes.previous
    const axisPrevious = previousAxes[`${this.orientation}1`] || previousAxes[`${this.orientation}2`]
    const drawingDims = this.state.current.get("computed").canvas.drawingDims
    return {
      x1: this.yRules ? -this.margin("y1") / 2 : axisPrevious.scale,
      x2: this.yRules ? drawingDims.width + this.margin("y2") / 2 : axisPrevious.scale,
      y1: this.yRules ? axisPrevious.scale : 0,
      y2: this.yRules ? axisPrevious.scale : drawingDims.height,
    }
  }

  private attributes() {
    const computedAxes = this.state.current.get("computed").axes.computed
    const axisComputed = computedAxes[`${this.orientation}1`] || computedAxes[`${this.orientation}2`]
    const drawingDims = this.state.current.get("computed").canvas.drawingDims
    return {
      x1: this.yRules ? -this.margin("y1") / 2 : axisComputed.scale,
      x2: this.yRules ? drawingDims.width + this.margin("y2") / 2 : axisComputed.scale,
      y1: this.yRules ? axisComputed.scale : 0,
      y2: this.yRules ? axisComputed.scale : drawingDims.height,
    }
  }

  private margin(axis: AxisPosition): number {
    const computedAxes = this.state.current.get("computed").axes
    return includes(axis)(computedAxes.requiredAxes) ? computedAxes.margins[axis] : 0
  }

  close(): void {
    this.el.node().remove()
  }
}

export default Rules
