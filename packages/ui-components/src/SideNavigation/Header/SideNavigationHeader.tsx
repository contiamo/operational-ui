import * as React from "react"

import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "contiamo-ui-theme"
import { fadeIn } from "contiamo-ui-utils"

export interface IOption {
  id: number
  label: string
  value: any
}

export interface IProps {
  id?: string | number
  css?: {}
  className?: string
  children: React.ReactNode
  options?: IOption[]
  value?: string
  onChange?: (option: IOption) => void
  theme?: Theme
}

export interface IState {
  isOpen: boolean
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
    content: hasOptions ? "\"\"" : "none",
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
    isOpen: false
  }

  toggle() {
    if (this.props.options.length === 0) {
      return
    }
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }

  onChange(option: IOption): void {
    if (this.props.onChange) {
      this.props.onChange(option)
    }
  }

  labelFor(value: string): string {
    const option = this.props.options.find(option => option.value === value)
    return option ? option.label : value
  }

  displayDropdown() {
    const { options, value } = this.props
    return (
      <Options>
        {options.map(option => (
          <Option
            key={option.id}
            onClick={() => this.onChange(option)}
            tabIndex={option.id * -1}
            aria-selected={option.value === value}
            role="option"
          >
            {option.label}
          </Option>
        ))}
      </Options>
    )
  }

  render() {
    const { id, css, className, options, value, children } = this.props
    return (
      <Container
        key={id}
        css={css}
        className={className}
        hasOptions={options && options.length > 0}
        onClick={() => this.toggle()}
        tabIndex={-1}
        role="listbox"
      >
        {children}
        {value ? <Value>{this.labelFor(value)}</Value> : null}
        {options.length > 0 && this.state.isOpen ? this.displayDropdown() : null}
      </Container>
    )
  }
}

export default SideNavigationHeader
