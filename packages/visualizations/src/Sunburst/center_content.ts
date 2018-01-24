import { TD3Selection, TDatum, IObject, IState, TStateWriter, IEvents } from "./typings"
import Events from "../utils/event_catalog"

class CenterContent {
  el: TD3Selection
  events: IEvents
  state: IState
  stateWriter: TStateWriter

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, el: TD3Selection) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.events.on(Events.FOCUS.ELEMENT.CLICK, this.update.bind(this))
  }

  update(payload?: IObject): void {
    const computed: IObject = this.state.current.get("computed")
    const config: IObject = this.state.current.get("config")
    const renderer: IObject = computed.renderer
    const drawingDims: IObject = computed.canvas.drawingDims
    const fixedNode: any = renderer.zoomNode || renderer.topNode

    this.el.select("span.name").text(fixedNode.data.name)

    this.el.select("span.value").text(fixedNode.value)

    this.el.style("width", renderer.innerRadius * 1.5)

    const elDims: any = this.el.node().getBoundingClientRect()

    this.el
      .style("top", config.height - drawingDims.height + drawingDims.height / 2 - elDims.height / 2)
      .style("left", drawingDims.width / 2 - renderer.innerRadius * 0.75)
  }
}

export default CenterContent
