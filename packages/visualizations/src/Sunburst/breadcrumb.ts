import * as d3 from "d3-selection"
import {
  ClickPayload,
  D3Selection,
  Datum,
  EventBus,
  HoverPayload,
  Object,
  State,
  StateWriter,
  SunburstConfig,
} from "./typings"
import Events from "../utils/event_catalog"
import { isEmpty, isObject, last } from "lodash/fp"
import * as styles from "./styles"
import { readableTextColor } from "@operational/utils"

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

    const computed: Object<any> = this.state.current.get("computed").renderer
    const fixedNode: any = computed.zoomNode || computed.topNode
    if (!fixedNode || (payload.d && payload.d.data.empty)) {
      return
    }
    const nodeArray: any[] = payload.d ? payload.d.ancestors().reverse() : fixedNode.ancestors().reverse()
    this.update(nodeArray)
  }

  private label(d: any, i: number): string {
    return d === "hops" ? "..." : d.name
  }

  private truncateNodeArray(nodeArray: Datum[]): (Datum | string)[] {
    const maxLength: number = this.state.current.get("config").maxBreadcrumbLength
    if (nodeArray.length <= maxLength) {
      return nodeArray
    }
    const firstNodes: (Datum | string)[] = nodeArray.slice(0, 1)
    const lastNodes: (Datum | string)[] = nodeArray.slice(nodeArray.length - (maxLength - 2))
    return firstNodes.concat(["hops"]).concat(lastNodes)
  }

  private backgroundColor(d: any): string {
    return d === "hops" ? "#fff" : d.color || "#eee"
  }

  private labelColor(d: Datum): string {
    return readableTextColor(this.backgroundColor(d), ["black", "white"])
  }

  private update(nodeArray: Datum[]): void {
    const data: any[] = nodeArray.length > 1 ? this.truncateNodeArray(nodeArray) : []

    // Data join; key function combines name and depth (= position in sequence).
    const trail = this.el.selectAll(`div.${styles.breadcrumbItem}`).data(data, d => {
      return d === "hops" ? d : d.name + d.depth
    })

    // Remove exiting nodes.
    trail.exit().remove()

    // Add breadcrumb and label for entering nodes.
    const itemWidth = (d: any): number =>
      d === "hops" ? HOPS_WIDTH : this.state.current.get("config").breadcrumbItemWidth
    const entering: D3Selection = trail
      .enter()
      .append("div")
      .attr("class", (d: any): string => `${styles.breadcrumbItem} ${d === "hops" ? d : ""}`)
      .style("background-color", this.backgroundColor)
      .style("width", (d: any) => `${itemWidth(d)}px`)
      .attr("title", this.label)

    entering
      .append("div")
      .attr("class", "label")
      .html(this.label)
      .style("color", this.labelColor.bind(this))

    entering.append("div").attr("class", "background-arrow")

    entering
      .append("div")
      .attr("class", "arrow")
      .style("border-left-color", this.backgroundColor)

    entering.merge(trail).on("click", this.onClick.bind(this))
  }

  private onClick(d: Datum | string): void {
    if (d === "hops") {
      return
    }
    this.events.emit(Events.FOCUS.ELEMENT.CLICK, { d })
  }
}

export default Breadcrumb
