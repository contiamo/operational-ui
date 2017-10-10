import * as React from "react"

import glamorous from "glamorous"
import { fadeIn } from "contiamo-ui-utils"

type option = {
  id: number
  label: string
  default?: boolean
}

type Props = {
  className?: string
  children: React.ReactNode
  options?: option[]
  onChange?: () => void
  theme?: Theme
}

type State = {
  open: boolean
  value: option
}

class SideNavigationHeader extends React.Component<Props, State> {
  static defaultProps: { options: option[] } = {
    options: []
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      open: false,
      value: { id: -1, label: "" }
    }
  }
  componentDidMount() {
    this.setState(() => ({ value: this.getDefaultValue() }))
  }
  getDefaultValue() {
    return this.props.options.find(option => option.default === true) || this.props.options[0]
  }
  toggle() {
    if (this.props.options.length === 0) {
      return
    }
    this.setState(prevState => ({ open: !prevState.open }))
  }
  async onChange(option: option) {
    if (this.props.onChange) {
      await this.props.onChange()
    }
    this.setState(prevState => ({ ...prevState, value: option }))
  }
  getDropdown() {
    return (
      <div className="SideNavigationHeader__options">
        {this.props.options.map(option => (
          <div
            key={option.id}
            className="SideNavigationHeader__option"
            onClick={() => this.onChange(option)}
            tabIndex={option.id * -1}
            aria-selected={this.state.value === option}
            role="option"
          >
            {option.label}
          </div>
        ))}
      </div>
    )
  }
  render() {
    return (
      <div
        className={`${this.props.className} SideNavigationHeader`}
        onClick={() => this.toggle()}
        tabIndex={-1}
        role="listbox"
      >
        {this.props.children}
        {this.state.value && <div className="SideNavigationHeader__value">{this.state.value.label}</div>}
        {this.props.options.length > 0 && this.state.open && this.getDropdown()}
      </div>
    )
  }
}

const style: {} = ({ theme, options }: Props) => {
  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderBottom: "1px solid rgba(255, 255, 255, .1)",
    padding: `${theme.spacing * 3 / 4}px 0`,
    cursor: options && options.length ? "pointer" : "default",
    backgroundColor: "inherit",

    // Caret
    "&::after": {
      content: options && options.length ? '""' : "none",
      position: "absolute",
      top: "50%",
      right: theme.spacing,
      width: 0,
      height: 0,
      opacity: 0,
      transform: "translateY(-50%)",
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
      zIndex: theme.baseZIndex + 100,
      width: "100%",
      minWidth: "fit-content",
      boxShadow: "0 6px 18px -3px rgba(0, 0, 0, .5)",
      backgroundColor: "inherit"
    },

    "& .SideNavigationHeader__option": {
      padding: theme.spacing,
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
