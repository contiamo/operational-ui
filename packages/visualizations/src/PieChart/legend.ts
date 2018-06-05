import Events from "../shared/event_catalog"
import * as d3 from "d3-selection"
import { every, filter, find, forEach, get, groupBy, keys, map, some } from "lodash/fp"
import * as localStyles from "./styles"
import * as globalStyles from "../shared/styles"
import { withD3Element } from "../utils/d3_utils"
import { roundedUpHeight, widthPadding, heightMargin, totalWidth } from "../utils/legend_utils"
import {
  ComponentConfigInfo,
  D3Selection,
  EventBus,
  Legend,
  LegendDatum,
  PieChartConfig,
  State,
  StateWriter,
} from "./typings"

class PieChartLegend implements Legend {
  private events: EventBus
  private legend: D3Selection
  private state: State
  private stateWriter: StateWriter

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection) {
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

    const legends: D3Selection = this.legend
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
        withD3Element((d: LegendDatum, el: HTMLElement): void => {
          const element: D3Selection = d3.select(el)
          element.append("div").attr("class", "color")
          element.append("div").attr("class", "name")
        })
      )
      .merge(legends)
      .each(
        withD3Element((d: LegendDatum, el: HTMLElement): void => {
          const element: D3Selection = d3.select(el)
          element.select("div.color").style("background-color", get("color"))
          element.select("div.name").html(get("label"))
        })
      )

    this.updateComparisonLegend()

    this.updateDimensions()
  }

  private updateComparisonLegend(): void {
    // Only needed for gauges, if comparison value is given.
    const data: LegendDatum[] = filter((d: LegendDatum): boolean => d.comparison)(
      this.state.current.get("computed").series.dataForLegend
    )

    const legends: D3Selection = this.legend.selectAll(`div.comparison`).data(data)

    legends.exit().remove()

    const enter: D3Selection = legends
      .enter()
      .append("div")
      .attr("class", `comparison ${localStyles.comparisonLegend}`)
      .on("mouseenter", withD3Element(this.onComponentHover.bind(this)))

    enter.append("div").attr("class", localStyles.comparisonLegendLine)

    enter.append("div").attr("class", "name")

    enter
      .merge(legends)
      .select("div.name")
      .html((d: LegendDatum): string => d.label)
  }

  private data(): LegendDatum[] {
    return filter((d: LegendDatum): boolean => !d.comparison)(this.state.current.get("computed").series.dataForLegend)
  }

  private onComponentHover(d: LegendDatum, el: HTMLElement): void {
    this.events.emit(Events.FOCUS.COMPONENT.HOVER, { component: d3.select(el), options: this.currentOptions(d) })
  }

  private currentOptions(datum: LegendDatum): ComponentConfigInfo {
    return datum.comparison
      ? {
          key: datum.label,
          seriesType: "comparison",
          type: "series",
        }
      : {
          key: datum.label,
          type: "series",
        }
  }

  private updateDimensions(): void {
    const legendNode: Element = this.legend.node()
    const config: PieChartConfig = this.state.current.get("config")
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

export default PieChartLegend
