import * as React from "react"

import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "contiamo-ui-theme"
import { fadeIn } from "contiamo-ui-utils"

export interface IOption {
  id: number
  label: string
  default?: boolean
}

export interface IProps {
  key?: string | number
  css?: {}
  className?: string
  children: React.ReactNode
  options?: IOption[]
  onChange?: () => void
  theme?: Theme
}

export interface IState {
  open: boolean
  value: IOption
}

const Container = glamorous.div(({ theme, hasOptions }: { theme: Theme; hasOptions: boolean }): any => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: 50,
  flex: "0 0 50px",
  borderBottom: "1px solid rgba(255, 255, 255, .1)",
  cursor: hasOptions ? "pointer" : "default",
  backgroundColor: "inherit",

  // Caret
  "&::after": {
    content: hasOptions ? '""' : "none",
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
  }
}))

const Options = glamorous.div(({ theme }: { theme: Theme }): any => ({
  position: "absolute",
  top: "100%",
  left: 0,
  zIndex: theme.baseZIndex + 100,
  width: "100%",
  minWidth: "fit-content",
  boxShadow: "0 6px 18px -3px rgba(0, 0, 0, .5)",
  backgroundColor: "inherit"
}))

const Option = glamorous.div(({ theme }: { theme: Theme }): any => ({
  padding: theme.spacing,
  minWidth: "fit-content",
  whiteSpace: "pre",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.07)"
  }
}))

const Value = glamorous.div(({ theme }: { theme: Theme }): any => ({
  width: "fit-content",
  whiteSpace: "pre"
}))

class SideNavigationHeader extends React.Component<IProps, IState> {
  static defaultProps: { options: IOption[] } = {
    options: []
  }
  state = {
    open: false,
    value: { id: -1, label: "" }
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

  async onChange(option: IOption) {
    if (this.props.onChange) {
      await this.props.onChange()
    }
    this.setState(prevState => ({ ...prevState, value: option }))
  }

  getDropdown() {
    return (
      <Options>
        {this.props.options.map(option => (
          <Option
            key={option.id}
            onClick={() => this.onChange(option)}
            tabIndex={option.id * -1}
            aria-selected={this.state.value === option}
            role="option"
          >
            {option.label}
          </Option>
        ))}
      </Options>
    )
  }

  render() {
    return (
      <Container
        key={this.props.key}
        css={this.props.css}
        className={this.props.className}
        hasOptions={this.props.options && this.props.options.length > 0}
        onClick={() => this.toggle()}
        tabIndex={-1}
        role="listbox"
      >
        {this.props.children}
        {this.state.value && <Value>{this.state.value.label}</Value>}
        {this.props.options.length > 0 && this.state.open && this.getDropdown()}
      </Container>
    )
  }
}

export default SideNavigationHeader
