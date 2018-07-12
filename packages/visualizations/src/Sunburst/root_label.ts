import { D3Selection, EventBus, State, StateWriter } from "./typings"
import Events from "../shared/event_catalog"
import { approxZero, stepFunction } from "../utils/font_sizing_utils"

class RootLabel {
  private el: D3Selection
  private events: EventBus
  private state: State
  private stateWriter: StateWriter

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.events.on(Events.FOCUS.ELEMENT.CLICK, this.update.bind(this))
  }

  private update(): void {
    const computed = this.state.current.get("computed")
    const config = this.state.current.get("config")
    const renderer = computed.renderer
    const drawingDims = computed.canvas.drawingDims
    const fixedNode = renderer.zoomNode || renderer.topNode
    const availableWidth = renderer.innerRadius * config.centerCircleRadius * 2

    this.el.select("span.value").text(renderer.data.length > 0 ? config.numberFormatter(fixedNode.value) : null)

    this.el.select("span.name").text(fixedNode.data.name)

    const y = stepFunction(this.el.select("span.value"), renderer.innerRadius)
    // start with min font size
    if (y(config.minTotalFontSize) < 0) {
      // Not enough room - do not show root label
      this.el.select("span.value").text("")
      this.el.select("span.name").text("")
    } else {
      // change font size until bounding box is completely filled or max font size is reached
      this.el
        .select("span.value")
        .style("font-size", `${Math.min(config.maxTotalFontSize, approxZero(y, config.minTotalFontSize))}px`)

      this.el.style("width", `${availableWidth}px`)
    }

    const elDims = this.el.node().getBoundingClientRect()
    const top = config.height - drawingDims.height + drawingDims.height / 2 - elDims.height / 2
    const left = drawingDims.width / 2 - renderer.innerRadius * config.centerCircleRadius
    this.el.style("top", `${top}px`).style("left", `${left}px`)
  }
}

export default RootLabel
