import React, { Component } from "react"
import glamorous from "glamorous"
import { fadeIn } from "contiamo-ui-utils"

type option = {
  id: number,
  label: string,
  default?: boolean,
}

type Props = {
  className: string,
  children: any,
  options?: Array<option>,
  onChange?: () => mixed,
}

type State = {
  open: boolean,
  value: option,
}

class SideNavigationHeader<Props, State> extends Component {
  static defaultProps = {
    options: []
  }
  state = {
    open: false
  }
  componentDidMount() {
    this.setState(() => ({ value: this.getDefaultValue() }))
  }
  getDefaultValue() {
    if (this.props.options.length === 0) {
      return
    }
    return (
      this.props.options.find(option => option.default === true) ||
      this.props.options[0]
    )
  }
  toggle() {
    if (this.props.options.length === 0) {
      return
    }
    this.setState(prevState => ({ open: !prevState.open }))
  }
  async onChange(option) {
    if (this.props.onChange) {
      await this.props.onChange()
    }
    this.setState(prevState => ({ ...prevState, value: option }))
  }
  getDropdown() {
    return (
      <div className="SideNavigationHeader__options">
        {this.props.options.map(option =>
          <div
            key={option.id}
            className="SideNavigationHeader__option"
            onClick={() => this.onChange(option)}
          >
            {option.label}
          </div>
        )}
      </div>
    )
  }
  render() {
    return (
      <div
        className={`${this.props.className} SideNavigationHeader`}
        onClick={() => this.toggle()}
      >
        {this.props.children}
        <div className="SideNavigationHeader__value">
          {this.state.value && this.state.value.label}
        </div>
        {this.props.options.length > 0 && this.state.open && this.getDropdown()}
      </div>
    )
  }
}

const style = ({ theme, options }: Props) => {
  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderBottom: "1px solid rgba(255, 255, 255, .1)",
    padding: theme.spacing ? theme.spacing : 16,
    cursor: options && options.length ? "pointer" : "default",
    backgroundColor: "inherit",

    // Caret
    "&::after": {
      content: options && options.length ? "\"\"" : "none",
      position: "absolute",
      right: theme.spacing ? theme.spacing : 16,
      width: 0,
      height: 0,
      opacity: 0,
      animation: `${fadeIn} .3s .3s ease forwards`,
      border: "4px solid transparent",
      borderTopColor: "white"
    },

    "& .SideNavigationHeader__value": {
      width: "fit-content",
      whiteSpace: "pre"
    },

    "& .SideNavigationHeader__options": {
      position: "absolute",
      top: "100%",
      left: 0,
      zIndex: theme.baseZIndex ? theme.baseZIndex * 1000 : 1000,
      width: "100%",
      minWidth: "fit-content",
      boxShadow: "0 6px 18px -3px rgba(0, 0, 0, .5)",
      backgroundColor: "inherit"
    },

    "& .SideNavigationHeader__option": {
      padding: theme.spacing ? theme.spacing : 16,
      minWidth: "fit-content",
      whiteSpace: "pre",
      cursor: "pointer"
    },

    "& .SideNavigationHeader__option:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.07)"
    }
  }
}

export default glamorous(SideNavigationHeader)(style)
export { SideNavigationHeader }
