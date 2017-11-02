import AbstractFocus from "../utils/abstract_drawing_focus"
import FocusUtils from "../utils/focus_utils"
import Utils from "./focus_utils"
import { uniqueId, forEach, flow } from "lodash/fp"
import { IConfig, IFocus, IBreakdown, IBreakdowns, TSeriesEl, TD3SelectionNoData } from "./typings"
import * as styles from "./styles"

type TContainerMethod = (container: TD3SelectionNoData) => TD3SelectionNoData

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
        const breakdowns: IBreakdowns = Utils.computeBreakdowns(datum),
          container: TD3SelectionNoData = content.append("div").attr("class", styles.breakdownsContainer)

        const inputsTotal: number = Utils.computeBreakdownTotal(breakdowns.inputs),
          outputsTotal: number = Utils.computeBreakdownTotal(breakdowns.outputs),
          startsHerePercentage: number = Math.round(datum.journeyStarts * 100 / outputsTotal),
          endsHerePercentage: number = Math.round(datum.journeyEnds * 100 / inputsTotal),
          startsHereString: string = !isNaN(startsHerePercentage) ? `${startsHerePercentage}% of all outputs` : " ",
          endsHereString: string = !isNaN(endsHerePercentage) ? `${endsHerePercentage}% of all outputs` : " "

        // Add "Starts here" breakdown
        flow(
          Utils.addBreakdownContainer,
          Utils.addBreakdownTitle("Starts here"),
          this.addBreakdownBars(breakdowns.startsHere),
          Utils.addBreakdownComment(startsHereString)
        )(container)

        // Add "Ends here" breakdown
        flow(
          Utils.addBreakdownContainer,
          Utils.addBreakdownTitle("Ends here"),
          this.addBreakdownBars(breakdowns.endsHere),
          Utils.addBreakdownComment(endsHereString)
        )(container)

        // Add inputs breakdown
        flow(
          Utils.addBreakdownContainer,
          Utils.addBreakdownTitle("Inputs", ` (${inputsTotal})`),
          this.addBreakdownBars(breakdowns.inputs)
        )(container)

        // Add outputs breakdown
        flow(
          Utils.addBreakdownContainer,
          Utils.addBreakdownTitle("Outputs", ` (${outputsTotal})`),
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
      forEach(Utils.appendBreakdown(container))(breakdownItems)
      return container
    }
  }
}

export default Focus
