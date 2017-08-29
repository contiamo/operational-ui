import React, { Component } from "react"

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

const withTooltip = InputComponent =>
  class extends Component {
    props: {
      children: mixed,
      tooltip: string,
      tooltipAnchor?: string,
      tooltipColor?: string,
    }

    state: {
      isTooltipActive: boolean,
    } = {
      isTooltipActive: false
    }

    static defaultProps = {
      tooltipAnchor: "top"
    }

    showTooltip() {
      this.setState(() => ({ isTooltipActive: true }))
    }

    hideTooltip() {
      this.setState(() => ({ isTooltipActive: false }))
    }

    render() {
      const splitClassNames = this.props.className
        ? [...this.props.className.split(" ")]
        : []
      const lastClassName = splitClassNames[splitClassNames.length - 1]
      return (
        <InputComponent
          {...this.props}
          onMouseEnter={() => this.showTooltip()}
          onMouseLeave={() => this.hideTooltip()}
        >
          {this.props.children ? this.props.children : ""}
          {this.props.tooltip && this.state.isTooltipActive
            ? <Tooltip
              active
              color={this.props.tooltipColor}
              anchor={this.props.tooltipAnchor}
            >
              {this.props.tooltip}
            </Tooltip>
            : ""}
        </InputComponent>
      )
    }
  }

export default withTooltip
