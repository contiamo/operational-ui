import AbstractFocus from "../utils/abstract_drawing_focus"
import FocusUtils from "../utils/focus_utils"
import { uniqueId, forEach, reduce, map, flow } from "lodash/fp"
import { IConfig, IFocus, IBreakdown, TLink, TNode, TSeriesEl, TD3SelectionNoData } from "./typings"
import * as styles from "./styles"

interface IBreakdowns {
  inputs: IBreakdown[]
  outputs: IBreakdown[]
  startsHere: IBreakdown[]
  endsHere: IBreakdown[]
}

type TContainerMethod = (container: TD3SelectionNoData) => TD3SelectionNoData

// Implementation
const computeBreakdowns = (node: TNode): IBreakdowns => {
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
}

const computeBreakdownTotal = (breakdowns: IBreakdown[]): number  => {
  return reduce((sum: number, item: IBreakdown): number => { return sum + item.size }, 0)(breakdowns)
}

const addBreakdownContainer = (content: TD3SelectionNoData): TD3SelectionNoData  => {
  return content.append("div").attr("class", styles.breakdownContainer)
}

const addBreakdownTitle = (title: string, subtitle ?: string): TContainerMethod  => {
  return (container: TD3SelectionNoData): TD3SelectionNoData => {
    container.append("span")
      .attr("class", styles.title)
      .text(title)
      .append("span")
      .text(subtitle)
    return container
  }
}

const appendBreakdown = (container: TD3SelectionNoData): (item: IBreakdown) => void => {
  return(item: IBreakdown): void => {
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
}

const addBreakdownComment = (comment: string): TContainerMethod => {
  return (container: TD3SelectionNoData): TD3SelectionNoData => {
    container.append("label")
      .attr("class", styles.breakdownCommentLabel)
      .text(comment)
    return container
  }
}

// There can only be an element focus in process flow diagrams
class Focus extends AbstractFocus {
  uid: string

  onElementHover(): (payload: { focusPoint: IFocus; d: any }) => void {
    return (payload: { focusPoint: IFocus; d: any }): void => {
      const focusPoint: IFocus = payload.focusPoint,
        datum: any = payload.d

      this.remove()

      const isNode: boolean = focusPoint.type === "node",
        config: IConfig = this.state.current.get("config")

      if (isNode ? !config.showNodeFocusLabels : !config.showLinkFocusLabels) {
        return
      }

      this.uid = uniqueId("elFocusLabel")

      FocusUtils.drawHidden(this.el, "element").style("pointer-events", "none")
      let content: TSeriesEl = this.el.append("xhtml:ul")

      content
        .append("xhtml:li")
        .attr("class", styles.title)
        .text(datum.label())
        .append("span")
        .text(` (${datum.size()})`)

      if (isNode) {
        const breakdowns: IBreakdowns = computeBreakdowns(datum),
          container: TD3SelectionNoData = content.append("div").attr("class", styles.breakdownsContainer)

        const inputsTotal: number = computeBreakdownTotal(breakdowns.inputs),
          outputsTotal: number = computeBreakdownTotal(breakdowns.outputs),
          startsHerePercentage: number = Math.round(datum.journeyStarts * 100 / outputsTotal),
          endsHerePercentage: number = Math.round(datum.journeyEnds * 100 / inputsTotal),
          startsHereString: string = !isNaN(startsHerePercentage) ? `${startsHerePercentage}% of all outputs` : " ",
          endsHereString: string = !isNaN(endsHerePercentage) ? `${endsHerePercentage}% of all outputs` : " "

        // Add "Starts here" breakdown
        flow(
          addBreakdownContainer,
          addBreakdownTitle("Starts here"),
          this.addBreakdownBars(breakdowns.startsHere),
          addBreakdownComment(startsHereString)
        )(container)

        // Add "Ends here" breakdown
        flow(
          addBreakdownContainer,
          addBreakdownTitle("Ends here"),
          this.addBreakdownBars(breakdowns.endsHere),
          addBreakdownComment(endsHereString)
        )(container)

        // Add inputs breakdown
        flow(
          addBreakdownContainer,
          addBreakdownTitle("Inputs", ` (${inputsTotal})`),
          this.addBreakdownBars(breakdowns.inputs)
        )(container)

        // Add outputs breakdown
        flow(
          addBreakdownContainer,
          addBreakdownTitle("Outputs", ` (${outputsTotal})`),
          this.addBreakdownBars(breakdowns.outputs)
        )(container)

        if (datum.singleNodeJourneys > 0) {
          content
            .append("xhtml:li")
            .attr("class", styles.title)
            .text(`[!] ${datum.singleNodeJourneys} single node visits (not included in the above stats)`)
        }
      }

      // Get label dimensions (has to be actually rendered in the page to do this)
      let labelDimensions: { height: number; width: number } = FocusUtils.labelDimensions(this.el)

      const drawingContainer: ClientRect = this.state.current.get("computed").canvas.elRect

      let drawingDimensions: { xMax: number; xMin: number; yMax: number; yMin: number } = {
        xMax: drawingContainer.left + config.width,
        xMin: drawingContainer.left,
        yMax: drawingContainer.top + config.height,
        yMin: drawingContainer.top,
      }
      let offset: number = focusPoint.offset + config.nodeBorderWidth + config.labelOffset

      FocusUtils.positionLabel(this.el, focusPoint, labelDimensions, drawingDimensions, offset)
    }
  }

  addBreakdownBars(breakdownItems: IBreakdown[]): TContainerMethod {
    return (container: TD3SelectionNoData): TD3SelectionNoData => {
      forEach(appendBreakdown(container))(breakdownItems)
      return container
    }
  }
}

export default Focus
