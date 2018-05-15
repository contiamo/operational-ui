import Events from "../../utils/event_catalog"
import * as d3 from "d3-selection"
import { get } from "lodash/fp"
import * as styles from "../../utils/styles"
import { withD3Element } from "../../utils/d3_utils"
import { ComponentConfigOptions, D3Selection, EventBus, Legend, LegendDatum, State, StateWriter } from "../typings"

class ChartLegend implements Legend {
  private data: LegendDatum[]
  private events: EventBus
  private legend: D3Selection
  private state: State
  private stateWriter: StateWriter
  el: D3Selection

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
  }

  setData(data: LegendDatum[]): void {
    this.data = data
  }

  draw(): void {
    // No legend
    if (!this.state.current.get("config").legend || this.data.length === 0) {
      this.remove()
      return
    }

    this.el.attr("visibility", "visible")
    const legends: D3Selection = this.el.selectAll(`div.${styles.seriesLegend}`).data(this.data, get("label"))

    legends.exit().remove()

    legends
      .enter()
      .append("div")
      .attr("class", styles.seriesLegend)
      .style("float", "left")
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
  }

  setWidth(width: number): void {
    this.el.style("width", width)
  }

  remove(): void {
    this.el.node().innerHTML = ""
    this.el.attr("visibility", "hidden")
  }
}

export default ChartLegend
