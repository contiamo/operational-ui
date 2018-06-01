import { drawHidden, labelDimensions, positionLabel } from "../utils/focus_utils"
import Events from "../shared/event_catalog"
import { flow, forEach, map, reduce, sortBy, uniqueId } from "lodash/fp"
import {
  D3Selection,
  Dimensions,
  EventBus,
  Focus,
  FocusPoint,
  HoverPayload,
  Object,
  ProcessFlowConfig,
  SeriesEl,
  State,
  StateWriter,
  TLink,
  TNode,
} from "./typings"
import * as styles from "./styles"

interface Breakdown {
  label?: string
  size: number
  percentage: number
}

interface Breakdowns {
  inputs: Breakdown[]
  outputs: Breakdown[]
  startsHere: Breakdown[]
  endsHere: Breakdown[]
}

// There can only be an element focus in process flow diagrams
class ProcessFlowFocus implements Focus {
  private el: SeriesEl
  private state: State
  private stateWriter: StateWriter
  private events: EventBus

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.events.on(Events.FOCUS.ELEMENT.HOVER, this.onElementHover.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.OUT, this.onElementOut.bind(this))
    this.events.on(Events.CHART.OUT, this.onMouseLeave.bind(this))
  }

  private onElementHover(payload: HoverPayload): void {
    // Remove the current focus label, if there is one
    this.remove()
    if (payload.hideLabel) {
      return
    }

    // Check if focus labels should be displayed for the element type.
    const focusPoint: FocusPoint = payload.focusPoint,
      datum: any = payload.d,
      isNode: boolean = focusPoint.type === "node",
      config: ProcessFlowConfig = this.state.current.get("config")

    if (isNode ? !config.showNodeFocusLabels : !config.showLinkFocusLabels) {
      return
    }

    // Render the focus label hidden initially to allow placement calculations
    const labelPosition: string = this.state.current.get("config").focusLabelPosition
    drawHidden(this.el, "element").style("pointer-events", "none")
    const content: SeriesEl = this.el.append("xhtml:ul")

    content
      .append("xhtml:li")
      .attr("class", styles.title)
      .text(datum.label())
      .append("span")
      .text(` (${this.state.current.get("config").numberFormatter(datum.size())})`)

    // @TODO remove? Doesn't seem to be doing anything...
    if (datum.content().length > 0) {
      this.appendContent(content, datum.content())
    }

    if (isNode) {
      this.addNodeBreakdowns(content, datum)
      this.addSingleNodeVisitsComment(content, datum)
    }

    // Get label dimensions (has to be actually rendered in the page to do this) and position label
    const labelDims: Dimensions = labelDimensions(this.el)
    const drawingDimensions: { xMax: number; xMin: number; yMax: number; yMin: number } = this.getDrawingDimensions()
    const offset: number = focusPoint.offset + config.nodeBorderWidth

    positionLabel(this.el, focusPoint, labelDims, drawingDimensions, offset, labelPosition)
  }

  private appendContent(container: D3Selection, content: Object<any>[]): void {
    const contentContainer: D3Selection = container.append("div").attr("class", styles.content)
    forEach((contentItem: Object<any>): void => {
      contentContainer
        .append("xhtml:li")
        .attr("class", styles.title)
        .text(`${contentItem.key}: `)
        .append("span")
        .text(contentItem.value)
    })(content)
  }

  private addNodeBreakdowns(content: SeriesEl, datum: TNode): void {
    const breakdowns: Breakdowns = computeBreakdowns(datum),
      container: D3Selection = content.append("div").attr("class", styles.breakdownsContainer),
      inputsTotal: number = computeBreakdownTotal(breakdowns.inputs),
      outputsTotal: number = computeBreakdownTotal(breakdowns.outputs),
      startsHerePercentage: number = Math.round(datum.journeyStarts * 100 / outputsTotal),
      endsHerePercentage: number = Math.round(datum.journeyEnds * 100 / inputsTotal),
      startsHereString: string = !isNaN(startsHerePercentage) ? `${startsHerePercentage}% of all outputs` : " ",
      endsHereString: string = !isNaN(endsHerePercentage) ? `${endsHerePercentage}% of all inputs` : " ",
      numberFormatter: (x: number) => string = this.state.current.get("config").numberFormatter

    // Add "Starts here" breakdown
    flow(
      addBreakdownContainer,
      addBreakdownTitle("Starts here"),
      addBreakdownBars(breakdowns.startsHere, numberFormatter),
      addBreakdownComment(startsHereString)
    )(container)

    // Add "Ends here" breakdown
    flow(
      addBreakdownContainer,
      addBreakdownTitle("Ends here"),
      addBreakdownBars(breakdowns.endsHere, numberFormatter),
      addBreakdownComment(endsHereString)
    )(container)

    // Add inputs breakdown
    flow(
      addBreakdownContainer,
      addBreakdownTitle("Inputs", ` (${numberFormatter(inputsTotal)})`),
      addBreakdownBars(breakdowns.inputs, numberFormatter)
    )(container)

    // Add outputs breakdown
    flow(
      addBreakdownContainer,
      addBreakdownTitle("Outputs", ` (${numberFormatter(outputsTotal)})`),
      addBreakdownBars(breakdowns.outputs, numberFormatter)
    )(container)
  }

  private addSingleNodeVisitsComment(content: SeriesEl, datum: TNode): void {
    if (datum.singleNodeJourneys === 0) {
      return
    }
    content
      .append("xhtml:li")
      .attr("class", styles.title)
      .text(`[!] ${datum.singleNodeJourneys} single node visits (not included in the above stats)`)
  }

  private getDrawingDimensions(): { xMax: number; xMin: number; yMax: number; yMin: number } {
    const drawingContainer: ClientRect = this.state.current.get("computed").canvas.elRect
    const computedSeries: Object<any> = this.state.current.get("computed").series

    return {
      xMax: drawingContainer.left + computedSeries.width,
      xMin: drawingContainer.left,
      yMax: drawingContainer.top + computedSeries.height,
      yMin: drawingContainer.top,
    }
  }

  private onElementOut(): void {
    this.remove()
  }

  private onMouseLeave(): void {
    this.events.emit(Events.FOCUS.ELEMENT.OUT)
  }

  remove(): void {
    this.el.node().innerHTML = ""
    this.el.style("visibility", "hidden")
  }
}

