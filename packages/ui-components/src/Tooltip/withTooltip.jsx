// @flow
import React, { Component } from "react"
import type { ComponentType } from "react"

import Tooltip from "./Tooltip"

/**
  A simple Higher-Order Component (HOC) that you can wrap with any custom
  component in order to make it Tooltippable. This should JustWork™.

  USAGE:
  import withTooltip from './withTooltip'
  const MyComponentWithTooltip = withTooltip(MyComponent)
  <MyComponentWithTooltip
    tooltip={<div>ANYTHING</div>}
    tooltipAnchor={'top'||'bottom'}
  />
*/
type Props = {
  children: mixed,
  tooltip: any,
  tooltipAnchor?: string,
  tooltipColor?: string,
}
type State = {
  isTooltipActive: boolean,
}
const withTooltip = (InputComponent: ComponentType<any>) =>
  class extends Component<Props, State> {
    static defaultProps = {
      tooltipAnchor: "top"
    }
    state = {
      isTooltipActive: false
    }

    showTooltip() {
      this.setState(() => ({ isTooltipActive: true }))
    }

    hideTooltip() {
      this.setState(() => ({ isTooltipActive: false }))
    }

    render() {
      return (
        <InputComponent
          {...this.props}
          onMouseEnter={() => this.showTooltip()}
          onMouseLeave={() => this.hideTooltip()}
          role={this.props.role || "status"}
          tabIndex={this.props.tabIndex || -1}
        >
          {this.props.children ? this.props.children : ""}
          {this.props.tooltip && this.state.isTooltipActive
            ? <Tooltip active color={this.props.tooltipColor} anchor={this.props.tooltipAnchor}>
              {this.props.tooltip}
            </Tooltip>
            : ""}
        </InputComponent>
      )
    }
  }

export default withTooltip
