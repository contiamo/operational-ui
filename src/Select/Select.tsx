import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

import { height as inputHeight } from "../Input/Input.constants"
import { LabelText } from "../LabelText/LabelText"
import { floatIn, keyCodes, readableTextColor, resetTransform } from "../utils"
import { expandColor } from "../utils/constants"
import { inputFocus, Label } from "../utils/mixins"
import SelectFilter from "./Select.Filter"
import SelectOption from "./Select.Option"

export type Value = number | string

export interface IOption {
  label?: string
  value: Value
}

export interface SelectProps extends DefaultProps {
  /** The ID of this Select field */
  id?: string
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

const displayOption = (opt: IOption): string => {
  if (opt.label) {
    return opt.label
  }

  return String(opt.value)
}

const Container = styled("div")<Partial<SelectProps>>(({ theme, color, disabled, naked }) => {
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
    color: readableTextColor(backgroundColor, ["black", "white"]),
    outline: "none",
    pointerEvents: disabled ? "none" : "all",
    // downward caret.
    "&::after": {
      content: "''",
      position: "absolute",
      top: "50%",
      right: theme.space.small,
      width: 0,
      height: 0,
      border: "4px solid transparent",
      borderTopColor: theme.color.border.default,
      transform: "translateY(calc(-50% + 2px))",
    },
    "&:focus":
      !naked &&
      inputFocus({
        theme,
      }),
  }
})

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

const Select: React.FC<SelectProps> = ({
  value,
  placeholder,
  options,
  id,
  label,
  color,
  disabled,
  className,
  children,
  filterable,
  maxOptions,
  naked,
  onChange,
  ...props
}) => {
  const containerNode = React.useRef(null)
  const [open, setOpen] = React.useState(false)
  // const [updating, setUpdating] = React.useState(false)
  const [search, setSearch] = React.useState("")

  // This implements "click outside to close" behavior
  const handleClick = React.useCallback((ev: MouseEvent): void => {
    // if we're clicking on the Select itself,
    if (containerNode.current && (containerNode.current as any).contains(ev.target as Node)) {
      return
    }

    // if we're clicking outside,
    setOpen(false)
  }, [])

  const close = React.useCallback(() => {
    setOpen(false)
  }, [])

  const handleEsc = React.useCallback((e: KeyboardEvent) => {
    if (e.keyCode === keyCodes.esc) {
      close()
    }
  }, [])

  React.useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClick)
      document.addEventListener("keyup", handleEsc)
    } else {
      document.removeEventListener("click", handleClick)
      document.removeEventListener("keyup", handleEsc)
    }
  }, [open])

  const getDisplayValue = (): string | undefined => {
    if (!value) {
      return placeholder
    }

    if (!Array.isArray(value)) {
      const displayedOption = options.filter(option => option.value === value)[0]
      return displayedOption ? displayOption(displayedOption) : placeholder
    }

    const listDisplay = options
      .map(option => ((value as Value[]).indexOf(option.value) > -1 ? displayOption(option) : null))
      .filter(a => !!a)
      .join(", ")
    return listDisplay === "" ? placeholder || "" : listDisplay
  }

  const selectOption = React.useCallback((option: IOption) => {
    if (!onChange) {
      return
    }

    if (!Array.isArray(value)) {
      setOpen(false)
      onChange(value === option.value ? null : option.value)
      return
    }

    const optionIndex: number = value.indexOf(option.value)

    if (optionIndex < 0) {
      onChange([...value, option.value], option.value)
    } else {
      onChange([...value.slice(0, optionIndex), ...value.slice(optionIndex + 1)], option.value)
    }
  }, [])

  const isOptionSelected = React.useCallback((option: IOption) => {
    if (!Array.isArray(value)) {
      return value === option.value
    }

    return value.indexOf(option.value) > -1
  }, [])

  const toggle = React.useCallback(() => {
    setOpen(!open)
  }, [])

  const selectWithoutLabel = (
    <Container
      {...props}
      color={color}
      disabled={disabled}
      naked={naked}
      innerRef={containerNode}
      role="listbox"
      tabIndex={-2}
      onClick={toggle}
    >
      <DisplayValue isPlaceholder={Array.isArray(value) ? value.length === 0 : !value}>
        {getDisplayValue()}
      </DisplayValue>
      {Boolean(options.length) && open && (
        <Options>
          {filterable && (
            <SelectFilter
              onChange={(filterValue: string) => {
                setSearch(filterValue)
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
                    selectOption(option)
                  }}
                  selected={isOptionSelected(option)}
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

Select.defaultProps = {
  placeholder: "No entries selected",
  naked: false,
}

export default Select
