import * as React from "react"
import { Component } from "react"
import { select as d3Select } from "d3-selection"
import DataHandler from "./data_handler"
import Renderer from "./renderer"
import { TNode, TLink, TData } from "./typings"

class Visualization extends Component {
  handler: DataHandler
  data: TData
  renderer: Renderer
  width: number
  height: number
  props: any

  static defaultProps = {
    width: 500,
    height: 1000,
    maxNodeSize: 1500,
    maxLinkWidth: 15,
    labelOffset: 5,
    linkStroke: "#aaa",
    arrowFill: "#ccc"
  }

  componentDidMount(): void {
    this.prepareData()
    this.draw()
  }

  componentDidUpdate(): void {
    this.draw()
  }

  prepareData(): void {
    this.handler = new DataHandler()
    this.data = this.handler.prepareData(this.props.data)
  }

  draw(): void {
    this.setContext()
    this.renderer = new Renderer(this.data, this.props, this.context)
    this.renderer.updateDraw()
  }

  setContext(): void {
    d3Select(this.context)
      .append("svg")
      .attr("height", this.props.height + "px")
      .attr("width", this.props.width + "px")
  }

  render(): JSX.Element {
    return <div className="Visualization" ref={context => this.context = context} />
  }
}

export default Visualization
