import * as React from "react"

import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "contiamo-ui-theme"

import style from "./SidebarItem.style"

export interface IProps {
  id?: string | number
  style?: {}
  className?: string
  label?: string
  children?: any
  open?: boolean
  onClick?: () => Promise<any>
  tooltip?: string
}

export interface IState {
  open: boolean
  updating: boolean // async, woo!
}

class SidebarItem extends React.Component<IProps, IState> {
  state = {
    open: false,
    updating: false
  }

  componentWillMount() {
    this.setState({
      open: !!this.props.open
    })
  }

  async toggle() {
    if (!this.props.children) {
      return false
    }
    this.setState(() => ({ updating: true }))
    // If it is closed,
    if (typeof this.props.onClick === "function" && !this.state.open) {
      await this.props.onClick() // wait for the promise to resolve first.
    }
    this.setState(prevState => ({
      open: !prevState.open,
      updating: false
    }))
    return true
  }

  render() {
    /**
      Only the header should have a tooltip, else the tooltip will show
      even when the cursor is over the children... who may also have their
      own tooltips.
    */
    return (
      <div
        style={this.props.style}
        key={this.props.id}
        className={`${this.props.className} ${this.state.updating ? "updating" : ""} ${this.state.open ? "open" : ""}`}
      >
        <div className={`header ${this.state.open ? "open" : ""}`} onClick={() => this.toggle()}>
          {this.props.label}
        </div>
        {this.state.open ? <div className="content">{this.props.children}</div> : ""}
      </div>
    )
  }
}

export default glamorous(SidebarItem)(style)
export { SidebarItem }
