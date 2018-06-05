import { ComponentHoverPayload, Config, D3Selection, EventBus, State, ComponentConfigInfo } from "./typings"
import Events from "./event_catalog"
import * as styles from "./styles"

class ComponentFocus {
  el: D3Selection
  events: EventBus
  state: State

  constructor(state: State, el: D3Selection, events: EventBus) {
    this.state = state
    this.el = el.append("xhtml:div").attr("class", `${styles.focusLegend} ${styles.componentFocus}`)
    this.events = events
    this.events.on(Events.FOCUS.COMPONENT.HOVER, this.onComponentHover.bind(this))
  }

  onComponentHover(payload: ComponentHoverPayload): void {
    if (!this.state.current.get("config").showComponentFocus) {
      return
    }
    this.events.emit(Events.FOCUS.CLEAR)
    this.events.emit(Events.FOCUS.ELEMENT.OUT)
    this.draw(payload)
  }

  draw(payload: ComponentHoverPayload): void {
    const componentPosition: ClientRect = payload.component.node().getBoundingClientRect()
    const canvasPosition: ClientRect = this.state.current.get("computed").canvas.containerRect
    const elStyle: { [key: string]: any } = window.getComputedStyle(this.el.node())
    const topBorderWidth: number = parseInt(elStyle["border-top-width"], 10)
    const leftBorderWidth: number = parseInt(elStyle["border-left-width"], 10)
    const config: Config = this.state.current.get("config")

    // Prevent component focus from going out of canvas.
    let top: number = componentPosition.top - canvasPosition.top - topBorderWidth
    let left: number = componentPosition.left - canvasPosition.left - leftBorderWidth
    let width: number = componentPosition.width
    let height: number = componentPosition.height

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
      .style("width", `${componentPosition.width}px`)
      .style("height", `${componentPosition.height}px`)
      .style("top", `${top}px`)
      .style("left", `${left}px`)
      .style("visibility", "visible")

    // Track mouseover status (mouse over label)
    this.el.on("mouseleave", this.onMouseOut.bind(this))
    this.el.on("click", this.onClick.bind(this)(payload.options))
  }

  onMouseOut(): void {
    this.remove()
  }

  onClick(configOptions: ComponentConfigInfo): () => void {
    return (): void => {
      this.events.emit(Events.FOCUS.COMPONENT.CLICK, configOptions)
    }
  }

  remove(): void {
    this.el.on("mouseleave", null)
    this.el.on("click", null)
    this.el.style("visibility", "hidden")
  }
}

export default ComponentFocus
