import AbstractRenderer from "./abstract_renderer"
import Events from "../../utils/event_catalog"
import { filter, find, findIndex, forEach, last, map, reduce } from "lodash/fp"
import { interpolateObject } from "d3-interpolate"
import { scaleLinear as d3ScaleLinear } from "d3-scale"
import { IObject, TD3Selection, TDatum } from "../typings"
import * as styles from "./styles"

class Gauge extends AbstractRenderer {
  comparison: IObject
  extent: string
  target: number

  checkData(): void {
    if (!this.target) {
      throw new Error("No target value provided for gauge")
    }
  }

  computeOuter(width: number, height: number): number {
    return this.extent === "full"
      ? super.computeOuter(width, height)
      : Math.min(width / 2, height) - this.state.current.get("config").outerBorderMargin
  }

  runningTotal(): number[] {
    return reduce((memo: number[], datapoint: TDatum): number[] => {
      const previous: number = last(memo) || 0
      memo.push(previous + datapoint.value)
      return memo
    }, [])(this.data)
  }

  // Ensure sum of rendered values is equal to gauge target value.
  fillGaugeExtent(): void {
    const runningTotal: number[] = this.runningTotal()

    // If target has been exceeded, reduce last value(s)
    if (this.total >= this.target) {
      const index: number = findIndex((value: number): boolean => value >= this.target)(runningTotal)
      forEach((datapoint: TDatum, i: number): void => {
        if (i === index) {
          datapoint.value = i > 0 ? this.target - runningTotal[i - 1] : this.target
        } else if (i > index) {
          datapoint.value = 0
        }
      })(this.data)
      // If target has not been reached, add an "unfilled" segment which will have no color,
      // and will not be hoverable.
    } else {
      this.data.push({
        unfilled: true,
        value: this.target - this.total
      })
    }
  }

  centerDisplayString(): string[] {
    return [`${this.total} / ${this.target}`]
  }

  compute(): void {
    this.computeTotal()
    this.fillGaugeExtent()
    super.compute()
    this.computed.comparison = this.comparison
  }

  updateDraw(): void {
    super.updateDraw()

    // Comparison line
    this.updateComparison()
  }

  updateComparison(): void {
    const comparison: TD3Selection = this.el
      .selectAll(`g.${styles.comparison}`)
      .data(this.comparison ? [this.comparison] : [])

    comparison.exit().remove()

    const enter: TD3Selection = comparison
      .enter()
      .append("svg:g")
      .attr("class", styles.comparison)

    enter.append("svg:path")

    enter
      .merge(comparison)
      .transition()
      .duration(this.state.current.get("config").duration)
      .select("path")
      .attrTween("d", this.lineTween.bind(this))
  }

  onMouseOver(d: TDatum): void {
    if (d.data.unfilled) {
      this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)
      return
    }
    super.onMouseOver(d)
  }

  totalForPercentages(): number {
    return this.target
  }

  // Establish coordinate system with 0,0 being the center of the width, height rectangle
  computeTranslate(): [number, number] {
    const drawingDims: IObject = this.state.current.get("computed").canvas.drawingContainerDims
    const yTranslate: number =
      this.extent === "full" ? drawingDims.height / 2 : (drawingDims.height + this.computed.r) / 2

    this.currentTranslation = [drawingDims.width / 2, yTranslate]
    return this.currentTranslation
  }

  // Helpers
  angleRange(): [number, number] {
    return this.extent === "semi" ? [-Math.PI / 2, Math.PI / 2] : [-Math.PI, Math.PI]
  }

  totalYOffset(): string {
    return this.extent === "semi" ? "0" : "0.35em"
  }

  // Interpolate the arcs in data space.
  arcTween(d: TDatum, i: number): (t: number) => string {
    const angleRange: [number, number] = this.angleRange()
    let old: any
    let s0: number
    let e0: number

    // Segments transition to and from the start/left of the gauge.
    if (!d.data.unfilled) {
      old =
        filter((datapoint: TDatum): boolean => {
          return !datapoint.data.unfilled
        })(this.previous.data) || []

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
        s0 = angleRange[0]
        e0 = angleRange[0]
      }
      // The unfilled part of the gauge transitions to and from the end/right of the gauge.
    } else {
      old = find((datapoint: TDatum): boolean => {
        return datapoint.data.unfilled
      })(this.previous.data)
      if (old) {
        s0 = old.startAngle
        e0 = old.endAngle
      } else if (!this.previous.data) {
        s0 = angleRange[0]
        e0 = angleRange[1]
      } else {
        s0 = angleRange[1]
        e0 = angleRange[1]
      }
    }

    const f = interpolateObject({ endAngle: e0, startAngle: s0 }, { endAngle: d.endAngle, startAngle: d.startAngle })
    return (t: number): string => this.computed.arc(f(t))
  }

  lineTween(comparison: IObject): (t: number) => string {
    // Need to rotate range by 90 degrees, since in d3 pie layout, '0' is vertical above origin.
    // Here, we need '0' to be horizontal to left of origin.
    const range: number[] = map((value: number): number => value + Math.PI / 2)(this.angleRange())
    const angle = (d: TDatum): number =>
      d3ScaleLinear()
        .range(range)
        .domain([0, this.target])(d.value)
    const xOuter = (d: TDatum): number => -d.r * Math.cos(angle(d))
    const yOuter = (d: TDatum): number => -d.r * Math.sin(angle(d))
    const xInner = (d: TDatum): number => -d.inner * Math.cos(angle(d))
    const yInner = (d: TDatum): number => -d.inner * Math.sin(angle(d))
    const path = (d: TDatum): string => `M${[xInner(d), yInner(d)].join(",")}L${[xOuter(d), yOuter(d)].join(",")}`
    const oldValue: number = this.previous.comparison ? this.value(this.previous.comparison) : 0
    const f = interpolateObject(
      { inner: this.previous.inner || this.computed.inner, r: this.previous.r || this.computed.r, value: oldValue },
      { inner: this.computed.inner, r: this.computed.r, value: this.value(comparison) }
    )
    return (t: number): string => path(f(t))
  }

  dataForLegend(): IObject[] {
    const data: IObject[] = map((datum: IObject): IObject => {
      return {
        label: this.key(datum),
        color: this.color(datum)
      }
    })(this.data)
    if (this.comparison) {
      data.push({
        label: this.key(this.comparison),
        comparison: true
      })
    }
    return data
  }
}

export default Gauge
