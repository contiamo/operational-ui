import { ClickPayload, D3Selection, Datum, EventBus, Object, State, StateWriter, SunburstConfig } from "./typings"
import Events from "../utils/event_catalog"

// y is a step-function (with two x values resulting in the same y value)
// on the positive integer domain which is monotonic decreasing
export const approxZero = (y: (x: number) => number, initialX: number): number => {
  // make sure to get points with different y value
  const p0: { x: number; y: number } = { x: initialX, y: y(initialX) }
  const p1: { x: number; y: number } = { x: initialX + 2, y: y(initialX + 2) }

  // Solve for 0
  const m: number = (p0.y - p1.y) / (p0.x - p1.x)
  const xZero: number = -p0.y / m + p0.x

  // Find nearest integer value for x that has y > 0
  let xInt: number = Math.round(xZero)
  for (let i: number = 0; i <= 10; i = i + 1) {
    if (y(xInt) <= 0) {
      xInt = xInt - 1
    }
  }

  return xInt
}

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

  private update(payload: ClickPayload): void {
    const computed: Object<any> = this.state.current.get("computed")
    const config: SunburstConfig = this.state.current.get("config")
    const renderer: Object<any> = computed.renderer
    const drawingDims: Object<number> = computed.canvas.drawingDims
    const fixedNode: any = renderer.zoomNode || renderer.topNode
    const availableWidth: number = renderer.innerRadius * config.centerCircleRadius * 2

    this.el.select("span.value").text(renderer.data.length > 0 ? config.numberFormatter(fixedNode.value) : null)

    this.el.select("span.name").text(fixedNode.data.name)

    const y = (x: number): number => {
      this.el.select("span.value").style("font-size", `${x}px`)
      // Text should fill half of available width (0.5 * diameter = radius)
      return renderer.innerRadius - (this.el.select("span.value").node() as any).getBoundingClientRect().width
    }

    // start with min font size
    if (y(config.minTotalFontSize) < 0) {
      // Not enough room - do not show root label
      this.el.select("span.value").text("")
      this.el.select("span.name").text("")
    } else {
      // change font size until bounding box is completely filled or max font size is reached
      this.el
        .select("span.value")
        .style("font-size", Math.min(config.maxTotalFontSize, approxZero(y, config.minTotalFontSize)) + "px")

      this.el.style("width", `${availableWidth}px`)
    }

    const elDims: any = this.el.node().getBoundingClientRect()
    const top: number = config.height - drawingDims.height + drawingDims.height / 2 - elDims.height / 2
    const left: number = drawingDims.width / 2 - renderer.innerRadius * config.centerCircleRadius
    this.el.style("top", `${top}px`).style("left", `${left}px`)
  }
}

export default RootLabel
