import Series from "../series"
import * as styles from "./styles"
import { compact, defaults, map, reduce } from "lodash/fp"
import { withD3Element } from "../../../utils/d3_utils"
import * as d3 from "d3-selection"
import Events from "../../../utils/event_catalog"
import {
  AxisPosition,
  D3Selection,
  Datum,
  EventBus,
  FlagRendererAccessors,
  Object,
  RendererAccessor,
  RendererClass,
  RendererOptions,
  RendererType,
  State
} from "../../typings"

const defaultAccessors: Partial<FlagRendererAccessors> = {
  color: (series: Series, d: Datum) => d.color || series.legendColor(),
  description: (series: Series, d: Datum) => d.description || "",
  direction: (series: Series, d: Datum) => d.direction || "up",
  label: (series: Series, d: Datum) => d.label || ""
}

export type Options = RendererOptions<FlagRendererAccessors>

class Flag implements RendererClass<FlagRendererAccessors> {
  axis: AxisPosition
  color: RendererAccessor<string>
  data: Datum[]
  description: RendererAccessor<string>
  direction: RendererAccessor<"up" | "down">
  el: D3Selection
  events: EventBus
  label: RendererAccessor<string>
  options: Options
  position: "x" | "y"
  scale: any // @TODO
  series: Series
  state: State
  type: RendererType = "flag"
  x: RendererAccessor<number | Date | string>
  y: RendererAccessor<number | Date | string>

  constructor(state: State, events: EventBus, el: D3Selection, data: Datum[], options: Options, series: Series) {
    this.state = state
    this.events = events
    this.series = series
    this.axis = this.series.axis()
    this.position = this.axis[0] as "x" | "y"
    this.el = this.appendSeriesGroup(el)
    this.update(data, options)
  }

  // Public methods
  update(data: Datum[], options: Options): void {
    this.options = options
    this.assignAccessors(options.accessors)
    this.data = data
  }

  draw(): void {
    this.setAxisScales()

    const data: Datum[] = this.data
    const attributes: Object<any> = this.getAttributes()
    const flagPath = this.flagPath(attributes)
    const hoverFlagPath = this.hoverFlagPath(attributes).bind(this)

    // @TODO add mapping function?
    const groups = this.el.selectAll("g").data(data)
    groups.exit().remove()
    const enterGroups = groups.enter().append("svg:g")

    // Lines
    enterGroups.append("svg:line")

    groups
      .merge(enterGroups)
      .selectAll("line")
      .attr("x1", attributes.x || attributes.x1)
      .attr("x2", attributes.x || attributes.x2)
      .attr("y1", attributes.y || attributes.y1)
      .attr("y2", attributes.y || attributes.y2)
      .attr("stroke", (d: Datum): string => this.color(d))

    // Flags
    enterGroups.append("svg:path").attr("class", "flag")

    groups
      .merge(enterGroups)
      .selectAll(`path.flag`)
      .attr("fill", (d: Datum): string => this.color(d))
      .attr("stroke", (d: Datum): string => this.color(d))
      .attr("d", flagPath)

    // Labels
    enterGroups.append("svg:text")

    groups
      .merge(enterGroups)
      .selectAll("text")
      .style("fill", (d: Datum): string => this.color(d))
      .text((d: Datum): string => this.label(d))
      .each(withD3Element(this.positionLabel(attributes).bind(this)))

    // Hoverable flags
    enterGroups
      .append("svg:path")
      .attr("class", "hover-flag")
      .on("mouseenter", withD3Element(this.onFlagHover(attributes).bind(this)))
      .on("mouseleave", withD3Element(this.onFlagLeave.bind(this)))

    groups
      .merge(enterGroups)
      .selectAll("path.hover-flag")
      .style("fill", (d: Datum): string => this.color(d))
      .style("stroke", (d: Datum): string => this.color(d))
      .attr("d", hoverFlagPath)
  }

  close(): void {
    this.el.remove()
  }

