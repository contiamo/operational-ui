import Series from "../series"
import * as styles from "./styles"
import { assign, compact, defaults, filter, forEach, map, reduce } from "lodash/fp"
import { setLineAttributes, setPathAttributes, withD3Element } from "../../../utils/d3_utils"
import * as d3 from "d3-selection"
import Events from "../../../utils/event_catalog"
import {
  AxisPosition,
  D3Selection,
  Datum,
  EventBus,
  FlagRendererAccessors,
  FlagRendererConfig,
  Object,
  RendererAccessor,
  RendererClass,
  RendererOptions,
  RendererType,
  State,
} from "../../typings"

const defaultAccessors: Partial<FlagRendererAccessors> = {
  color: (series: Series, d: Datum) => d.color || series.legendColor(),
  description: (series: Series, d: Datum) => d.description || "",
  direction: (series: Series, d: Datum) => d.direction || "up",
  label: (series: Series, d: Datum) => d.label || "",
}

export type Options = RendererOptions<FlagRendererAccessors>

class Flag implements RendererClass<FlagRendererAccessors> {
  data: Datum[]
  el: D3Selection
  events: EventBus
  options: Options
  position: "x" | "y"
  scale: any // @TODO
  series: Series
  state: State
  type: RendererType = "flag"
  // Accessors
  color: RendererAccessor<string>
  description: RendererAccessor<string>
  direction: RendererAccessor<"up" | "down">
  label: RendererAccessor<string>
  x: RendererAccessor<number | Date | string>
  y: RendererAccessor<number | Date | string>
  // Config
  axis: AxisPosition = "x1"
  axisOffset: number = 10
  axisPadding: number = 15
  flagHeight: number = 10
  flagWidth: number = 8

  constructor(state: State, events: EventBus, el: D3Selection, data: Datum[], options: Options, series: Series) {
    this.state = state
    this.events = events
    this.series = series
    this.el = this.appendSeriesGroup(el)
    this.update(data, options)
  }

  // Public methods
  update(data: Datum[], options: Options): void {
    this.options = options
    this.assignAccessors(options.accessors)
    this.assignConfig(options.config)
    this.position = this.axis[0] as "x" | "y"
    this.data = filter((d: Datum): boolean => this.validate(this.position === "x" ? this.x(d) : this.y(d)))(data)
  }

  draw(): void {
    this.setAxisScales()

    const data: Datum[] = this.data
    const attributes: Object<any> = assign({ color: this.color })(this.getAttributes())
    const duration: number = this.state.current.get("config").duration
    const groups = this.el.selectAll("g").data(data)

    groups.exit().remove()

    const enteringGroups: D3Selection = groups.enter().append("svg:g")

    // Lines
    enteringGroups.append("line").call(setLineAttributes, attributes)

    groups
      .merge(enteringGroups)
      .select("line")
      .call(setLineAttributes, attributes, duration)

    // Flags
    const flagAttributes: Object<any> = {
      stroke: this.color,
      fill: this.color,
      path: this.flagPath(attributes),
    }

    enteringGroups
      .append("svg:path")
      .attr("class", "flag")
      .call(setPathAttributes, flagAttributes)

    groups
      .merge(enteringGroups)
      .select("path.flag")
      .transition()
      .duration(duration)
      .call(setPathAttributes, flagAttributes)

    // Labels
    enteringGroups
      .append("svg:text")
      .style("fill", (d: Datum): string => this.color(d))
      .text((d: Datum): string => this.label(d))
      .each(withD3Element(this.positionLabel(attributes).bind(this)))

    groups
      .merge(enteringGroups)
      .select("text")
      .style("fill", (d: Datum): string => this.color(d))
      .text((d: Datum): string => this.label(d))
      .each(withD3Element(this.positionLabel(attributes).bind(this)))

    // Hoverable flags
    const hoverFlagAttributes: any = {
      fill: this.color,
      stroke: this.color,
      path: this.hoverFlagPath(attributes).bind(this),
    }

    enteringGroups
      .append("svg:path")
      .attr("class", "hover-flag")
      .on("mouseenter", withD3Element(this.onFlagHover(attributes).bind(this)))
      .on("mouseleave", withD3Element(this.onFlagLeave.bind(this)))
      .call(setPathAttributes, hoverFlagAttributes)

    groups
      .merge(enteringGroups)
      .select("path.hover-flag")
      .transition()
      .duration(duration)
      .call(setPathAttributes, hoverFlagAttributes)
  }

  close(): void {
    this.el.remove()
  }

  dataForAxis(axis: "x" | "y"): any[] {
    return this.position === axis ? compact(map(this[axis])(this.data)) : []
  }

