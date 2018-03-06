import { IEvents, IObject, IState, TD3Selection } from "./typings"
import Events from "./event_catalog"
import * as styles from "./styles"

class ComponentFocus {
  el: TD3Selection
  events: IEvents
  state: IState

  constructor(state: IState, el: TD3Selection, events: IEvents) {
    this.state = state
    this.el = el.append("xhtml:div").attr("class", `${styles.focusLegend} ${styles.componentFocus}`)
    this.events = events
    this.events.on(Events.FOCUS.COMPONENT.MOUSEOVER, this.onComponentHover.bind(this))
  }

  onComponentHover(payload: { component: TD3Selection; options: IObject }): void {
    this.remove()
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)
    this.draw(payload)
  }

  draw(payload: { component: TD3Selection; options: IObject }): void {
    const componentPosition: ClientRect = payload.component.node().getBoundingClientRect()
    const canvasPosition: ClientRect = this.state.current.get("computed").canvas.containerRect
    const topBorderWidth: number = parseInt((window.getComputedStyle(this.el.node()) as any)["border-top-width"], 10)
    const leftBorderWidth: number = parseInt((window.getComputedStyle(this.el.node()) as any)["border-left-width"], 10)
    const config: IObject = this.state.current.get("config")

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
      .style("width", componentPosition.width + "px")
      .style("height", componentPosition.height + "px")
      .style("top", top + "px")
      .style("left", left + "px")
      .style("visibility", "visible")

    // Track mouseover status (mouse over label)
    this.el.on("mouseleave", this.onMouseOut.bind(this))
    this.el.on("click", this.onClick.bind(this)(payload.options))
  }

  onMouseOut(): void {
    this.remove()
  }

  onClick(configOptions: IObject): () => void {
    return (): void => {
      console.log(configOptions)
    }
  }

  remove(): void {
    this.el.on("mouseleave", null)
    this.el.on("click", null)
    this.el.style("visibility", "hidden")
  }
}

export default ComponentFocus
