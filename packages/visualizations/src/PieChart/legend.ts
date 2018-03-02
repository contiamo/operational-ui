import Events from "../utils/event_catalog"
import { IEvents, IObject, IState, TStateWriter, TD3Selection } from "./typings"
import * as d3 from "d3-selection"
import * as $ from "jquery"
import { every, filter, find, forEach, get, groupBy, keys, map, some } from "lodash/fp"
import * as localStyles from "./styles"
import * as globalStyles from "../utils/styles"
import { withD3Element } from "../utils/d3_utils"
import { roundedUpHeight, widthPadding, heightMargin, totalWidth } from "../utils/legend_utils"

class Legend {
  events: IEvents
  legend: TD3Selection
  state: IState
  stateWriter: TStateWriter

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TD3Selection) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.legend = el
  }

  draw(): void {
    // No legend
    if (!this.state.current.get("config").legend) {
      this.remove()
      return
    }

    const legends: TD3Selection = this.legend
      .selectAll(`div.${globalStyles.seriesLegend}`)
      .data(this.data(), get("label"))

    legends.exit().remove()

    legends
      .enter()
      .append("div")
      .attr("class", globalStyles.seriesLegend)
      .style("float", "left")
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
          element.select("div.color").style("background-color", get("color"))
          element.select("div.name").html(get("label"))
        })
      )

    this.updateComparisonLegend()

    this.updateDimensions()
  }

  updateComparisonLegend(): void {
    // Only needed for gauges, if comparison value is given.
    const data: IObject[] = filter((d: IObject): boolean => d.comparison)(
      this.state.current.get("computed").series.dataForLegend
    )

    const legends: TD3Selection = this.legend.selectAll(`div.comparison`).data(data)

    legends.exit().remove()

    const enter: TD3Selection = legends
      .enter()
      .append("div")
      .attr("class", `comparison ${localStyles.comparisonLegend}`)
      .on("mouseenter", withD3Element(this.onComponentHover.bind(this)))

    enter.append("div").attr("class", localStyles.comparisonLegendLine)

    enter.append("div").attr("class", "name")

    enter
      .merge(legends)
      .select("div.name")
      .html((d: IObject): string => d.label)
  }

  data(): IObject[] {
    return filter((d: IObject): boolean => !d.comparison)(this.state.current.get("computed").series.dataForLegend)
  }

  onComponentHover(d: IObject, el: HTMLElement): void {
    this.events.emit(Events.FOCUS.COMPONENT.MOUSEOVER, { component: d3.select(el), options: this.currentOptions(d) })
    d3.select(el).on("mouseleave", (): void => this.events.emit(Events.FOCUS.COMPONENT.MOUSEOUT))
  }

  currentOptions(datum: IObject): IObject {
    return datum.type === "comparison"
      ? {
          options: {
            data: datum.data
          },
          seriesType: "comparison",
          type: "series"
        }
      : {
          options: {
            color: datum.color,
            key: datum.label
          },
          type: "config"
        }
  }

  updateDimensions(): void {
    const legendNode: any = this.legend.node(),
      config: IObject = this.state.current.get("config"),
      colorBoxWidth: number = totalWidth(this.legend.select(".color").node()),
      seriesLegendPadding: any = widthPadding(this.legend.selectAll(`.${globalStyles.seriesLegend}`).node())

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

  remove(): void {
    this.legend.node().innerHTML = ""
  }
}

export default Legend
