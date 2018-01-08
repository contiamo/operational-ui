import AbstractLegend from "../utils/legend"
import { filter, find, forEach, get, groupBy, keys, map } from "lodash/fp"
import { IObject } from "./typings"
import * as styles from "./styles"
import { withD3Element } from "../utils/d3_utils"

class Legend extends AbstractLegend {
  data(): any {
    return filter((d: IObject): boolean => !d.comparison)(this.state.current.get("computed").series.dataForLegend)
  }

  dataKey(d: IObject): string {
    return d.label
  }

  colorAccessor(d: IObject): string {
    return d.color
  }

  labelAccessor(d: IObject): string {
    return d.label
  }

  updateComparisonLegend(): void {
    // Only needed for gauges, if comparison value is given.
    const data: any[] = filter((d: IObject): boolean => d.comparison)(
      this.state.current.get("computed").series.dataForLegend
    )

    let legends: any = this.legend.selectAll(`div.comparison`).data(data)

    legends.exit().remove()

    let enter: any = legends
      .enter()
      .append("div")
      .attr("class", `comparison ${styles.comparisonLegend}`)
      .on("mouseenter", withD3Element(this.onComponentHover.bind(this)))

    enter.append("div").attr("class", styles.comparisonLegendLine)

    enter.append("div").attr("class", "name")

    enter
      .merge(legends)
      .select("div.name")
      .html((d: any): string => d.label)
  }

  currentOptions(datum: any): any {
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
            color: this.colorAccessor(datum),
            key: this.dataKey(datum)
          },
          type: "config"
        }
  }
}

export default Legend
