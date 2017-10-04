import AbstractFocus from "../utils/abstract_drawing_focus"
import FocusUtils from "../utils/focus_utils"
// import Events from "../utils/event_catalog"
import { uniqueId } from "lodash/fp"
import { IConfig, IFocus } from "./typings"

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
        .attr("class", "title clearfix")
        .text(datum.label())

      content
        .append("xhtml:li")
        .attr("class", "series clearfix")
        .html('<span class="value">' + datum.size() + "</span>")

      // Get label dimensions (has to be actually rendered in the page to do ctx)
      let labelDimensions: { height: number; width: number } = FocusUtils.labelDimensions(ctx.el)

      const drawingContainer: ClientRect = ctx.state.current.get("computed").canvas.elRect

      let drawingDimensions: { xMax: number; xMin: number; yMax: number; yMin: number } = {
        xMax: drawingContainer.left + config.width,
        xMin: drawingContainer.left,
        yMax: drawingContainer.top + config.height,
        yMin: drawingContainer.top,
      }
      let offset: number = focusPoint.offset + config.labelPadding

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
  // this.events.emit(Events.FOCUS.CLEAR)
  // }

  // // Remove focus (necessary when data changed or chart is resized)
  // refresh(): void {
  //   this.removeElementFocus()
  // }
}

export default Focus
