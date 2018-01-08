import AbstractDrawingCanvas from "../utils/drawing_canvas"
import Events from "../utils/event_catalog"
import * as d3 from "d3-selection"
import { TD3Selection, IState, TStateWriter, IEvents, IObject } from "./typings"

interface IMousePosition {
  absolute: { x: number; y: number }
  relative: { x: number; y: number }
}

class Canvas extends AbstractDrawingCanvas {
  private mousePosition: IMousePosition

  constructor(state: IState, stateWriter: TStateWriter, events: IEvents, context: Element) {
    super(state, stateWriter, events, context)
    this.mousePosition = this.initialMousePosition()

    this.appendShadows()
    this.appendBackground()
    this.appendDrawingGroup()
    this.insertFocusElements()
    this.insertLegend("top", "left")
    this.insertComponentFocus()

    this.elements.background.on("mouseover", (): void => {
      this.events.emit(Events.FOCUS.ELEMENT.OUT)
    })

    this.stateWriter("elements", this.elements)
  }

  createEl(): TD3Selection {
    return d3.select(document.createElementNS(d3.namespaces["svg"], "svg"))
  }

  appendShadows(): void {
    let shadow: TD3Selection = this.elements.defs
      .append("filter")
      .attr("id", this.shadowDefinitionId())
      .attr("height", "130%")
    shadow
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", "3")
    shadow
      .append("feOffset")
      .attr("dx", "2")
      .attr("dy", "2")
      .attr("result", "offsetblur")
    shadow
      .append("feComponentTransfer")
      .append("feFuncA")
      .attr("type", "linear")
      .attr("slope", "0.5")

    let shadowFeMerge: TD3Selection = shadow.append("feMerge")
    shadowFeMerge.append("feMergeNode")
    shadowFeMerge.append("feMergeNode").attr("in", "SourceGraphic")
    this.stateWriter("shadowDefinitionId", this.shadowDefinitionId())
  }

  initialMousePosition(): IMousePosition {
    return {
      absolute: {
        x: undefined,
        y: undefined
      },
      relative: {
        x: undefined,
        y: undefined
      }
    }
  }

  trackMouseMove(): void {
    const config = this.state.current.get("config")
    this.el.on("mousemove", (): void => {
      let event: any = d3.event
      let mouse: [number, number] = d3.mouse(this.el.node() as any)
      this.mousePosition = {
        absolute: {
          x: event.pageX,
          y: event.pageY
        },
        relative: {
          x: mouse[0],
          y: mouse[1]
        }
      }
      this.events.emit(Events.CHART.MOVE, this.mousePosition)
    })
  }

  stopMouseMove(): void {
    this.el.on("mousemove", undefined)
  }

  totalLegendHeight(): number {
    const legend: TD3Selection = this.state.current.get("computed").canvas.legends.top.left
    return legend.node().offsetHeight
  }
}

export default Canvas
