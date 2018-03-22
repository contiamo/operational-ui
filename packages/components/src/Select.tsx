import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

import { Label, LabelText } from "./utils/mixins"
import SelectOption from "./Select/SelectOption"
import SelectFilter from "./Select/SelectFilter"
import { Container, Options, OptionsList, DisplayValue } from "./Select/Select.style"

export type Value = number | string

export interface IOption {
  label?: string
  value: Value
}

const displayOption = (opt: IOption): string => {
  if (opt.label) {
    return opt.label
  }
  return String(opt.value)
}

export interface Props {
  id?: string
  css?: any
  className?: string
  options: IOption[]
  value: undefined | Value | Value[]
  filterable?: boolean
  disabled?: boolean
  onChange: (newValue: Value | Value[], changedItem?: Value) => void
  onClick?: () => void
  onFilter?: () => void
  color?: string
  placeholder?: string
  label?: string
}

export interface State {
  open: boolean
  updating: boolean
  filter: RegExp
}

class Select extends React.Component<Props, State> {
  state: State = {
    open: false,
    updating: false,
    filter: new RegExp(/./)
  }

  containerNode: any

  // This implements "click outside to close" behavior
  handleClick(ev: MouseEvent) {
    // if we're clicking on the Select itself,
    if (this.containerNode && this.containerNode.contains(ev.target)) {
      return
    }

    // if we're clicking outside,
    this.close()
  }

  handleEsc(e: KeyboardEvent) {
    if (e.keyCode === 27) {
      this.close()
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClick.bind(this), true)
    document.addEventListener("keyup", this.handleEsc.bind(this), true)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick.bind(this), true)
    document.removeEventListener("keyup", this.handleEsc.bind(this), true)
  }

  getDisplayValue(): string {
    const placeholder = this.props.placeholder || "No entries selected"
    if (!this.props.value) {
      return placeholder
    }

    if (!Array.isArray(this.props.value)) {
      const displayedOption = this.props.options.filter(option => option.value === this.props.value)[0]
      return displayedOption ? displayOption(displayedOption) : placeholder
    }

    const listDisplay = this.props.options
      .map(option => ((this.props.value as Value[]).indexOf(option.value) > -1 ? displayOption(option) : null))
      .filter(a => !!a)
      .join(", ")
    return listDisplay === "" ? this.props.placeholder || "No entries selected" : listDisplay
  }

  selectOption(option: IOption) {
    if (!Array.isArray(this.props.value)) {
      this.props.onChange(this.props.value === option.value ? null : option.value)
      return
    }

    const optionIndex: number = this.props.value.indexOf(option.value)

    if (optionIndex < 0) {
      this.props.onChange([...this.props.value, option.value], option.value)
    } else {
      this.props.onChange(
        [...this.props.value.slice(0, optionIndex), ...this.props.value.slice(optionIndex + 1)],
        option.value
      )
    }
  }

  isOptionSelected(option: IOption) {
    if (!Array.isArray(this.props.value)) {
      return this.props.value === option.value
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
    const { id, color, disabled, value, options, filterable, label } = this.props
    const { updating, open, filter } = this.state

    const selectWithoutLabel = (
      <Container
        id={id}
        innerRef={(containerNode: HTMLElement) => (this.containerNode = containerNode)}
        updating={updating}
        color={color}
        disabled={disabled}
        role="listbox"
        tabIndex={-2}
        onClick={() => this.toggle()}
      >
        <DisplayValue isPlaceholder={Array.isArray(value) ? value.length === 0 : !value}>
          {this.getDisplayValue()}
        </DisplayValue>
        {options.length &&
          open && (
            <Options>
              {filterable && <SelectFilter onChange={(e: any) => this.updateFilter(e)} />}
              <OptionsList>
                {options.map(
                  (option: IOption) =>
                    option.label.match(filter) && (
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
          )}
      </Container>
    )

    return label ? (
      <Label>
        <LabelText>{label}</LabelText>
        {selectWithoutLabel}
      </Label>
    ) : (
      selectWithoutLabel
    )
  }
}

export default Select
