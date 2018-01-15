import { IEvents, IObject, IState, TD3Selection } from "./typings"
import { uniqueId } from "lodash/fp"
import Events from "./event_catalog"
import * as styles from "./styles"
import * as d3 from "d3-selection"

class ComponentFocus {
  el: TD3Selection
  events: IEvents
  isMouseOver: boolean = false
  label: TD3Selection
  state: IState
  type: string = "component"
  uid: string

  constructor(
    state: IState,
    el: TD3Selection,
    events: IEvents,
    payload: { component: TD3Selection; options: IObject }
  ) {
    this.state = state
    this.el = el.append("xhtml:div").attr("class", `${styles.focusLegend} ${styles.componentFocus}`)
    this.events = events
    this.uid = uniqueId("componentFocusLabel")

    const componentPosition: ClientRect = payload.component.node().getBoundingClientRect(),
      canvasPosition: ClientRect = this.state.current.get("computed").canvas.containerRect,
      topBorderWidth: number = parseInt((window.getComputedStyle(this.el.node()) as any)["border-top-width"], 10),
      leftBorderWidth: number = parseInt((window.getComputedStyle(this.el.node()) as any)["border-left-width"], 10),
      config: IObject = this.state.current.get("config")

    // Prevent component focus from going out of canvas.
    let top: number = componentPosition.top - canvasPosition.top - topBorderWidth,
      left: number = componentPosition.left - canvasPosition.left - leftBorderWidth,
      width: number = componentPosition.width,
      height: number = componentPosition.height

    if (top < 0) {
      width += top
      top = 0
    }
    if (left < 0) {
      height += left
      left = 0
    }
    if (top + height + 2 * topBorderWidth > config.height) {
      height -= top + height + 2 * topBorderWidth - config.height
    }
    if (left + width + 2 * leftBorderWidth > config.width) {
      width -= left + width + 2 * leftBorderWidth - config.width
    }

    this.el
      .style("width", componentPosition.width + "px")
      .style("height", componentPosition.height + "px")
      .style("top", top + "px")
      .style("left", left + "px")

    // Track mouseover status (mouse over label)
    this.el.on("mouseenter", this.onMouseOver.bind(this))
    this.el.on("mouseleave", this.onMouseOut.bind(this))
    this.el.on("click", this.onClick.bind(this)(payload.options))
  }

  onMouseOver(): void {
    this.isMouseOver = true
  }

  onMouseOut(): void {
    this.isMouseOver = false
    this.events.emit(Events.FOCUS.COMPONENT.LABEL.MOUSEOUT)
    this.remove()
  }

  onClick(configOptions: IObject): () => void {
    return (): void => {
      console.log(configOptions)
    }
  }

  remove(): void {
    this.el.on("mouseenter", null)
    this.el.on("mouseleave", null)
    this.el.on("click", null)
    this.el.remove()
  }
}

export default ComponentFocus