// Helper functions
function computeBreakdowns(node: TNode): Breakdowns {
  const inputs: Breakdown[] = map((link: TLink): Breakdown => {
    const size: number = link.size()
    return {
      size,
      label: link.source().label(),
      percentage: Math.round(size * 100 / node.size()),
    }
  })(node.targetLinks)
  const outputs: Breakdown[] = map((link: TLink): Breakdown => {
    const size: number = link.size()
    return {
      size,
      label: link.target().label(),
      percentage: Math.round(size * 100 / node.size()),
    }
  })(node.sourceLinks)
  const startsHere: Breakdown[] = [
    {
      size: node.journeyStarts,
      percentage: Math.round(node.journeyStarts * 100 / node.size()),
    },
  ]
  const endsHere: Breakdown[] = [
    {
      size: node.journeyEnds,
      percentage: Math.round(node.journeyEnds * 100 / node.size()),
    },
  ]
  return { inputs, outputs, startsHere, endsHere }
}

function computeBreakdownTotal(breakdowns: Breakdown[]): number {
  return reduce((sum: number, item: Breakdown): number => {
    return sum + item.size
  }, 0)(breakdowns)
}

function addBreakdownContainer(content: D3Selection): D3Selection {
  return content.append("div").attr("class", styles.breakdownContainer)
}

function addBreakdownTitle(title: string, subtitle?: string) {
  return (container: D3Selection): D3Selection => {
    container
      .append("span")
      .attr("class", styles.title)
      .text(title)
      .append("span")
      .text(subtitle)
    return container
  }
}

function addBreakdownBars(breakdownItems: Breakdown[], numberFormatter: (x: number) => string) {
  const sortedItems: Breakdown[] = sortBy((item: Breakdown): number => -item.size)(breakdownItems)
  return (container: D3Selection): D3Selection => {
    forEach(appendBreakdown(container, numberFormatter))(sortedItems)
    return container
  }
}

function appendBreakdown(container: D3Selection, numberFormatter: (x: number) => string) {
  return (item: Breakdown): void => {
    const breakdown: D3Selection = container.append("div").attr("class", styles.breakdown)

    if (item.label) {
      breakdown
        .append("label")
        .attr("class", styles.breakdownLabel)
        .text(item.label)
    }

    const backgroundBar: D3Selection = breakdown.append("div").attr("class", styles.breakdownBackgroundBar)

    backgroundBar
      .append("div")
      .attr("class", styles.breakdownBar)
      .style("width", item.percentage + "%")

    backgroundBar
      .append("div")
      .attr("class", styles.breakdownText)
      .text(`${numberFormatter(item.size)} (${item.percentage}%)`)
  }
}

function addBreakdownComment(comment: string) {
  return (container: D3Selection): D3Selection => {
    container
      .append("label")
      .attr("class", styles.breakdownCommentLabel)
      .text(comment)
    return container
  }
}

export default ProcessFlowFocus
