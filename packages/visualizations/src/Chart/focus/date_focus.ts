import { D3Selection, EventBus, State, MousePosition, AxisPosition, AxisComputed } from "../typings"
import Events from "../../shared/event_catalog"
import { includes, filter, find, forEach, get, groupBy, isFinite, map, partition, reduce, sortBy } from "lodash/fp"
import { drawHidden, labelDimensions, positionLabel } from "../../utils/focus_utils"
import * as styles from "./styles"
import * as globalStyles from "../../shared/styles"

class DateFocus {
  el: D3Selection
  els: { [key: string]: D3Selection }
  elGroup: D3Selection
  events: EventBus
  state: State

  constructor(state: State, els: { [key: string]: D3Selection }, events: EventBus) {
    this.state = state
    this.els = els
    this.el = els.main
    this.elGroup = els.group
    this.events = events
    this.events.on(Events.CHART.MOVE, this.onMouseMove.bind(this))
    this.events.on(Events.FOCUS.DATE, this.focusDate.bind(this))
  }

  private onMouseMove(mousePosition: MousePosition) {
    // Identify nearest date tick and snap focus to this
    const computedAxes = this.state.current.get("computed").axes

    // Only render a date focus if there is a time axis
    const timeAxis = computedAxes.priorityTimeAxis
    if (!timeAxis) {
      return
    }

    const timeAxisComputed: AxisComputed = computedAxes.computed[timeAxis]
    const orientation: "x" | "y" = timeAxis[0] as "x" | "y"
    const focusDate: Date = this.clampDate(timeAxisComputed.ticks)(
      timeAxisComputed.scale.invert(mousePosition[orientation]),
    )

    // If a component focus or flag focus is being displayed, do not render a date focus
    if (
      this.els.component.select(`div.${globalStyles.componentFocus}`).style("visibility") === "visible" ||
      this.el.classed("focus-legend-flag")
    ) {
      return
    }

    this.focusDate(focusDate)
  }

  private clampDate(ticks: Date[]) {
    return (date: Date) => {
      return sortBy((tick: Date) => Math.abs(tick.valueOf() - date.valueOf()))(ticks)[0]
    }
  }

  private focusDate(date: Date): void {
    const computedAxes = this.state.current.get("computed").axes

    const mainAxis = computedAxes.priorityTimeAxis
    const mainAxisComputed = computedAxes.computed[mainAxis]

    if (!includes(date.toString())(map(String)(mainAxisComputed.ticks))) {
      return
    }

    const focusDates: any = {
      main: {
        date,
        axis: mainAxis,
      },
    }

    const comparisonAxis: AxisPosition = find(
      (axisName: AxisPosition) => axisName !== mainAxis && axisName[0] === mainAxis[0],
    )(computedAxes.requiredAxes)

    if (comparisonAxis) {
      const comparisonDate = computedAxes.computed[comparisonAxis].scale.invert(mainAxisComputed.scale(date))
      focusDates.comparison = {
        date: comparisonDate,
        axis: comparisonAxis,
      }
    }

    this.focus(focusDates)
  }

  private focus(dates: { [key: string]: any }): void {
    // Remove old focus (may also be a different type of focus)
    this.events.emit(Events.FOCUS.CLEAR)
    // Get focus data
    const focusData = this.state.current.get("computed").series.dataForFocus(dates)
    // Draw focus line and points
    const isVertical: boolean = dates.main.axis[0] === "x"
    const position: number = Math.round(
      this.state.current.get(["computed", "axes", "computed", dates.main.axis, "scale"])(dates.main.date),
    )
    const options = this.state.current.get("config").focusDateOptions

    if (includes("line")(options)) {
      this.drawLine(isVertical, position)
    }
    if (includes("points")(options)) {
      this.drawPoints(focusData, isVertical, position)
    }
    if (includes("label")(options)) {
      this.drawLabel(dates, focusData, isVertical, position)
    }
  }

  private drawLine(isVertical: boolean, position: number): void {
    const drawingDims = this.state.current.get("computed").canvas.drawingDims
    this.elGroup
      .append("svg:line")
      .attr("x1", isVertical ? position : 0)
      .attr("x2", isVertical ? position : drawingDims.width)
      .attr("y1", isVertical ? 0 : position)
      .attr("y2", isVertical ? drawingDims.height : position)
      .attr("stroke", "black")
  }

