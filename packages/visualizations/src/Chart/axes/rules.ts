import { AxisComputed, AxisPosition, D3Selection, Object, State } from "../typings"
import * as styles from "./styles"

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
    const computedAxes: Object<any> = this.state.current.get("computed").axes.computed
    const axisComputed: AxisComputed = computedAxes[`${this.orientation}1`] || computedAxes[`${this.orientation}2`]
    const data: number[] = axisComputed.ticks

    const startAttributes: Object<number> = this.startAttributes()
    const attributes: Object<number> = this.attributes()

    const rules: any = this.el.selectAll(`line.${styles.rules}`).data(data, String)

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
      .attr("class", (d: any): string => `rule ${styles.rules} ${d === 0 ? "zero" : ""}`)
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

  private startAttributes(): Object<number> {
    const previousAxes: Object<any> = this.state.current.get("computed").axes.previous
    const axisPrevious: AxisComputed = previousAxes[`${this.orientation}1`] || previousAxes[`${this.orientation}2`]
    const drawingDims: Object<number> = this.state.current.get("computed").canvas.drawingDims
    return {
      x1: this.yRules ? -this.margin("y1") / 2 : axisPrevious.scale,
      x2: this.yRules ? drawingDims.width + this.margin("y2") / 2 : axisPrevious.scale,
      y1: this.yRules ? axisPrevious.scale : 0,
      y2: this.yRules ? axisPrevious.scale : drawingDims.height,
    }
  }

  private attributes(): Object<number> {
    const computedAxes: Object<any> = this.state.current.get("computed").axes.computed
    const axisComputed: AxisComputed = computedAxes[`${this.orientation}1`] || computedAxes[`${this.orientation}2`]
    const drawingDims: Object<number> = this.state.current.get("computed").canvas.drawingDims
    return {
      x1: this.yRules ? -this.margin("y1") / 2 : axisComputed.scale,
      x2: this.yRules ? drawingDims.width + this.margin("y2") / 2 : axisComputed.scale,
      y1: this.yRules ? axisComputed.scale : 0,
      y2: this.yRules ? axisComputed.scale : drawingDims.height,
    }
  }

  private margin(axis: AxisPosition): number {
    return this.state.current.get("computed").axes.margins[axis] || this.state.current.get("config")[axis].margin
  }

  close(): void {
    this.el.node().remove()
  }
}

export default Rules
