import Events from "./event_catalog"
import { every, map, some } from "lodash/fp"
import { IEvents, IObject, IState, TStateWriter, TD3Selection } from "./typings"
import * as d3 from "d3-selection"
import * as $ from "jquery"
import { withD3Element } from "./d3_utils"
import * as styles from "./styles"

const roundedUpWidth = (el: any): number => Math.ceil(el.getBoundingClientRect().width),
  roundedUpHeight = (el: any): number => Math.ceil(el.getBoundingClientRect().height)

function widthMargin(el: any): number {
  if (!el) {
    return 0
  }
  const style: any = window.getComputedStyle(el)
  return parseFloat(style.marginLeft) + parseFloat(style.marginRight)
}

function widthPadding(el: any): number {
  if (!el) {
    return 0
  }
  const style: any = window.getComputedStyle(el)
  return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
}

function heightMargin(el: any): number {
  if (!el) {
    return 0
  }
  const style: any = window.getComputedStyle(el)
  return parseFloat(style.marginTop) + parseFloat(style.marginBottom)
}

function totalWidth(el: any): number {
  if (!el) {
    return 0
  }
  const style: any = window.getComputedStyle(el),
    padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
    border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth)
  return roundedUpWidth(el) + widthMargin(el) - widthPadding(el) + border
}

function totalHeight(el: any): number {
  if (!el) {
    return 0
  }
  const style = window.getComputedStyle(el),
    padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom),
    border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
  return roundedUpHeight(el) + heightMargin(el) - padding + border
}

