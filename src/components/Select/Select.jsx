// @flow
import React, { Component } from "react"
import glamorous from "glamorous"

import { spin, fadeIn, resetTransform } from "../../utils/animations"
import { hexOrColor, readableTextColor } from "../../utils/color"

import SelectOption from "./Option/SelectOption"
import SelectFilter from "./Filter/SelectFilter"

type option = { id: number, label: string, value: any }

type Props = {
  className: string,
  placeholder: string,
  options: Array<option>,
  filterable: boolean,
  disabled: boolean,
  multiple: boolean,
  onClick: () => mixed,
  onFilter: () => mixed,
}

type State = {
  open: boolean,
  updating: boolean,
  value: option | Array<option> | string,
  filter: RegExp,
}

class Select extends Component<{}, Props, State> {
  static defaultProps = {
    filterable: false,
    disabled: false,
    multiple: false,
    options: []
  }

  state = {
    open: false,
    updating: false,
    value: this.getInitialValue(),
    filter: new RegExp(/./g)
  }

  container: HTMLDivElement | null = null

  handleEsc = (e: SyntheticEvent) => {
    if (e.keyCode === 27) {
      this.close()
    }
  }

  // This implements "click outside to close" behavior
  handleClick = (e: SyntheticEvent) => {
    const el = this.container

    // if the container is somehow null, or if the component didn't mount
    if (el === null) {
      return
    }

    // if we're somehow not working with a DOM node (flowtype is fun!)
    if (!(e.target instanceof Node)) {
      return
    }

    // if we're clicking on the Select itself,
    if (el.contains(e.target)) {
      return
    }

    // if we're clicking outside,
    this.close()
  }

  componentDidMount() {
    window.addEventListener("click", this.handleClick, true)
    window.addEventListener("keyup", this.handleEsc, true)
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClick, true)
    window.removeEventListener("keyup", this.handleEsc, true)
  }

  getInitialValue() {
    if (this.props.multiple) {
      return []
    }

    return this.props.options[0]
      ? this.props.options[0]
      : this.props.placeholder
  }

  getValue() {
    if (!this.props.multiple) {
      return this.state.value
    }

    if (!(this.state.value instanceof Array)) {
      throw new Error(
        "<Select>: Strings are not allowed to be values of a Select component with the multiple attribute"
      )
    }

    const displayedValue = []
    this.state.value.map(option => displayedValue.push(option.label))
    return displayedValue.join(", ")
  }

  selectOption(option: option) {
    if (!this.props.multiple) {
      this.setState(() => ({ value: option }))
      return
    }

    if (!(this.state.value instanceof Array)) {
      throw new Error(
        "<Select>: Strings are not allowed to be values of a Select component with the multiple attribute"
      )
    }

    const optionIndex: number = this.state.value.indexOf(option)

    if (optionIndex < 0) {
      this.setState(prevState => ({ value: [...prevState.value, option] }))
    } else {
      this.setState(prevState => ({
        value: [
          ...prevState.value.slice(0, optionIndex),
          ...prevState.value.slice(optionIndex + 1)
        ]
      }))
    }
  }

  isOptionSelected(option: option) {
    if (!this.props.multiple) {
      return this.state.value === option
    }

    if (!(this.state.value instanceof Array)) {
      throw new Error(
        "<Select>: Strings are not allowed to be values of a Select component with the multiple attribute"
      )
    }

    return this.state.value.indexOf(option) > -1
  }

  async updateFilter(event: SyntheticEvent) {
    event.persist()
    if (this.props.onFilter) {
      this.setState(() => ({ updating: true }))
      await this.props.onFilter()
    }

    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error(
        "<Select>: Your filter field is _not_ an input element and therefore has an unreadable value."
      )
    }

    const filter = event.target.value
    this.setState(() => ({ updating: false, filter }))
  }

  async toggle() {
    if (!this.state.open && this.props.onClick) {
      this.setState(() => ({ updating: true }))
      await this.props.onClick()
    }
    this.setState(prevState => ({ updating: false, open: !prevState.open }))
  }

  close() {
    this.setState(() => ({
      open: false
    }))
  }

  render() {
    return (
      <div
        ref={container => this.container = container}
        className={`${this.props.className} Select${this.state.open
          ? " Select_open"
          : ""}${this.state.updating ? " Select_updating" : ""}`}
        role="listbox"
        tabIndex="-2"
        onClick={() => this.toggle()}
      >
        <div className="Select__value">
          {this.getValue() || this.props.placeholder}
        </div>
        {this.props.options.length && this.state.open
          ? <div className="Select__options">
            {this.props.filterable &&
                <SelectFilter onChange={e => this.updateFilter(e)} />}
            <div className="Select__options_list">
              {this.props.options.map(
                (option: option) =>
                  option.label.match(new RegExp(this.state.filter, "i")) &&
                    <SelectOption
                      key={option.id}
                      onClick={() => this.selectOption(option)}
                      selected={this.isOptionSelected(option)}
                    >
                      {option.label}
                    </SelectOption>
              )}
            </div>
          </div>
          : ""}
      </div>
    )
  }
}

const style = (
  {
    theme,
    color,
    disabled
  }: {
    theme: THEME,
    color?: string,
    disabled?: boolean,
  } = {}
) => {
  const backgroundColor =
    color && theme.colors ? hexOrColor(color)(theme.colors[color]) : "white"

  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing ? theme.spacing / 2 : 8,
    paddingRight: theme.spacing ? theme.spacing / 2 + 40 : 48,
    width: "fit-content",
    minHeight: 20,
    border: "1px solid",
    borderColor: theme.greys ? theme.greys[30] : "#ccc",
    opacity: disabled ? 0.5 : 1,
    cursor: "pointer",
    backgroundColor,
    color: readableTextColor(backgroundColor)(["black", "white"]),
    pointerEvents: disabled ? "none" : "all",

    // downward caret.
    "&::after": {
      content: "''",
      position: "absolute",
      top: "50%",
      right: theme.spacing ? theme.spacing / 2 : 8,
      width: 0,
      height: 0,
      border: "4px solid transparent",
      borderTopColor: theme.greys ? theme.greys[70] : "#888",
      transform: "translateY(calc(-50% + 2px))"
    },

    // spinner when loading.
    "&.Select_updating::after": {
      top: 6,
      width: 16,
      height: 16,
      border: 0,
      borderRadius: "50%",
      boxShadow: `1px 0px 0px 0px ${theme.greys
        ? theme.greys["70"]
        : "#666"} inset`,
      animation: `.7s ${spin} linear infinite`
    },

    "& .Select__options": {
      position: "absolute",
      top: "calc(100% + 1px)",
      left: 0,
      zIndex: theme.baseZIndex ? theme.baseZIndex * 1000 : 1000,
      width: "100%",
      boxShadow: "0 2px 7px 2px rgba(0, 0, 0, .14)",
      opacity: 0,
      transform: "translateY(-10px)",
      animation: `${fadeIn} .15s forwards ease, ${resetTransform} .15s forwards ease`
    },

    "& .Select__options_list": {
      maxHeight: "50vh"
    }
  }
}

export default glamorous(Select)(style)
export { Select }
