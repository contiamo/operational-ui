import AbstractFocus from "../utils/focus"
import FocusUtils from "../utils/focus_utils"
import { flow, forEach, map, reduce, sortBy, uniqueId } from "lodash/fp"
import { IBreakdown, IConfig, IFocus, IObject, TD3Selection,TLink, TNode, TSeriesEl } from "./typings"
import * as styles from "./styles"

interface IBreakdowns {
  inputs: IBreakdown[]
  outputs: IBreakdown[]
  startsHere: IBreakdown[]
  endsHere: IBreakdown[]
}

// There can only be an element focus in process flow diagrams
class Focus extends AbstractFocus {

  onElementHover(payload: { focusPoint: IFocus; d: TNode | TLink }): void {
    // Remove the current focus label, if there is one
    this.remove()

    // Check if focus labels should be displayed for the element type.
    const focusPoint: IFocus = payload.focusPoint,
      datum: any = payload.d,
      isNode: boolean = focusPoint.type === "node",
      config: IConfig = this.state.current.get("config")

    if (isNode ? !config.showNodeFocusLabels : !config.showLinkFocusLabels) {
      return
    }

    // Render the focus label hidden initially to allow placement calculations
    FocusUtils.drawHidden(this.el, "element").style("pointer-events", "none")
    let content: TSeriesEl = this.el.append("xhtml:ul")

    content
      .append("xhtml:li")
      .attr("class", styles.title)
      .text(datum.label())
      .append("span")
      .text(` (${datum.size()})`)

    if (datum.content().length > 0) {
      this.appendContent(content, datum.content())
    }

    if (isNode) {
      this.addNodeBreakdowns(content, datum)
      this.addSingleNodeVisitsComment(content, datum)
    }

    // Get label dimensions (has to be actually rendered in the page to do this) and position label
    const labelDimensions: { height: number; width: number } = FocusUtils.labelDimensions(this.el),
      drawingDimensions: { xMax: number; xMin: number; yMax: number; yMin: number } = this.getDrawingDimensions(),
      offset: number = focusPoint.offset + config.nodeBorderWidth + config.labelOffset

    FocusUtils.positionLabel(this.el, focusPoint, labelDimensions, drawingDimensions, offset)
  }

  appendContent(container: TD3Selection, content: IObject[]): void {
    let contentContainer: TD3Selection = container.append("div").attr("class", styles.content)

    forEach((contentItem: IObject): void => {
      contentContainer
        .append("xhtml:li")
        .attr("class", styles.title)
        .text(`${contentItem.key}: `)
        .append("span")
        .text(contentItem.value)
    })(content)
  }

  addNodeBreakdowns(content: TSeriesEl, datum: TNode): void {
    const breakdowns: IBreakdowns = computeBreakdowns(datum),
      container: TD3Selection = content.append("div").attr("class", styles.breakdownsContainer),
      inputsTotal: number = computeBreakdownTotal(breakdowns.inputs),
      outputsTotal: number = computeBreakdownTotal(breakdowns.outputs),
      startsHerePercentage: number = Math.round(datum.journeyStarts * 100 / outputsTotal),
      endsHerePercentage: number = Math.round(datum.journeyEnds * 100 / inputsTotal),
      startsHereString: string = !isNaN(startsHerePercentage) ? `${startsHerePercentage}% of all outputs` : " ",
      endsHereString: string = !isNaN(endsHerePercentage) ? `${endsHerePercentage}% of all outputs` : " "

    // Add "Starts here" breakdown
    flow(
      addBreakdownContainer,
      addBreakdownTitle("Starts here"),
      addBreakdownBars(breakdowns.startsHere),
      addBreakdownComment(startsHereString)
    )(container)

    // Add "Ends here" breakdown
    flow(
      addBreakdownContainer,
      addBreakdownTitle("Ends here"),
      addBreakdownBars(breakdowns.endsHere),
      addBreakdownComment(endsHereString)
    )(container)

    // Add inputs breakdown
    flow(
      addBreakdownContainer,
      addBreakdownTitle("Inputs", ` (${inputsTotal})`),
      addBreakdownBars(breakdowns.inputs)
    )(container)

    // Add outputs breakdown
    flow(
      addBreakdownContainer,
      addBreakdownTitle("Outputs", ` (${outputsTotal})`),
      addBreakdownBars(breakdowns.outputs)
    )(container)
  }

  addSingleNodeVisitsComment(content: TSeriesEl, datum: TNode): void {
    if (datum.singleNodeJourneys === 0) {
      return
    }
    content
      .append("xhtml:li")
      .attr("class", styles.title)
      .text(`[!] ${datum.singleNodeJourneys} single node visits (not included in the above stats)`)
  }

  getDrawingDimensions(): { xMax: number; xMin: number; yMax: number; yMin: number } {
    const drawingContainer: ClientRect = this.state.current.get("computed").canvas.elRect,
      config: IConfig = this.state.current.get("config")

    return {
      xMax: drawingContainer.left + config.width,
      xMin: drawingContainer.left,
      yMax: drawingContainer.top + config.height,
      yMin: drawingContainer.top,
    }
  }
}

// Helper functions
function computeBreakdowns(node: TNode): IBreakdowns {
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

function computeBreakdownTotal(breakdowns: IBreakdown[]): number {
  return reduce((sum: number, item: IBreakdown): number => { return sum + item.size }, 0)(breakdowns)
}

function addBreakdownContainer(content: TD3Selection): TD3Selection {
  return content.append("div").attr("class", styles.breakdownContainer)
}

function addBreakdownTitle(title: string, subtitle?: string) {
  return (container: TD3Selection): TD3Selection => {
    container.append("span")
      .attr("class", styles.title)
      .text(title)
      .append("span")
      .text(subtitle)
    return container
  }
}

function addBreakdownBars(breakdownItems: IBreakdown[]) {
  const sortedItems: IBreakdown[] = sortBy((item: IBreakdown): number => -item.size)(breakdownItems)
  return (container: TD3Selection): TD3Selection => {
    forEach(appendBreakdown(container))(sortedItems)
    return container
  }
}

function appendBreakdown(container: TD3Selection) {
  return (item: IBreakdown): void => {
    const breakdown: TD3Selection = container.append("div")
      .attr("class", styles.breakdown)

    if (item.label) {
      breakdown
        .append("label")
        .attr("class", styles.breakdownLabel)
        .text(item.label)
    }

    const backgroundBar: TD3Selection = breakdown.append("div")
      .attr("class", styles.breakdownBackgroundBar)

    backgroundBar.append("div")
      .attr("class", styles.breakdownBar)
      .style("width", item.percentage + "%")

    backgroundBar.append("div")
      .attr("class", styles.breakdownText)
      .text(item.size + " (" + item.percentage + "%)")
  }
}

function addBreakdownComment(comment: string) {
  return (container: TD3Selection): TD3Selection => {
    container.append("label")
      .attr("class", styles.breakdownCommentLabel)
      .text(comment)
    return container
  }
}

export default Focus
