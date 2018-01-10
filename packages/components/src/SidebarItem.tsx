import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { spin } from "@operational/utils"

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

const style = ({ theme, children }: { theme: Theme; children?: Node }): {} => {
  // If we have children, style a caret.
  const caret: {} = children
    ? {
        content: '""',
        display: "block",
        width: 0,
        height: 0,
        marginLeft: "auto",
        border: "4px solid transparent",
        borderLeftColor: theme.colors.gray20,
        transition: ".15s transform ease"
      }
    : {}

  return {
    label: "sidebaritem",
    position: "relative",
    color: theme.colors.emphasizedText,

    "& .header": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      padding: `${theme.spacing * 2 / 3}px ${theme.spacing}px`,
      borderTop: "1px solid",
      borderTopColor: theme.colors.gray10,
      cursor: "pointer",
      outline: "none",
      backgroundColor: theme.colors.white
    },

    "& .header:hover": {
      backgroundColor: theme.colors.gray10
    },

    "&.open .header": {
      borderBottom: "1px solid",
      borderBottomColor: theme.colors.separator,
      fontWeight: 600,
      backgroundColor: theme.colors.gray10
    },

    // Caret styles begin here.
    "& .header::after": {
      ...caret
    },

    "&:hover .header::after": {
      borderLeftColor: theme.colors.gray80
    },

    "&.open .header.open::after": {
      // rotate the caret to face down when an item is open.
      transform: "translate3d(-2px, 2px, 0) rotate(90deg)",
      borderLeftColor: theme.colors.gray80
    },

    // Spinner for async items replaces a caret.
    "&.updating .header::after": {
      width: 16,
      height: 16,
      border: 0,
      borderRadius: "50%",
      boxShadow: `1px 0px 0px 0px ${theme.colors.gray70} inset`,
      animation: `.7s ${spin} linear infinite`
    },

    "& .content": {
      position: "relative",
      paddingLeft: theme.spacing
    }
  }
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