  private drawPoints(focusData: { [key: string]: any }[], isVertical: boolean, position: number): void {
    const pointData: number[] = filter((series: any) => series.displayPoint && isFinite(series.valuePosition))(
      focusData,
    )
    this.elGroup
      .selectAll("circle")
      .data(pointData)
      .enter()
      .append("svg:circle")
      .attr("fill", get("color"))
      .attr("r", 4.5)
      .attr("cx", isVertical ? position : get("valuePosition"))
      .attr("cy", isVertical ? get("valuePosition") : position)
  }

  private drawLabel(
    dates: { [key: string]: any },
    focusData: { [key: string]: any }[],
    isVertical: boolean,
    position: number,
  ): void {
    const label = drawHidden(this.el, "date")

    const labels = label
      .selectAll("ul")
      .data([focusData])
      .enter()
      .append("xhtml:ul")
      .attr("class", styles.dateFocus)

    const dataForAxis = (axis: "main" | "comparison") => filter((d: any) => d.axisPriority === axis)(focusData)
    this.drawItemsForAxis(labels, dataForAxis("main"), dates.main.date, dates.main.axis)
    if (dates.comparison) {
      this.drawItemsForAxis(labels, dataForAxis("comparison"), dates.comparison.date, dates.comparison.axis)
    }

    // Get label dimensions
    const labelDims = labelDimensions(this.el)
    const drawingDimensions = this.state.current.get("computed").canvas.drawingDims
    const offset = this.state.current.get("config").focusOffset
    const labelPosition = isVertical ? "toRight" : "above"

    // Positioning of focus elements depends on orientation
    const focus = {
      x: isVertical ? position : drawingDimensions.width - labelDims.width / 2 - offset,
      y: isVertical ? offset + labelDims.height / 2 : position,
    }

    positionLabel(label, focus, labelDims, this.getDrawingPosition(), offset, labelPosition, false)
  }

  private drawItemsForAxis(labels: D3Selection, data: any, date: Date, axis: AxisPosition) {
    const formatter = this.state.current.get(["computed", "axes", "computed", axis, "tickFormatter"])
    this.addTitle(labels, formatter(date))

    const partitionedStacks = partition(get("stack"))(data)
    // Add unstacked items
    this.addSeriesItems(labels, partitionedStacks[1])

    // Add stacked items
    const stacks = groupBy(get("stack"))(partitionedStacks[0])
    forEach((stack: any) => {
      const total = reduce((sum: number, series: any) => {
        return sum + (isFinite(series.value) ? series.value : 0)
      }, 0)(stack)
      this.addTitle(labels, `Stacked total: ${total}`)
      this.addSeriesItems(labels, stack)
    })(stacks)
  }

  private margin(axis: AxisPosition): number {
    return (
      this.state.current.get(["computed", "axes", "margins", axis]) ||
      this.state.current.get(["config", axis, "margin"])
    )
  }

  private getDrawingPosition() {
    const computed = this.state.current.get("computed")
    const margins = computed.axes.margins
    return {
      xMin: margins.y1,
      xMax: margins.y1 + computed.canvas.drawingDims.width,
      yMin: margins.x2,
      yMax: margins.x2 + computed.canvas.drawingDims.height,
    }
  }

  private addTitle(el: D3Selection, title: string, total?: number): void {
    el.append("xhtml:li")
      .attr("class", "title")
      .text(title)
      .append("span")
      .text(total)
  }

  private addSeriesItems(el: D3Selection, data: any[]): void {
    const sortedData = sortBy((d: any) => d.valuePosition)(data)
    forEach((series: any) => this.addSeriesItem(el, series))(sortedData)
  }

  private addSeriesItem(el: D3Selection, data: any): void {
    const item = el.append("xhtml:li")

    item.text(data.label)

    item
      .append("div")
      .attr("class", "series-color")
      .style("background-color", data.color)

    item
      .append("div")
      .attr("class", "series-value")
      .text(data.value)
  }

  remove(): void {
    this.el.node().innerHTML = ""
    this.elGroup.node().innerHTML = ""
    this.el.style("visibility", "hidden")
  }
}

export default DateFocus
