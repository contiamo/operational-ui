import AbstractRenderer from "./abstract_renderer"
import { IObject, TDatum } from "../typings"
import { interpolateObject } from "d3-interpolate"

class Donut extends AbstractRenderer {
  // Establish coordinate system with 0,0 being the center of the width, height rectangle
  computeTranslate(): [number, number] {
    const drawingDims: IObject = this.state.current.get("computed").canvas.drawingContainerDims
    this.currentTranslation = [drawingDims.width / 2, drawingDims.height / 2]
    return this.currentTranslation
  }

  // Helpers
  totalForPercentages(): number {
    this.computeTotal()
    return this.total
  }

  centerDisplayString(): string[] {
    return this.computed.inner > 0 ? [this.computed.total.toString()] : []
  }

  minWidth(): number {
    return this.state.current.get("config").minDonutWidth
  }

  maxWidth(): number {
    return this.state.current.get("config").maxDonutWidth
  }

  totalYOffset(): string {
    return "0.35em"
  }

  // Interpolate the arcs in data space.
  arcTween(d: TDatum, i: number): (t: number) => string {
    let old: TDatum[] = this.previous.data || []
    let s0: number
    let e0: number
    if (old[i]) {
      s0 = old[i].startAngle
      e0 = old[i].endAngle
    } else if (!old[i] && old[i - 1]) {
      s0 = old[i - 1].endAngle
      e0 = old[i - 1].endAngle
    } else if (!old[i - 1] && old.length > 0) {
      s0 = old[old.length - 1].endAngle
      e0 = old[old.length - 1].endAngle
    } else {
      s0 = 0
      e0 = 0
    }
    let f = interpolateObject({ endAngle: e0, startAngle: s0 }, { endAngle: d.endAngle, startAngle: d.startAngle })
    return (t: number): string => this.computed.arc(f(t))
  }

  angleRange(): [number, number] {
    return [0, 2 * Math.PI]
  }
}

export default Donut
