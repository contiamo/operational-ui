import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

import TooltipStyle from "./Tooltip/Tooltip.style"

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
*/
export interface TooltipPosition extends React.CSSProperties {
  position: "absolute" | "fixed"
  transform?: string
  top?: number
  left?: number
  bottom?: number | string
}

export interface IRectCoords {
  top: number
  left: number
  bottom: number
  right: number
  width: number
  height: number
}

export interface IProps {
  className?: string
  children?: React.ReactNode
  active?: boolean
  anchor?: string
  color?: string
  betaFixOverflow?: boolean
}

export interface IState {
  style: TooltipPosition
}

class Tooltip extends React.Component<IProps, IState> {
  static defaultProps = {
    anchor: "top",
    active: false
  }
  state: IState = {
    style: {
      position: "absolute"
    }
  }
  tooltip: HTMLDivElement
  componentDidMount() {
    if (this.props.betaFixOverflow) {
      const position = this.getPosition()
      this.setState(() => ({
        style: position
      }))
    }
  }
  getPosition(): TooltipPosition {
    const rect: IRectCoords = this.tooltip.getBoundingClientRect()
    const top: number = rect.top
    /**
      The following style properties can only properly be set
      after the component mounts.

      Please read the description of this component at the top of the file
      if you haven't already to find out why.
      */
    const position: TooltipPosition = {
      top,
      position: "fixed",
      transform: "none",
      bottom: this.props.anchor === "bottom" ? "auto" : null,
      left: (rect && rect.left) || 0
    }

    return position
  }
  render() {
    return (
      <div
        ref={tooltip => (this.tooltip = tooltip || document.createElement("div"))}
        className={`${this.props.className} Tooltip${this.props.active ? " active" : ""}`}
        style={this.state.style}
      >
        {this.props.children}
      </div>
    )
  }
}

export default glamorous(Tooltip)(TooltipStyle)
export { Tooltip, TooltipStyle as style } // for testing.
