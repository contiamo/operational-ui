import Nodes from "./renderers/nodes"
import Links from "./renderers/links"
import { Data, EventBus, FocusElement, SeriesEl, State, TLink } from "./typings"
import Events from "../utils/event_catalog"
import { forEach, initial, reduce, tail, zip } from "lodash/fp"
import * as styles from "./renderers/styles"
import { withD3Element } from "../utils/d3_utils"
import * as d3 from "d3-selection"

class Renderer {
  links: Links
  nodes: Nodes
  state: State
  el: SeriesEl
  events: EventBus

  constructor(state: State, events: EventBus, el: SeriesEl) {
    this.events = events
    this.el = el
    this.links = new Links(state, events, el)
    this.nodes = new Nodes(state, events, el)
    this.events.on(Events.FOCUS.ELEMENT.HIGHLIGHT, this.focusElement.bind(this))
  }

  draw(data: Data): void {
    this.links.draw(data.links)
    this.nodes.draw(data.nodes)
  }

  private focusElement(focusElement: FocusElement): void {
    switch (focusElement.type) {
      case "path":
        this.highlightPath(focusElement)
        break
      case "node":
        this.nodes.focusElement(focusElement)
        break
      case "link":
        this.links.focusElement(focusElement)
        break
    }
  }

  private highlightPath(focusElement: FocusElement): void {
    this.events.emit(Events.FOCUS.ELEMENT.MOUSEOUT)

    const path: string[] = focusElement.matchers.path
    const links: [string, string][] = zip(initial(path))(tail(path))

    forEach((link: [string, string]): void => {
      this.el
        .selectAll(`path.link.${styles.element}`)
        .filter((d: TLink): boolean => d.sourceId() === link[0] && d.targetId() === link[1])
        .each(
          withD3Element((d: TLink, el: HTMLElement): void => {
            this.links.highlight(d3.select(el), d, true)
          })
        )
    })(links)
  }

  close(): void {
    this.el.node().innerHTML = ""
  }
}

export default Renderer
