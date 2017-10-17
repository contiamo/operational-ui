import * as React from "react"
import glamorous from "glamorous"

import SelectOption from "./Option/SelectOption"
import SelectFilter from "./Filter/SelectFilter"

import { Container, Options, OptionsList } from "./Select.style"

type Value = number | string

export interface Option {
  label?: string
  value?: Value
}

interface IProps {
  css?: any
  className?: string
  options: Option[]
  value: undefined | Value | Value[]
  filterable?: boolean
  disabled?: boolean
  onChange: (newValue: Value | Value[]) => void
  onClick?: () => void
  onFilter?: () => void
  color?: string
  placeholder?: string
}

interface IState {
  open: boolean
  updating: boolean
  filter: RegExp
}

class Select extends React.Component<IProps, IState> {
  state: IState = {
    open: false,
    updating: false,
    filter: new RegExp(/./)
  }

  // flow complains if this isn't initialized sooo...
  container: HTMLDivElement | null

  // This implements "click outside to close" behavior
  handleClick = (e: MouseEvent) => {
    const el = this.container

    // if we're somehow not working with a DOM node (flowtype is fun!)
    if (!(e.target instanceof Node)) {
      return
    }
    // if we're clicking on the Select itself,
    if (el && el.contains(e.target)) {
      return
    }

    // if we're clicking outside,
    this.close()
  }

  handleEsc = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      this.close()
    }
  }

  componentDidMount() {
    window.addEventListener("click", this.handleClick, true)
    window.addEventListener("keyup", this.handleEsc, true)
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClick, true)
    window.removeEventListener("keyup", this.handleEsc, true)
  }

  getDisplayValue(): string {
    if (!this.props.value) {
      return this.props.placeholder || "No entries selected"
    }

    if (!Array.isArray(this.props.value)) {
      return this.props.options.filter(option => option.value === this.props.value)[0].label
    }

    const listDisplay = this.props.options
      .map(option => ((this.props.value as Value[]).indexOf(option.value) > -1 ? option.label : null))
      .filter(a => !!a)
      .join(", ")
    return listDisplay === "" ? this.props.placeholder || "No entries selected" : listDisplay
  }

  selectOption(option: Option) {
    if (!Array.isArray(this.props.value)) {
      this.props.onChange(option.value)
      return
    }

    const optionIndex: number = this.props.value.indexOf(option.value)

    if (optionIndex < 0) {
      this.props.onChange([...this.props.value, option.value])
    } else {
      this.props.onChange([...this.props.value.slice(0, optionIndex), ...this.props.value.slice(optionIndex + 1)])
    }
  }

  isOptionSelected(option: Option) {
    if (!Array.isArray(this.props.value)) {
      return this.props.value === option
    }

    return this.props.value.indexOf(option.value) > -1
  }

  async updateFilter(event: React.SyntheticEvent<HTMLInputElement>) {
    event.persist()

    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("<Select>: Your filter field is _not_ an input element and therefore has an unreadable value.")
    }

    if (this.props.onFilter) {
      this.setState(() => ({ updating: true }))
      await this.props.onFilter()
    }

    const filter = new RegExp(event.target.value, "i")
    this.setState(() => ({ filter, updating: false }))
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
      <Container
        innerRef={container => (this.container = container)}
        css={this.props.css}
        className={this.props.className}
        updating={this.state.updating}
        color={this.props.color}
        disabled={this.props.disabled}
        role="listbox"
        tabIndex={-2}
        onClick={() => this.toggle()}
      >
        <div>{this.getDisplayValue() || this.props.placeholder}</div>
        {this.props.options.length && this.state.open ? (
          <Options>
            {this.props.filterable && <SelectFilter onChange={(e: any) => this.updateFilter(e)} />}
            <OptionsList>
              {this.props.options.map(
                (option: Option) =>
                  option.label.match(this.state.filter) && (
                    <SelectOption
                      key={String(option.value)}
                      onClick={() => this.selectOption(option)}
                      selected={this.isOptionSelected(option)}
                    >
                      {option.label}
                    </SelectOption>
                  )
              )}
            </OptionsList>
          </Options>
        ) : (
          ""
        )}
      </Container>
    )
  }
}

export default Select
