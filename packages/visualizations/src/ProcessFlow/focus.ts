import AbstractFocus from "../utils/abstract_drawing_focus"
import FocusUtils from "../utils/focus_utils"
import Events from "../utils/event_catalog"
import * as d3 from "d3-selection"
import { all, uniqueId } from "lodash/fp"

// There can only be an element focus in sankey diagrams
class Focus extends AbstractFocus {
  uid: string

  onElementHover(ctx: any): (payload: { focusPoint: any; d: any }) => void {
    return function(payload: { focusPoint: any; d: any }): void {
      const focusPoint: any = payload.focusPoint,
        datum: any = payload.d

      ctx.remove()

      const isNode: boolean = focusPoint.type === "node",
        config: any = ctx.state.current.get("config")
      // All conditions must be true to render focus label.
      let condition: boolean = isNode ? config.showNodeFocusLabels : config.showLinkFocusLabels

      // if (isNode ? !config.showNodeFocusLabels : !config.showLinkFocusLabels) {
      //   return
      // }

      ctx.uid = uniqueId("elFocusLabel")

      FocusUtils.drawHidden(ctx.el, "element").style("pointer-events", "none")
      let content: any = ctx.el.append("xhtml:ul")

      content
        .append("xhtml:li")
        .attr("class", "title clearfix")
        .text(datum.label())

      // let valueFormatter: any = ctx.state.current.config.labelFormatter

      // let percentageText: string = datum.percentage
      //   ? "(" + valueFormatter(datum.percentage) + "%" + (isNode ? "" : " of " + datum.source.label()) + ")"
      //   : ""

      content
        .append("xhtml:li")
        .attr("class", "series clearfix")
        .html(
          '<span class="value">' +
            // valueFormatter(datum.value) +
            datum.size() +
            "</span>",
          //   '</span> \
          // <span class="percentage">' +
          //   percentageText +
          //   "</span>",
        )

      // Get label dimensions (has to be actually rendered in the page to do ctx)
      let labelDimensions: { height: number; width: number } = FocusUtils.labelDimensions(ctx.el)

      const drawingContainer: ClientRect = ctx.state.current.get("computed").canvas.elRect

      // const panelContainer: ClientRect = ctx.state.current.computed.series[focusPoint.sid].sankey
      //   .node()
      //   .getBoundingClientRect()
      // const panelPaddingTop: number = parseInt(
      //   ctx.state.current.computed.series[focusPoint.sid].sankey.style("padding-top"),
      //   10,
      // )

      let drawingDimensions: { xMax: number; xMin: number; yMax: number; yMin: number } = {
        xMax: drawingContainer.left + config.width,
        xMin: drawingContainer.left,
        yMax: drawingContainer.top + config.height,
        yMin: drawingContainer.top,
      }
      let offset: number = focusPoint.offset + config.labelPadding
      // focusPoint.x -= focusPoint.offset

      FocusUtils.positionLabel(ctx.el, focusPoint, labelDimensions, drawingDimensions, offset)
    }
  }

  // onElementOut(): void {
  //   this.removeElementFocus()
  // }
  //
  // onMouseLeave(): void {
  //   this.removeElementFocus()
  // }
  //
  // removeElementFocus(): void {
  //   this.events.emit(Events.FOCUS.CLEAR)
  // }

  // // Remove focus (necessary when data changed or chart is resized)
  // refresh(): void {
  //   this.removeElementFocus()
  // }
}

export default Focus
