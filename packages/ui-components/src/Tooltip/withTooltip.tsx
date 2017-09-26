import * as React from "react"

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

// @todo -> type this better
interface Props {
  children?: React.ReactNode
  tooltip?: any
  tooltipAnchor?: string
  tooltipColor?: string
  role?: string
  tabIndex?: number
}
interface State {
  isTooltipActive: boolean
}
function withTooltip<InputProps, InputState, S>(InputComponent: any) {
  return class extends React.Component<Props & InputProps & React.HTMLProps<HTMLDivElement> & InputState, State> {
    static defaultProps = {
      tooltipAnchor: "top",
      role: "status",
      tabIndex: -1
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
        <InputComponent onMouseEnter={() => this.showTooltip()} onMouseLeave={() => this.hideTooltip()} {...this.props}>
          {this.props.children ? this.props.children : ""}
          {this.props.tooltip && this.state.isTooltipActive ? (
            <Tooltip active color={this.props.tooltipColor} anchor={this.props.tooltipAnchor}>
              {this.props.tooltip}
            </Tooltip>
          ) : null}
        </InputComponent>
      )
    }
  }
}

export default withTooltip
