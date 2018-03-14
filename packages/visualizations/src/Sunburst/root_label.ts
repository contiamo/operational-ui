import { ClickPayload, D3Selection, Datum, EventBus, Object, State, StateWriter, SunburstConfig } from "./typings"
import Events from "../utils/event_catalog"

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

    this.el.select("span.value").text(renderer.data.length > 0 ? config.numberFormatter(fixedNode.value) : null)
    this.el.select("span.name").text(fixedNode.data.name)
    this.el.style("width", `${renderer.innerRadius * config.centerCircleRadius * 2}px`)

    const elDims: any = this.el.node().getBoundingClientRect()
    const top: number = config.height - drawingDims.height + drawingDims.height / 2 - elDims.height / 2
    const left: number = drawingDims.width / 2 - renderer.innerRadius * config.centerCircleRadius
    this.el.style("top", `${top}px`).style("left", `${left}px`)
  }
}

export default RootLabel