// Basic discrete color legend.
abstract class Legend {
  drawn: boolean = false
  events: IEvents
  float: string
  legend: TD3Selection
  position: string
  previousRequirements: any[]
  state: IState
  stateWriter: TStateWriter

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TD3Selection, options: IObject) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.position = options.position
    this.float = options.float
    this.legend = el
  }

  draw(): void {
    const computedSeries: IObject = this.state.current.get("computed").series
    // No legend
    if (!this.state.current.get("config").legend) {
      this.remove()
    } else if (this.drawn) {
      // Check if legend requirements are the same as before. If they are, call updateDraw(),
      // otherwise remove legend and draw from scratch.
      const sameReqs: boolean = every.convert({ cap: false })((req: string | boolean, i: number): boolean => {
        return this.previousRequirements[i] === req
      })(this.requirements())
      if (sameReqs) {
        this.updateDraw()
      } else {
        this.remove()
        this.initialDraw()
      }
    } else {
      this.initialDraw()
    }

    this.previousRequirements = this.requirements()
  }

  requirements(): (string | boolean)[] {
    return [this.state.current.get("config").legend, this.position, this.float]
  }

  initialDraw(): void {
    this.appendLegendElements()
    this.updateDraw()
  }

  // Only required if legend has multiple components, i.e. in bubble charts, the legend can
  // consist of both a color legend and a size legend.
  appendLegendElements(): void {
    return
  }

  updateDraw(): void {
    this.setFixedLegendDimensions()

    const legends: TD3Selection = this.legend
      .selectAll(`div.${styles.seriesLegend}`)
      .data(this.data(), this.dataKey.bind(this))

    legends.exit().remove()

    legends
      .enter()
      .append("div")
      .attr("class", styles.seriesLegend)
      .style("float", this.float)
      .on("mouseenter", withD3Element(this.onComponentHover.bind(this)))
      .each(
        withD3Element((d: IObject, el: HTMLElement): void => {
          const element: TD3Selection = d3.select(el)
          element.append("div").attr("class", "color")
          element.append("div").attr("class", "name")
        })
      )
      .merge(legends)
      .each(
        withD3Element((d: IObject, el: HTMLElement): void => {
          const element: TD3Selection = d3.select(el)
          element.select("div.color").style("background-color", this.colorAccessor.bind(this))
          element.select("div.name").html(this.labelAccessor.bind(this))
        })
      )

    this.updateComparisonLegend()

    this.drawn = this.data().length > 0
    this.updateDimensions()
  }

  // Currently only used for gauges.
  updateComparisonLegend(): void {
    return
  }

  setFixedLegendDimensions(): void {
    // remove fixed width before drawing
    this.legend.style("width", null)
    this.legend.style("height", null)

    if (this.position === "right") {
      this.legend.style("width", "")
      this.legend.style("height", this.state.current.get("config").height + "px")
    } else if (["top", "bottom"].indexOf(this.position) >= 0) {
      this.legend.style("width", "")
      this.legend.style("height", "")
    }
  }

  abstract data(): IObject[]

  abstract dataKey(d: IObject): string

  abstract colorAccessor(d: IObject): string

  abstract labelAccessor(d: IObject): string

  onComponentHover(d: IObject, el: HTMLElement): void {
    this.events.emit(Events.FOCUS.COMPONENT.MOUSEOVER, { component: d3.select(el), options: this.currentOptions(d) })
    d3.select(el).on("mouseleave", (): void => this.events.emit(Events.FOCUS.COMPONENT.MOUSEOUT))
  }

  abstract currentOptions(datum: IObject): IObject

  dimensions(): { height: number; width: number } {
    const legendNode: any = this.legend.node()
    return {
      height: this.legend ? totalHeight(legendNode) - heightMargin(legendNode) : 0,
      width: this.legend ? totalWidth(legendNode) - widthMargin(legendNode) : 0
    }
  }

  updateDimensions(): void {
    const legendNode: any = this.legend.node(),
      config: IObject = this.state.current.get("config"),
      colorBoxWidth: number = totalWidth(this.legend.select(".color").node()),
      seriesLegendPadding: any = widthPadding(this.legend.selectAll(`.${styles.seriesLegend}`).node())

    if (this.position === "right") {
      const w: number = config.width
      let lw: number = roundedUpWidth(legendNode) + widthMargin(legendNode)

      // Legend is wider than legend ratio
      if (lw / w > config.maxLegendRatio) {
        lw = w * config.maxLegendRatio
      }

      // Legend is wider than legend max
      if (lw > config.maxLegendWidth) {
        lw = config.maxLegendWidth
      }

      // Chart is smaller than chart min
      if (w - lw < config.minChartWithLegend) {
        lw = w - config.minChartWithLegend
      }

      // Legend is too small to display
      if (lw < config.minLegendWidth) {
        this.remove()
      } else {
        // If legend width has changed, width of legend text div needs to decrease as well.
        if (lw !== roundedUpWidth(legendNode) + widthMargin(legendNode)) {
          this.legend.attr("width", lw - widthMargin(legendNode))
          const newNameWidth: number = roundedUpWidth(legendNode) - seriesLegendPadding - colorBoxWidth
          // If any of the .name divs are wider than the max possible name width and only have
          // one word (i.e. won't be split onto 2 lines), remove the legend.
          some((name: any): boolean => {
            return name.innerHTML.split(" ").length === 1 && $(name).width() > newNameWidth
          })(this.legend.selectAll(".name").node())
            ? this.remove()
            : this.legend.selectAll(".name").attr("width", newNameWidth)
        }
        if (totalHeight(legendNode) > config.height) {
          this.remove()
        }
      }
    } else {
      const h: number = config.height
      const lh: number = roundedUpHeight(legendNode) + heightMargin(legendNode)

      // Legend is higher than legend ratio or chart is smaller than chart min
      if (lh / h > config.maxLegendRatio || h - lh < config.minChartWithLegend) {
        this.remove()
      } else {
        if (totalWidth(legendNode) > config.width) {
          this.remove()
        }
      }
    }
  }

  remove(): void {
    if (this.legend) {
      this.legend.node().innerHTML = ""
      this.legend = null
      this.drawn = false
    }
  }
}

export default Legend
