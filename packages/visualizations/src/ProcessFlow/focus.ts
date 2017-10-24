import AbstractFocus from "../utils/abstract_drawing_focus"
import FocusUtils from "../utils/focus_utils"
import { uniqueId, forEach, reduce, map } from "lodash/fp"
import { IConfig, IFocus, IBreakdown, TLink, TNode } from "./typings"
import * as styles from "./styles"

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
        .attr("class", `${styles.title} clearfix`)
        .text(datum.label())

      content
        .append("xhtml:li")
        .attr("class", "series clearfix")
        .html('<span class="value">' + datum.size() + "</span>")

      if (isNode) {
        const breakdowns: { inputs: IBreakdown[], outputs: IBreakdown[] } = ctx.computeBreakdowns(datum)
        const container: any = content.append("div").attr("class", styles.breakdownsContainer)
        ctx.addBreakdowns("Inputs", container, breakdowns.inputs)
        ctx.addBreakdowns("Outputs", container, breakdowns.outputs)

        const outputTotal: number = reduce((memo: number, link: any): number => {
          return memo + link.size()
        }, 0)(datum.sourceLinks)
        content.append("xhtml:li")
          .attr("class", "breakdown-difference")
          .text("Difference: " + (datum.size() - outputTotal))
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

  computeBreakdowns(node: TNode): { inputs: IBreakdown[], outputs: IBreakdown[] } {
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
    return { inputs, outputs}
  }

  addBreakdowns(title: string, content: any, breakdownItems: IBreakdown[]): void {
    const container: any = content.append("div").attr("class", styles.breakdownContainer)

    container.append("span")
      .attr("class", styles.title)
      .text(title)

    forEach((item: IBreakdown): void => {
      const breakdown: any = container.append("div")
        .attr("class", styles.breakdown)

      breakdown
        .append("label")
        .attr("class", styles.breakdownLabel)
        .text(item.label)

      const backgroundBar: any = breakdown.append("div")
        .attr("class", styles.breakdownBackgroundBar)


      backgroundBar.append("div")
        .attr("class", styles.breakdownBar)
        .style("width", item.percentage + "%")

      backgroundBar.append("div")
        .attr("class", styles.breakdownText)
        .text(item.size + " (" + item.percentage + "%)")

    })(breakdownItems)
  }
}

export default Focus
