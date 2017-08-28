// @flow
import React, { Component } from "react"
import glamorous from "glamorous"

import style from "./Tooltip.style"

/**
  The <Tooltip /> component.

  The problem:
  Say you have a container with `overflow: hidden`.
  Say this container has items that need to show tooltips, that appear
  _outside_ of page flow, and are not clipped by the overflow.

  The solution is to use `position: fixed`, with dynamically calculated
  positions at the time of mounting, but React makes this a little
  tricky, especially if you want a simple API.

  This solution:
  A tooltip is placed in an absolute position, relative to its parent,
  even risking getting cut off to overflow.

  At the time of mounting, this _perfect_ position of the tooltip is captured
  relative to `document`. These coordinates are then set as CSS properties
  on the tooltip, along with `position: fixed` and all is well with the
  world. 🌈
*/ type tooltipPosition = {
  top?: number,
  left?: number,
  bottom?: number | string,
}
type rect = {
  top: number,
  left: number,
  bottom: number,
  right: number,
  width: number,
  height: number,
}
class Tooltip extends Component {
  props: {
    className: string,
    children?: mixed,
    active?: boolean,
    anchor?: string,
    color?: string,
  }
  state: {
    position: tooltipPosition,
  } = { position: {} }
  tooltip: HTMLDivElement
  static defaultProps = {
    anchor: "top",
    active: false
  }
  componentDidMount() {
    const position = this.getPosition()
    this.setState(() => ({
      position
    }))
  }
  getPosition() {
    const rect: rect = this.tooltip.getBoundingClientRect()
    const top: number = rect.top
    /**
      The following style properties can only properly be set
      after the component mounts.

      Please read the description of this component at the top of the file
      if you haven't already to find out why.
    */ const position: tooltipPosition = {
      position: "fixed",
      transform: "none",
      top,
      left: rect && rect.left || 0
    }
    if (this.props.anchor === "bottom") {
      position.bottom = "auto"
    }
    return position
  }
  render() {
    return (
      <div
        ref={tooltip => this.tooltip = tooltip}
        className={`${this.props.className} Tooltip${this.props.active
          ? " active"
          : ""}`}
        style={this.state.position}
      >
        {this.props.children ? this.props.children : ""}
      </div>
    )
  }
}
export default glamorous(Tooltip)(style)
export { Tooltip, style } // for testing.
