import * as React from "react"
import { DefaultProps } from "../types"
import ContextMenu from "../ContextMenu/ContextMenu"
import Input from "../Input/Input"
import styled from "../utils/styled"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import { expandColor } from "../utils/constants"
import LabelText from "../LabelText/LabelText"
import { useUniqueId } from "../useUniqueId"

export type Value = number | symbol | string

export interface IOption {
  label?: string
  value: Value
}

export interface SelectProps extends DefaultProps {
  /** Options available */
  options: IOption[]
  /** Current value */
  value: null | Value | Value[]
  /** Make the list filterable */
  filterable?: boolean
  /** Limit the number of options displayed */
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
  /** Custom Option */
  customOption?: string
}

const borderRadius = 2

const Container = styled("div")<{ disabled: boolean; color?: string }>`
  display: flex;
  flex-direction: column;
  color: ${({ theme, color }) => expandColor(theme, color)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

const Combobox = styled("div")<{ naked: boolean }>`
  display: grid;
  grid-template-columns: auto 40px;
  grid-gap: 1px;
  align-items: stretch;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-width: ${({ naked }) => (naked ? 0 : 1)}px;
  border-radius: ${borderRadius}px;
`

const SelectInput = styled(Input)`
  width: fit-content;
  border: 0;
  background: transparent;
  color: currentColor;
  cursor: inherit;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`

const FilterInput = styled(Input)`
  border: 0;
  margin: ${({ theme }) => -theme.space.content}px;
  border-radius: 0;
  height: auto;
`

const DropdownButton = styled("div")<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 1px ${({ theme, isOpen }) => (isOpen ? theme.color.primary : "transparent")};
  border-top-right-radius: ${borderRadius}px;
  border-bottom-right-radius: ${borderRadius}px;

  ::after {
    content: "";
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-top-color: ${({ theme, isOpen }) => (isOpen ? theme.color.primary : theme.color.border.default)};
    transform: ${({ isOpen }) => (isOpen ? `translateY(-2px) rotate(180deg)` : `translateY(2px)`)};
  }
`

DropdownButton.defaultProps = { role: "button", "aria-disabled": false, "aria-label": "Expand" }

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  maxOptions,
  value,
  naked,
  onChange,
  placeholder,
  color,
  disabled,
  filterable,
  id,
  customOption,
}) => {
  const uniqueId = useUniqueId(id)
  const [filter, setFilter] = React.useState("")
  const [customInputValue, setCustomInputValue] = React.useState("")
  const customInputSymbol = React.useMemo(() => Symbol("custom input"), [])

  const appendCustomOption = React.useCallback(
    (options: IContextMenuItem[]): IContextMenuItem[] => {
      return [
        ...options,
        {
          label: String(customOption),
          value: customInputSymbol,
          onClick: () => {
            if (onChange) {
              onChange(customInputValue, customInputSymbol)
            }
          },
        },
      ]
    },
    [customOption, customInputValue],
  )

  const truncateOptions = React.useCallback(
    (options: SelectProps["options"]) => (maxOptions ? options.slice(0, maxOptions) : options),
    [maxOptions],
  )

  const filterOptions = React.useCallback(
    (options: SelectProps["options"]) =>
      options.filter(option => {
        const filterPattern = new RegExp(filter, "ig")
        return String(option.label).match(filterPattern) || String(option.value).match(filterPattern)
      }),
    [filter],
  )

  const prependFilter = React.useCallback(
    (items: IContextMenuItem[]): IContextMenuItem[] => [
      {
        label: (
          <FilterInput
            onClick={e => e.stopPropagation()}
            fullWidth
            placeholder="Filter..."
            value={filter}
            onChange={setFilter}
          />
        ),
      },
      ...items,
    ],
    [filter],
  )

  const isOptionSelected = React.useCallback(
    option => {
      if (!Array.isArray(value)) {
        return value === option.value
      }

      return value.includes(option.value)
    },
    [value],
  )

  const getNewValue = React.useCallback(
    (newValue: Value) => {
      if (Array.isArray(value) && !value.includes(newValue)) {
        return [...value, newValue]
      }
      if (Array.isArray(value) && value.includes(newValue)) {
        const newValueIndex = value.indexOf(newValue)
        return [...value.slice(0, newValueIndex), ...value.slice(newValueIndex + 1)]
      }
      return newValue
    },
    [value],
  )

  const items = React.useMemo(
    () =>
      truncateOptions(filterOptions(options)).map(
        (option): IContextMenuItem => ({
          ...option,
          onClick: () => {
            if (onChange) {
              onChange(getNewValue(option.value), option.value)
            }
          },
          label: option.label ? option.label : "",
          ...(isOptionSelected(option)
            ? {
                icon: "Yes",
                iconColor: "primary",
                iconLocation: "right",
              }
            : {}),
        }),
      ),
    [options, value, filter, maxOptions],
  )

  const getDisplayValue = React.useCallback(() => {
    if (value === customInputSymbol) {
      return customInputValue
    }

    if (Array.isArray(value)) {
      return value.join(", ")
    }

    return String(value)
  }, [customInputValue, customInputSymbol, value])

  return (
    <ContextMenu
      disabled={disabled}
      keepOpenOnItemClick={Array.isArray(value)}
      items={
        // I'm sorry, I'll refactor.
        customOption
          ? appendCustomOption(filterable ? prependFilter(items) : items)
          : filterable
          ? prependFilter(items)
          : items
      }
    >
      {isOpen => (
        <Container id={uniqueId} disabled={Boolean(disabled)} color={color}>
          {label && <LabelText>{label}</LabelText>}
          <Combobox naked={Boolean(naked)}>
            <SelectInput
              disabled={disabled}
              placeholder={placeholder}
              readOnly={value !== customInputValue}
              onClick={e => {
                if (value === customInputValue) {
                  e.stopPropagation()
                }
              }}
              value={getDisplayValue()}
              onChange={newValue => {
                setCustomInputValue(newValue)
                if (onChange) {
                  onChange(newValue)
                }
              }}
            />
            <DropdownButton isOpen={isOpen} />
          </Combobox>
        </Container>
      )}
    </ContextMenu>
  )
}

export default Select
