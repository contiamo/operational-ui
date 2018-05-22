import * as React from "react"
import glamorous, { CSSProperties } from "glamorous"

import { WithTheme, Css } from "../types"
import { Label, LabelText, inputFocus } from "../utils/mixins"
import SelectOption from "./Select.Option"
import SelectFilter from "./Select.Filter"
import { readableTextColor, spin, fadeIn, resetTransform } from "@operational/utils"
import { Theme, expandColor } from "@operational/theme"

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
  /** Id */
  id?: string
  /** Glamorous css */
  css?: Css
  /** ClassName */
  className?: string
  /** Options available */
  options: IOption[]
  /** Current value */
  value: null | Value | Value[]
  /** Make the list filterable */
  filterable?: boolean
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
}

export interface State {
  open: boolean
  updating: boolean
  search: string
}

const Container = glamorous.div(
  ({
    theme,
    color,
    disabled,
    style,
  }: {
    id?: string
    color?: string
    disabled: boolean
    style?: {}
    role?: string
    tabIndex?: number
    onClick?: () => void
    theme: Theme
  }): {} => {
    const backgroundColor = expandColor(theme, color) || theme.colors.white

    return {
      backgroundColor,
      label: "select",
      position: "relative",
      display: "flex",
      alignItems: "center",
      padding: `${theme.spacing / 2}px ${theme.spacing * 2 / 3 + 40}px ${theme.spacing / 2}px ${theme.spacing *
        2 /
        3}px `,
      borderRadius: 4,
      width: "fit-content",
      minWidth: 240,
      minHeight: 20,
      border: "1px solid",
      borderColor: theme.colors.inputBorder,
      opacity: disabled ? 0.5 : 1,
      cursor: "pointer",
      color: readableTextColor(backgroundColor, ["black", "white"]),
      outline: "none",
      pointerEvents: disabled ? "none" : "all",

      // downward caret.
      "&::after": {
        content: "''",
        position: "absolute",
        top: "50%",
        right: theme.spacing / 2,
        width: 0,
        height: 0,
        border: "4px solid transparent",
        borderTopColor: theme.colors.gray,
        transform: "translateY(calc(-50% + 2px))",
      },

      "&:focus": inputFocus({ theme }),
    }
  }
)

const DisplayValue = glamorous.div(({ theme, isPlaceholder }: { isPlaceholder: boolean; theme: Theme }): {} => ({
  color: isPlaceholder ? theme.colors.gray : theme.colors.black,
}))

const Options = glamorous.div(
  {
    position: "absolute",
    // Push it down 6px so it doesn't overlap with the focus shadow,
    // and there's a comfortable 2px gap.
    top: "calc(100% + 6px)",
    left: 0,
    width: "100%",
    overflow: "hidden",
    borderRadius: 4,
    opacity: 0,
    transform: "translateY(-10px)",
    animation: `${fadeIn} .15s forwards ease,
    ${resetTransform} .15s forwards ease`,
  },
  ({ theme }: { theme: Theme }): {} => ({
    boxShadow: theme.shadows.popup,
    zIndex: theme.baseZIndex + 300,
  })
)

const OptionsList = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  // whole number + 3/4 ratio here ensures options don't get cut off
  maxHeight: theme.spacing * 12.75,
  overflow: "auto",
}))

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
