import * as React from "react"
import glamorous, { CSSProperties } from "glamorous"
import { Theme } from "@operational/theme"

import { WithTheme, Css } from "./types"
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
  css?: Css
  className?: string
  options: IOption[]
  value: null | Value | Value[]
  filterable?: boolean
  disabled?: boolean
  onChange?: (newValue: null | Value | Value[], changedItem?: Value) => void
  color?: string
  placeholder?: string
  label?: string
}

export interface State {
  open: boolean
  updating: boolean
  search: string
}

class Select extends React.Component<Props, State> {
  state: State = {
    open: false,
    updating: false,
    search: "",
  }

  containerNode: Node

  static defaultProps: Partial<Props> = {
    placeholder: "No entries selected",
  }

  // This implements "click outside to close" behavior
  handleClick(ev: React.SyntheticEvent<Node>): void {
    // if we're clicking on the Select itself,
    if (this.containerNode && this.containerNode.contains(ev.target as Node)) {
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
    const { placeholder } = this.props
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
    return listDisplay === "" ? this.props.placeholder : listDisplay
  }

  selectOption(option: IOption) {
    const { onChange } = this.props
    if (!onChange) {
      return
    }
    if (!Array.isArray(this.props.value)) {
      onChange(this.props.value === option.value ? null : option.value)
      return
    }

    const optionIndex: number = this.props.value.indexOf(option.value)

    if (optionIndex < 0) {
      onChange([...this.props.value, option.value], option.value)
    } else {
      onChange([...this.props.value.slice(0, optionIndex), ...this.props.value.slice(optionIndex + 1)], option.value)
    }
  }

  isOptionSelected(option: IOption) {
    if (!Array.isArray(this.props.value)) {
      return this.props.value === option.value
    }

    return this.props.value.indexOf(option.value) > -1
  }

  close() {
    this.setState(() => ({
      open: false,
    }))
  }

  render() {
    const { id, color, disabled, value, options, filterable, label } = this.props
    const { open, search } = this.state

    const selectWithoutLabel = (
      <Container
        id={id}
        innerRef={(containerNode: HTMLElement) => (this.containerNode = containerNode)}
        color={color}
        disabled={disabled}
        role="listbox"
        tabIndex={-2}
        onClick={() => {
          if (!this.state.open) {
            this.setState(prevState => ({
              open: true,
            }))
          }
        }}
      >
        <DisplayValue isPlaceholder={Array.isArray(value) ? value.length === 0 : !value}>
          {this.getDisplayValue()}
        </DisplayValue>
        {options.length &&
          open && (
            <Options>
              {filterable && (
                <SelectFilter
                  onChange={(val: string) => {
                    this.setState(prevState => ({
                      search: val,
                    }))
                  }}
                />
              )}
              <OptionsList>
                {options.map(
                  (option: IOption) =>
                    (option.label || String(option.value)).match(RegExp(search)) && (
                      <SelectOption
                        key={String(option.value)}
                        onClick={() => this.selectOption(option)}
                        selected={this.isOptionSelected(option)}
                      >
                        {option.label || String(option.value)}
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
