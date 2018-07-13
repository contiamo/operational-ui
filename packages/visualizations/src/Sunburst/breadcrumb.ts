import { ClickPayload, D3Selection, Datum, EventBus, HoverPayload, State, StateWriter, SunburstConfig } from "./typings"
import Events from "../shared/event_catalog"
import { clone, defaults, isEmpty, isObject, last } from "lodash/fp"
import * as styles from "./styles"
import { readableTextColor } from "../utils/color"

const ARROW_WIDTH: number = 7
const HOPS_WIDTH: number = 40

class Breadcrumb {
  private el: D3Selection
  private events: EventBus
  private state: State
  private stateWriter: StateWriter

  constructor(state: State, stateWriter: StateWriter, events: EventBus, el: D3Selection) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.el = el
    this.events.on(Events.FOCUS.ELEMENT.CLICK, this.updateHoverPath.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.HOVER, this.updateHoverPath.bind(this))
    this.events.on(Events.FOCUS.ELEMENT.OUT, this.updateHoverPath.bind(this))
  }

  private updateHoverPath(payload: HoverPayload | ClickPayload): void {
    // Only display breadcrumb if drawing area is wide enough.
    const config: SunburstConfig = this.state.current.get("config")
    const maxBreadcrumbWidth: number = config.breadcrumbItemWidth * config.maxBreadcrumbLength + ARROW_WIDTH
    if (this.state.current.get("config").width < maxBreadcrumbWidth) {
      return
    }

    const computed = this.state.current.get("computed").renderer
    const fixedNode = computed.zoomNode || computed.topNode
    if (!fixedNode || (payload.d && payload.d.data.empty)) {
      return
    }
    const nodeArray = payload.d ? payload.d.ancestors().reverse() : fixedNode.ancestors().reverse()
    this.update(nodeArray)
  }

  private label(d: any, i: number): string {
    return d.hops ? "..." : d.name
  }

  private truncateNodeArray(nodeArray: Datum[]): (Datum | string)[] {
    const maxLength: number = this.state.current.get("config").maxBreadcrumbLength
    if (nodeArray.length <= maxLength) {
      return nodeArray
    }
    const firstNodes: (Datum)[] = nodeArray.slice(0, 1)
    const lastNodes: (Datum)[] = nodeArray.slice(nodeArray.length - (maxLength - 2))
    const dummyHopsNode = defaults({ hops: true })(clone(firstNodes[0]))
    return firstNodes.concat([dummyHopsNode]).concat(lastNodes)
  }

  private backgroundColor(d: Datum): string {
    return d.hops ? "#fff" : d.color || "#eee"
  }

  private labelColor(d: Datum): string {
    return readableTextColor(this.backgroundColor(d), ["black", "white"])
  }

  private update(nodeArray: Datum[]): void {
    const data: any[] = nodeArray.length > 1 ? this.truncateNodeArray(nodeArray) : []

    // Data join; key function combines name and depth (= position in sequence).
    const trail = this.el.selectAll(`div.${styles.breadcrumbItem}`).data(data, d => (d.hops ? d : d.name + d.depth))

    // Remove exiting nodes.
    trail.exit().remove()

    // Add breadcrumb and label for entering nodes.
    const itemWidth = (d: Datum): number => (d.hops ? HOPS_WIDTH : this.state.current.get("config").breadcrumbItemWidth)

    const entering: D3Selection = trail
      .enter()
      .append("div")
      .attr("class", (d: Datum): string => `${styles.breadcrumbItem} ${d.hops ? "hops" : ""}`)
      .style("background-color", this.backgroundColor)
      .style("width", (d: Datum) => `${itemWidth(d)}px`)
      .attr("title", this.label)

    entering
      .append("div")
      .attr("class", "label")
      .style("width", (d: Datum) => `${itemWidth(d) - ARROW_WIDTH * 3}px`)
      .html(this.label)
      .style("color", this.labelColor.bind(this))

    entering.append("div").attr("class", "background-arrow")

    entering
      .append("div")
      .attr("class", "arrow")
      .style("border-left-color", this.backgroundColor)

    entering.merge(trail).on("click", this.onClick.bind(this))
  }

  private onClick(d: Datum): void {
    if (d.hops) {
      return
    }
    this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d })
  }
}

export default Breadcrumb