  dataForAxis(axis: "x" | "y"): any[] {
    return this.position === axis ? compact(map(this[axis])(this.data)) : []
  }

  // Private methods
  private appendSeriesGroup(el: D3Selection): D3Selection {
    return el.append("g").attr("class", `series:${this.series.key()} ${styles.flag}`)
  }

  private setAxisScales(): void {
    this.scale = this.state.current.get("computed").axes.computed[this.axis].scale
  }

  private assignAccessors(customAccessors: Partial<FlagRendererAccessors>): void {
    const accessors: FlagRendererAccessors = defaults(defaultAccessors)(customAccessors)
    this.x = this.series.x
    this.y = this.series.y
    this.color = (d: Datum): string => accessors.color(this.series, d)
    this.description = (d: Datum): string => accessors.description(this.series, d)
    this.direction = (d: Datum): "up" | "down" => accessors.direction(this.series, d)
    this.label = (d: Datum): string => accessors.label(this.series, d)
  }

  private getAttributes(): Object<any> {
    const isXAxis: boolean = this.position === "x"
    const value = isXAxis ? this.x : this.y
    const scale = this.scale
    const drawingDims: Object<number> = this.state.current.get("computed").canvas.drawingDims
    const offset: number = this.state.current.get("config").eventFlagAxisOffset

    switch (this.axis) {
      case "x1":
        return {
          x: (d: Datum): number => scale(value(d)),
          y1: drawingDims.height,
          y2: offset
        }
      case "x2":
        return {
          x: (d: Datum): number => scale(value(d)),
          y1: 0,
          y2: drawingDims.height - offset
        }
      case "y1":
        return {
          y: (d: Datum): number => scale(value(d)),
          x1: 0,
          x2: drawingDims.width - offset
        }
      case "y2":
        return {
          y: (d: Datum): number => scale(value(d)),
          x1: drawingDims.width,
          x2: offset
        }
      default:
        return {}
    }
  }

  private positionLabel(attributes: Object<any>) {
    return (d: Datum, el: HTMLElement): void => {
      const label: D3Selection = d3.select(el).attr("transform", "rotate(0)") // Undo any previous rotation before calculating label dimensions.

      const dimensions: ClientRect = el.getBoundingClientRect()
      const x: number = attributes.x ? attributes.x(d) : attributes.x2
      const y: number = attributes.y ? attributes.y(d) : attributes.y2
      const isXAxis: boolean = this.position === "x"
      const sign: number = isXAxis ? (attributes.y2 < attributes.y1 ? 1 : -1) : attributes.x2 < attributes.x1 ? 1 : -1
      const flagHeight: number = this.state.current.get("config").flagHeight
      const coordinates: Object<number> = {
        x: isXAxis ? x : x + sign * flagHeight,
        y: isXAxis ? y + sign * flagHeight : y
      }

      label
        .attr("x", coordinates.x)
        .attr("y", coordinates.y)
        .attr("dy", "0.35em") // @TODO move to styles

      const rotation: string = `rotate(${isXAxis ? -90 : 0}, ${coordinates.x}, ${coordinates.y})`

      // Unless an event flag is at the top of the chart, move label to below the line.
      const dx: number = this.axis[1] === "1" ? -dimensions.width : 0
      let dy: number
      switch (this.axis) {
        case "x1":
          dy = this.direction(d) === "down" ? -dimensions.height / 2 : dimensions.height / 2
          break
        case "x2":
          dy = this.direction(d) === "down" ? -dimensions.height / 2 : dimensions.height / 2
          break
        case "y1":
          dy = this.direction(d) === "down" || coordinates.y === 0 ? dimensions.height / 2 : -dimensions.height / 2
          break
        case "y2":
          dy = this.direction(d) === "down" || coordinates.y === 0 ? dimensions.height / 2 : -dimensions.height / 2
          break
        default:
          throw new Error(`Invalid axis name ${this.axis}.`)
      }
      const translation: string = `translate(${dx}, ${dy})`

      label.attr("transform", `${rotation} ${translation}`)
    }
  }

