import Events from "./event_catalog"
import * as d3 from "d3-selection"
import { reduce, isArray } from "lodash/fp"
import { TState, TStateWriter, TEvents } from "./typings"

abstract class AbstractCanvas {
  container: d3.Selection<Element, {}, null, undefined>
  el: d3.Selection<Element, null, Window, undefined>
  events: TEvents
  focusEl: any
  protected elements: any = {}
  protected state: TState
  stateWriter: TStateWriter

  constructor(state: TState, stateWriter: TStateWriter, events: TEvents, context: any) {
    this.state = state
    this.stateWriter = stateWriter
    this.events = events
    this.insertContainer(context)
    this.insertEl()
    this.createInitialElements()
    // this.listenToMouseOver()
  }

  abstract createEl(): d3.Selection<Element, null, Window, undefined>

  insertContainer(context: any): void {
    this.container = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", "chart-container clearfix")
    context.appendChild(this.container.node())
  }

  insertEl(): void {
    this.el = this.createEl()
    this.container.node().appendChild(this.el.node())
  }

  insertFocusLabel(): void {
    this.focusEl = d3
      .select(document.createElementNS(d3.namespaces["xhtml"], "div"))
      .attr("class", "focus-legend clearfix")
      .style("visibility", "hidden")
    this.container.node().appendChild(this.focusEl.node())
  }

  createInitialElements(): void {
    return
  }

  elementFor(component: string): any {
    const elMap: any = {
      series: this.el,
      focus: this.focusEl,
    }
    return elMap[component]
  }

  prefixedId(id: string): string {
    return this.state.current.get("config").uid + id
  }

  // listenToMouseOver(): void {
  //   let el: d3.Selection<Node> = this.mouseOverElement()
  //   if (el) {
  //     $(el.node())
  //       .on(
  //         "mouseenter",
  //         _.bind(function(): void {
  //           this.state.trigger(Events.CHART.HOVER)
  //           this.trackMouseMove()
  //         }, this),
  //       )
  //       .on(
  //         "mouseleave",
  //         _.bind(function(): void {
  //           this.state.trigger(Events.CHART.OUT)
  //           this.stopMouseMove()
  //         }, this),
  //       )
  //       .on(
  //         "mouseclick",
  //         _.bind(function(): void {
  //           this.state.trigger(Events.CHART.CLICK)
  //         }, this),
  //       )
  //   }
  // }

  rootElement(): Node {
    return this.container.node()
  }

  // abstract mouseOverElement(): d3.Selection<Node>
  //
  // trackMouseMove(): void {
  //   return
  // }
  //
  // stopMouseMove(): void {
  //   return
  // }

  seriesElements(): string[] | string[][] {
    return []
  }

  insertSeries(): { [key: string]: any[] } {
    let that: AbstractCanvas = this
    return reduce((memo: any, se: string | string[]): any => {
      let renderer: string = isArray(se) ? se[0] : se
      memo[renderer] = this.elements.series[renderer].append("svg:g")
      return memo
    }, {})(this.seriesElements())
  }

  // insertElement(name: string, element: d3.Selection<Node>): void {
  //   this.elements[name].node().appendChild(element.node())
  // }
  //
  // insertFocus(element: d3.Selection<Node>): void {
  //   let ref: Node = this.el.node()
  //   ref.parentNode.appendChild(element.node())
  // }
  //
  // insertComponentFocus(element: d3.Selection<Node>): void {
  //   let ref: Node = this.container.node()
  //   ref.insertBefore(element.node(), ref.nextSibling)
  // }
  //
  // toggleSmall(value?: boolean): void {
  //   this.el.classed(this.state.options.smallClass, value)
  // }

  draw(): void {
    const config = this.state.current.get("config")
    this.container.style("width", config.width + "px").style("height", config.height + "px")

    this.el.style("width", config.width + "px").style("height", config.height + "px")

    this.el
      .select("marker#arrow")
      .attr("fill", config.arrowFill)
      .attr("stroke", config.linkStroke)
  }

  margin(side: string): number {
    return parseInt(this.el.style("margin-" + side), 10) || 0
  }

  resize(computed: any): void {
    return this.draw()
  }

  remove(): void {
    // $(this.mouseOverElement().node()).off()
    this.elements = {}
    this.container.remove()
    this.container = undefined
    this.el = undefined
  }
}

export default AbstractCanvas