  // Private methods
  private validate(d: string | number | Date): boolean {
    return !!d || d === 0
  }

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

  private assignConfig(customConfig: Partial<FlagRendererConfig>): void {
    forEach.convert({ cap: false })((value: any, key: string): void => {
      ;(this as any)[key] = value
    })(customConfig)
  }

  private getAttributes(): Object<any> {
    const isXAxis: boolean = this.position === "x"
    const value = isXAxis ? this.x : this.y
    const scale = this.scale
    const drawingDims: Object<number> = this.state.current.get("computed").canvas.drawingDims

    switch (this.axis) {
      case "x1":
        return {
          x: (d: Datum): number => scale(value(d)),
          y1: drawingDims.height,
          y2: this.axisOffset,
        }
      case "x2":
        return {
          x: (d: Datum): number => scale(value(d)),
          y1: 0,
          y2: drawingDims.height - this.axisOffset,
        }
      case "y1":
        return {
          y: (d: Datum): number => scale(value(d)),
          x1: 0,
          x2: drawingDims.width - this.axisOffset,
        }
      case "y2":
        return {
          y: (d: Datum): number => scale(value(d)),
          x1: drawingDims.width,
          x2: this.axisOffset,
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
      const coordinates: Object<number> = {
        x: isXAxis ? x : x + sign * this.flagHeight,
        y: isXAxis ? y + sign * this.flagHeight : y,
      }

      label
        .transition()
        .duration(this.state.current.get("config").duration)
        .attr("x", coordinates.x)
        .attr("y", coordinates.y)

      const rotation: string = `rotate(${isXAxis ? -90 : 0}, ${coordinates.x}, ${coordinates.y})`

      // Unless an event flag is at the top of the chart, move label to below the line.
      const dx: number = this.axis[1] === "1" ? -dimensions.width : 0
      let dy: number
      switch (this.position) {
        case "x":
          dy = this.direction(d) === "down" ? -dimensions.height / 2 : dimensions.height / 2
          break
        case "y":
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
    let line: (d: Datum) => number
    let sign: number
    let tip: (d: Datum) => number

    switch (this.position) {
      case "x":
        line = (d: Datum) => attributes.x(d) + (this.direction(d) === "up" ? -1 : 1)
        sign = attributes.y2 < attributes.y1 ? 1 : -1
        tip = (d: Datum) => (this.direction(d) === "down" ? line(d) - this.flagWidth : line(d) + this.flagWidth)
        const y0: number = attributes.y2
        const y1: number = y0 + sign * this.flagHeight / 2
        const y2: number = y0 + sign * this.flagHeight
        return (d: Datum): string => `M${line(d)}, ${y0} L${tip(d)}, ${y1} L${line(d)}, ${y2}`
      case "y":
        line = (d: Datum) => attributes.y(d)
        sign = attributes.x2 < attributes.x1 ? 1 : -1
        // If an event flag coincides with the x-axis, move the flag to the other side.
        tip = (d: Datum) =>
          line(d) === 0 || this.direction(d) === "down" ? line(d) + this.flagWidth : line(d) - this.flagWidth
        const x0: number = attributes.x2
        const x1: number = x0 + sign * this.flagHeight / 2
        const x2: number = x0 + sign * this.flagHeight
        return (d: Datum): string => `M${x0}, ${line(d)} L${x1}, ${tip(d)} L${x2}, ${line(d)} Z`
      default:
        throw new Error("Invalid axis name '" + this.axis + "'.")
    }
  }

  private hoverFlagPath(attributes: Object<any>) {
    const height: number = 12
    const width: number = 8
    let bottom: number
    let left: any
    const margin = (axis: AxisPosition): number =>
      this.state.current.get("computed").axes.margins[axis] || this.state.current.get("config")[axis].margin

    return (d: Datum): string => {
      const line = Math.round(attributes[this.position](d))

      switch (this.position) {
        case "y":
          const dx: number =
            this.axis === "y1"
              ? -margin("y1") + (this.axisPadding - width) / 2 + 1
              : margin("y2") - width - (this.axisPadding - width) / 2
          bottom = Math.max(line + height / 2, height)
          left = attributes.x1 + dx
          break
        default:
          const dy: number =
            this.axis === "x1"
              ? margin("x1") - (this.axisPadding - height) / 2
              : height - margin("x2") + (this.axisPadding - height) / 2
          bottom = attributes.y1 + dy
          left = line - width / 2
      }

      const top = bottom - height
      const middle = (top + bottom) / 2
      const right = left + width
      return `M${left},${bottom} L${left},${top} L${right},${top} L${right},${middle} L${left},${middle}`
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
        y: attributes.y ? attributes.y(d) : attributes.y2,
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
