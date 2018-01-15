import AbstractRenderer from "./abstract_renderer"
import { IObject, TDatum } from "../typings"
import { interpolateObject } from "d3-interpolate"
import { find } from "lodash/fp"

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

  totalYOffset(): string {
    return "0.35em"
  }

  // Interpolate the arcs in data space.
  arcTween(d: TDatum): (t: number) => string {
    const previousData: IObject[] = this.previous.data || [],
      old: TDatum = find((datum: IObject): boolean => datum.index === d.index)(previousData),
      previous: TDatum = find((datum: IObject): boolean => datum.index === d.index - 1)(previousData),
      last: TDatum = previousData[previousData.length - 1]

    let s0: number
    let e0: number
    if (old) {
      s0 = old.startAngle
      e0 = old.endAngle
    } else if (!old && previous) {
      s0 = previous.endAngle
      e0 = previous.endAngle
    } else if (!previous && previousData.length > 0) {
      s0 = last.endAngle
      e0 = last.endAngle
    } else {
      s0 = 0
      e0 = 0
    }
    const f = interpolateObject({ endAngle: e0, startAngle: s0 }, { endAngle: d.endAngle, startAngle: d.startAngle })
    return (t: number): string => this.computed.arc(f(t))
  }

  angleRange(): [number, number] {
    return [0, 2 * Math.PI]
  }
}

export default Donut
