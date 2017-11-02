import AbstractFocus from "../utils/abstract_drawing_focus"
import FocusUtils from "../utils/focus_utils"
import { uniqueId, forEach, reduce, map, flow } from "lodash/fp"
import { IConfig, IFocus, IBreakdown, TLink, TNode } from "./typings"
import * as styles from "./styles"

interface IBreakdowns {
  inputs: IBreakdown[]
  outputs: IBreakdown[]
  startsHere: IBreakdown[]
  endsHere: IBreakdown[]
}

// There can only be an element focus in process flow diagrams
class Focus extends AbstractFocus {
  uid: string

  onElementHover(ctx: any): (payload: { focusPoint: IFocus; d: any }) => void {
    return function(payload: { focusPoint: IFocus; d: any }): void {
      const focusPoint: IFocus = payload.focusPoint,
        datum: any = payload.d

      ctx.remove()

      const isNode: boolean = focusPoint.type === "node",
        config: IConfig = ctx.state.current.get("config")

      if (isNode ? !config.showNodeFocusLabels : !config.showLinkFocusLabels) {
        return
      }

      ctx.uid = uniqueId("elFocusLabel")

      FocusUtils.drawHidden(ctx.el, "element").style("pointer-events", "none")
      let content: any = ctx.el.append("xhtml:ul")

      content
        .append("xhtml:li")
        .attr("class", styles.title)
        .text(datum.label())
        .append("span")
        .text(` (${datum.size()})`)

      if (isNode) {
        const breakdowns: IBreakdowns = ctx.computeBreakdowns(datum),
          container: any = content.append("div").attr("class", styles.breakdownsContainer)

        const inputsTotal: number = ctx.computeBreakdownTotal(breakdowns.inputs),
          outputsTotal: number = ctx.computeBreakdownTotal(breakdowns.outputs),
          startsHerePercentage: number = Math.round(datum.journeyStarts * 100 / outputsTotal),
          endsHerePercentage: number = Math.round(datum.journeyEnds * 100 / inputsTotal),
          startsHereString: string = !isNaN(startsHerePercentage) ? `${startsHerePercentage}% of all outputs` : " ",
          endsHereString: string = !isNaN(endsHerePercentage) ? `${endsHerePercentage}% of all outputs` : " "

        // Add "Starts here" breakdown
        flow(
          ctx.addBreakdownContainer,
          ctx.addBreakdownTitle("Starts here"),
          ctx.addBreakdownBars(breakdowns.startsHere),
          ctx.addBreakdownComment(startsHereString)
        )(container)

        // Add "Ends here" breakdown
        flow(
          ctx.addBreakdownContainer,
          ctx.addBreakdownTitle("Ends here"),
          ctx.addBreakdownBars(breakdowns.endsHere),
          ctx.addBreakdownComment(endsHereString)
        )(container)

        // Add inputs breakdown
        flow(
          ctx.addBreakdownContainer,
          ctx.addBreakdownTitle("Inputs", ` (${inputsTotal})`),
          ctx.addBreakdownBars(breakdowns.inputs)
        )(container)

        // Add outputs breakdown
        flow(
          ctx.addBreakdownContainer,
          ctx.addBreakdownTitle("Outputs", ` (${outputsTotal})`),
          ctx.addBreakdownBars(breakdowns.outputs)
        )(container)

        if (datum.singleNodeJourneys > 0) {
          content
            .append("xhtml:li")
            .attr("class", styles.title)
            .text(`[!] ${datum.singleNodeJourneys} single node visits (not included in the above stats)`)
        }
      }

      // Get label dimensions (has to be actually rendered in the page to do ctx)
      let labelDimensions: { height: number; width: number } = FocusUtils.labelDimensions(ctx.el)

      const drawingContainer: ClientRect = ctx.state.current.get("computed").canvas.elRect

      let drawingDimensions: { xMax: number; xMin: number; yMax: number; yMin: number } = {
        xMax: drawingContainer.left + config.width,
        xMin: drawingContainer.left,
        yMax: drawingContainer.top + config.height,
        yMin: drawingContainer.top,
      }
      let offset: number = focusPoint.offset + config.nodeBorderWidth + config.labelOffset

      FocusUtils.positionLabel(ctx.el, focusPoint, labelDimensions, drawingDimensions, offset)
    }
  }

  computeBreakdowns(node: TNode): IBreakdowns {
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

  computeBreakdownTotal(breakdowns: IBreakdown[]): number {
    return reduce((sum: number, item: IBreakdown): number => { return sum + item.size }, 0)(breakdowns)
  }

  addBreakdownContainer(content: any): any {
    return content.append("div").attr("class", styles.breakdownContainer)
  }

  addBreakdownTitle(title: string, subtitle?: string): any {
    return (container: any): any => {
      container.append("span")
        .attr("class", styles.title)
        .text(title)
        .append("span")
        .text(subtitle)
      return container
    }
  }

  addBreakdownBars(breakdownItems: IBreakdown[]): any {
    return (container: any): any => {
      forEach((item: IBreakdown): void => {
        const breakdown: any = container.append("div")
          .attr("class", styles.breakdown)

        if (item.label) {
          breakdown
            .append("label")
            .attr("class", styles.breakdownLabel)
            .text(item.label)
        }

        const backgroundBar: any = breakdown.append("div")
          .attr("class", styles.breakdownBackgroundBar)

        backgroundBar.append("div")
          .attr("class", styles.breakdownBar)
          .style("width", item.percentage + "%")

        backgroundBar.append("div")
          .attr("class", styles.breakdownText)
          .text(item.size + " (" + item.percentage + "%)")
      })(breakdownItems)

      return container
    }
  }

  addBreakdownComment(comment: string): any {
    return (container: any): any => {
      container.append("label")
        .attr("class", styles.breakdownCommentLabel)
        .text(comment)
      return container
    }
  }
}

export default Focus
