import * as styles from "./styles"
import { reduce, map } from "lodash/fp"
import { IBreakdown, IBreakdowns, TLink, TNode, TD3SelectionNoData } from "./typings"

type TContainerMethod = (container: TD3SelectionNoData) => TD3SelectionNoData

let FocusUtils: any = {
  computeBreakdowns: (node: TNode): IBreakdowns => {
    const inputs: IBreakdown[] = map((link: TLink): IBreakdown => {
      const size: number = link.size()
      return {
        label: link.source().label(),
        size: size,
        percentage: Math.round(size * 100 / node.size())
      }
    })(node.targetLinks)
    const outputs: IBreakdown[] = map((link: TLink): IBreakdown => {
      const size: number = link.size()
      return {
        label: link.target().label(),
        size: size,
        percentage: Math.round(size * 100 / node.size())
      }
    })(node.sourceLinks)
    const startsHere: IBreakdown[] = [{
      size: node.journeyStarts,
      percentage: Math.round(node.journeyStarts * 100 / node.size())
    }]
    const endsHere: IBreakdown[] = [{
      size: node.journeyEnds,
      percentage: Math.round(node.journeyEnds * 100 / node.size())
    }]
    return { inputs, outputs, startsHere, endsHere }
  },

  computeBreakdownTotal: (breakdowns: IBreakdown[]): number => {
    return reduce((sum: number, item: IBreakdown): number => { return sum + item.size }, 0)(breakdowns)
  },

  addBreakdownContainer: (content: TD3SelectionNoData): TD3SelectionNoData => {
    return content.append("div").attr("class", styles.breakdownContainer)
  },

  addBreakdownTitle: (title: string, subtitle?: string): TContainerMethod => {
    return (container: TD3SelectionNoData): TD3SelectionNoData => {
      container.append("span")
        .attr("class", styles.title)
        .text(title)
        .append("span")
        .text(subtitle)
      return container
    }
  },

  appendBreakdown: (container: TD3SelectionNoData): (item: IBreakdown) => void => {
    return (item: IBreakdown): void => {
      const breakdown: TD3SelectionNoData = container.append("div")
        .attr("class", styles.breakdown)

      if (item.label) {
        breakdown
          .append("label")
          .attr("class", styles.breakdownLabel)
          .text(item.label)
      }

      const backgroundBar: TD3SelectionNoData = breakdown.append("div")
        .attr("class", styles.breakdownBackgroundBar)

      backgroundBar.append("div")
        .attr("class", styles.breakdownBar)
        .style("width", item.percentage + "%")

      backgroundBar.append("div")
        .attr("class", styles.breakdownText)
        .text(item.size + " (" + item.percentage + "%)")
    }
  },

  addBreakdownComment: (comment: string): TContainerMethod => {
    return (container: TD3SelectionNoData): TD3SelectionNoData => {
      container.append("label")
        .attr("class", styles.breakdownCommentLabel)
        .text(comment)
      return container
    }
  }
}

export default FocusUtils
