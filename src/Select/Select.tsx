import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

import { height as inputHeight } from "../Input/Input.constants"
import { LabelText } from "../LabelText/LabelText"
import { floatIn, keyCodes, resetTransform } from "../utils"
import { expandColor } from "../utils/constants"
import { inputFocus, Label } from "../utils/mixins"
import SelectFilter from "./Select.Filter"
import SelectOption from "./Select.Option"

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

export interface SelectProps extends DefaultProps {
  /** Options available */
  options: IOption[]
  /** Current value */
  value: null | Value | Value[]
  /** Make the list filterable */
  filterable?: boolean
  /**
   * Limit the number of options displayed
   */
  maxOptions?: number
  /** Disable the component */
  disabled?: boolean
  /** Callback trigger on any changes */
  onChange?: (newValue: null | Value | Value[], changedItem?: Value) => void
  /** Text color */
  color?: string
  /** Text to display when no active selection */
  placeholder?: string
  /** Label text */
  label?: string
  /** Should the Select be rendered with a full box style? */
  naked?: boolean
}

export interface State {
  open: boolean
  updating: boolean
  search: string
}

const Container = styled("div")<{ color?: string; disabled: boolean; naked: boolean }>(
  ({ theme, color, disabled, naked }) => {
    const backgroundColor = naked ? "transparent" : expandColor(theme, color) || theme.color.white
    const dropdownArrowWidth = 56
    return {
      backgroundColor,
      label: "select",
      position: "relative",
      display: "flex",
      alignItems: "center",
      padding: `${theme.space.small}px ${dropdownArrowWidth}px ${theme.space.small}px ${theme.space.content}px`,
      borderRadius: 4,
      width: "fit-content",
      minWidth: !naked ? 200 : "none",
      minHeight: inputHeight,
      border: naked ? 0 : "1px solid",
      borderColor: theme.color.border.default,
      opacity: disabled ? 0.5 : 1,
      cursor: "pointer",
      outline: "none",
      pointerEvents: disabled ? "none" : "all",
      // downward caret.
      "&::after": {
        content: "''",
        position: "absolute",
        top: "50%",
        right: theme.space.content,
        width: 0,
        height: 0,
        border: "4px solid transparent",
        borderTopColor: theme.color.border.default,
        transform: `translateY(calc(-50%${naked ? "" : " +2px"}))`,
      },
      "&:focus":
        !naked &&
        inputFocus({
          theme,
        }),
    }
  },
)

const DisplayValue = styled("div")<{ isPlaceholder: boolean }>(({ theme, isPlaceholder }) => {
  if (isPlaceholder) {
    return {
      color: theme.color.text.lightest,
    }
  }

  return {
    color: "currentColor",
  }
})

const Options = styled("div")(
  {
    position: "absolute",
    /**
     * Push it down 6px so it doesn't overlap with the focus shadow,
     * and there's a comfortable 2px gap.
     */
    top: "calc(100% + 6px)",
    left: 0,
    minWidth: "100%",
    overflow: "hidden",
    borderRadius: 4,
    opacity: 0,
    transform: "translateY(-10px)",
    animation: `${floatIn} .15s forwards ease,
    ${resetTransform} .15s forwards ease`,
  },
  ({ theme }) => ({
    boxShadow: "0 3px 12px rgba(0, 0, 0, .14)",
    zIndex: theme.zIndex.selectOptions,
  }),
)

const OptionsList = styled("div")({
  maxHeight: 200,
  overflow: "auto",
})

class Select extends React.Component<SelectProps, State> {
  public state: State = {
    open: false,
    updating: false,
    search: "",
  }

  public containerNode?: Node

  public static defaultProps: Partial<SelectProps> = {
    placeholder: "No entries selected",
    naked: false,
  }

  // This implements "click outside to close" behavior
  public handleClick = (ev: MouseEvent): void => {
    // if we're clicking on the Select itself,
    if (this.containerNode && this.containerNode.contains(ev.target as Node)) {
      return
    }

    // if we're clicking outside,
    this.close()
  }

  public handleEsc = (e: KeyboardEvent) => {
    if (e.keyCode === keyCodes.esc) {
      this.close()
    }
  }

  public componentDidUpdate() {
    if (this.state.open) {
      document.addEventListener("click", this.handleClick)
      document.addEventListener("keyup", this.handleEsc)
    } else {
      document.removeEventListener("click", this.handleClick)
      document.removeEventListener("keyup", this.handleEsc)
    }
  }

  public getDisplayValue(): string | undefined {
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
    return listDisplay === "" ? this.props.placeholder || "" : listDisplay
  }

  public selectOption(option: IOption) {
    const { onChange } = this.props

    if (!onChange) {
      return
    }

    if (!Array.isArray(this.props.value)) {
      this.setState({
        open: false,
      })
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

  public isOptionSelected(option: IOption) {
    if (!Array.isArray(this.props.value)) {
      return this.props.value === option.value
    }

    return this.props.value.indexOf(option.value) > -1
  }

  public close() {
    this.setState(() => ({
      open: false,
    }))
  }

  public render() {
    const { color, disabled, naked, value, options, filterable, label, onChange, maxOptions, ...props } = this.props
    const { open, search } = this.state
    const selectWithoutLabel = (
      <Container
        {...props}
        color={color}
        disabled={Boolean(disabled)}
        naked={Boolean(naked)}
        ref={(containerNode: HTMLDivElement) => (this.containerNode = containerNode)}
        role="listbox"
        tabIndex={-2}
        onClick={() => {
          this.setState(prevState => ({
            open: !prevState.open,
          }))
        }}
      >
        <DisplayValue isPlaceholder={Array.isArray(value) ? value.length === 0 : !value}>
          {this.getDisplayValue()}
        </DisplayValue>
        {Boolean(options.length) && open && (
          <Options>
            {filterable && (
              <SelectFilter
                onChange={(filterValue: string) => {
                  this.setState({
                    search: filterValue,
                  })
                }}
              />
            )}
            <OptionsList>
              {options
                .filter(option => (option.label || String(option.value)).match(RegExp(search, "i")))
                .map(option => (
                  <SelectOption
                    key={String(option.value)}
                    onClick={() => {
                      this.selectOption(option)
                    }}
                    selected={this.isOptionSelected(option)}
                  >
                    {option.label || String(option.value)}
                  </SelectOption>
                ))
                .slice(0, maxOptions)}
            </OptionsList>
          </Options>
        )}
      </Container>
    )
    return label ? (
      <Label {...props}>
        <LabelText>{label}</LabelText>
        {selectWithoutLabel}
      </Label>
    ) : (
      selectWithoutLabel
    )
  }
}

export default Select