  private flagPath(attributes: Object<any>): (d: Datum) => string {
    const flagWidth: number = this.state.current.get("config").flagWidth
    const flagHeight: number = this.state.current.get("config").flagHeight
    let line: (d: Datum) => number
    let sign: number
    let tip: (d: Datum) => number

    switch (this.position) {
      case "x":
        line = (d: Datum) => attributes.x(d) + (this.direction(d) === "up" ? -1 : 1)
        sign = attributes.y2 < attributes.y1 ? 1 : -1
        tip = (d: Datum) => (this.direction(d) === "down" ? line(d) - flagWidth : line(d) + flagWidth)
        const y0: number = attributes.y2
        const y1: number = y0 + sign * flagHeight / 2
        const y2: number = y0 + sign * flagHeight
        return (d: Datum): string => "M" + line(d) + "," + y0 + "L" + tip(d) + "," + y1 + "L" + line(d) + "," + y2
      case "y":
        line = (d: Datum) => attributes.y(d)
        sign = attributes.x2 < attributes.x1 ? 1 : -1
        // If an event flag coincides with the x-axis, move the flag to the other side.
        tip = (d: Datum) => (line(d) === 0 || this.direction(d) === "down" ? line(d) + flagWidth : line(d) - flagWidth)
        const x0: number = attributes.x2
        const x1: number = x0 + sign * flagHeight / 2
        const x2: number = x0 + sign * flagHeight
        return (d: Datum): string => "M" + x0 + "," + line(d) + "L" + x1 + "," + tip(d) + "L" + x2 + "," + line(d) + "Z"
      default:
        throw new Error("Invalid axis name '" + this.axis + "'.")
    }
  }

  private hoverFlagPath(attributes: Object<any>) {
    const height: number = 12
    const width: number = 8
    let bottom: number
    let left: any
    const axisPadding: number = this.state.current.get("config").axisPaddingForFlags
    const margin = (axis: AxisPosition): number =>
      this.state.current.get("computed").axes.margins[axis] || this.state.current.get("config")[axis].margin

    return (d: Datum): string => {
      const line = Math.round(attributes[this.position](d))

      switch (this.position) {
        case "y":
          const dx: number =
            this.axis === "y1"
              ? -margin("y1") + (axisPadding - width) / 2 + 1
              : margin("y2") - width - (axisPadding - width) / 2
          bottom = Math.max(line + height / 2, height)
          left = attributes.x1 + dx
          break
        default:
          const dy: number =
            this.axis === "x1"
              ? margin("x1") - (axisPadding - height) / 2
              : height - margin("x2") + (axisPadding - height) / 2
          bottom = attributes.y1 + dy
          left = line - width / 2
      }

      const top: number = bottom - height
      const middle: number = (top + bottom) / 2
      const right: number = left + width

      return `M${left},${bottom}L${left},${top}L${right},${top}L${right},${middle}L${left},${middle}`
    }
  }

  private onFlagHover(attributes: Object<any>) {
    return (d: Datum, el: any): void => {
      d3.select(el.parentNode).classed("hover", true)

      const focusPoint: any = {
        axisOrientation: this.axis[0],
        color: this.color(d),
        // @TODO access axis formatter, format datum
        datum: this.axis[0] === "x" ? this.x(d) : this.y(d),
        description: this.description(d),
        x: attributes.x ? attributes.x(d) : attributes.x2,
        y: attributes.y ? attributes.y(d) : attributes.y2
      }

      // @TODO check if this is still required / what it does?
      // focusPoint.name = this.axis.type !== "quant" ? focusPoint.datum + ": " + options.name : options.name + ": " + focusPoint.datum
      this.events.emit(Events.FOCUS.FLAG.HOVER, focusPoint)
    }
  }

  private onFlagLeave(d: Datum, el: any): void {
    d3.select(el.parentNode).classed("hover", false)
    this.events.emit(Events.FOCUS.FLAG.OUT)
  }
}

export default Flag
