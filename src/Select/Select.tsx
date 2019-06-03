import * as React from "react"

import ContextMenu from "../ContextMenu/ContextMenu"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import LabelText from "../LabelText/LabelText"
import { useUniqueId } from "../useUniqueId"
import { FilterInput, Combobox, Container, DropdownButton, SelectInput } from "./Select.styled"
import { SelectProps } from "./Select.types"
import {
  truncateList,
  appendOption,
  customInputSymbol,
  filterList,
  getDisplayValue,
  getNewValue,
  isOptionSelected,
  prependFilter,
  optionsToContextMenuItems,
} from "./Select.util"

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
  ...rest
}) => {
  const uniqueId = useUniqueId(id)
  const [filter, setFilter] = React.useState("")
  const [customInputValue, setCustomInputValue] = React.useState("")

  const appendCustomOption = React.useCallback(
    (options: IContextMenuItem[]): IContextMenuItem[] => {
      // We can't have a multiselect _and_ a custom option.
      if (Array.isArray(value) && process.env.NODE_ENV === "production") {
        console.trace(
          "⚠️ Cannot show custom option with a multi-select Select component. Please either choose to have a single value, or remove the `customOption` property from your `Select` component.",
        )
        return options
      }

      return appendOption({
        label: String(customOption),
        value: customInputSymbol,
        onClick: () => {
          if (onChange) {
            onChange(customInputValue, customInputSymbol)
          }
        },
      })(options)
    },
    [customOption, customInputValue, value],
  )

  const filterComponent = React.useMemo(
    () => (
      <FilterInput
        onClick={e => e.stopPropagation()}
        fullWidth
        placeholder="Filter..."
        value={filter}
        onChange={setFilter}
      />
    ),
    [filter],
  )

  const items = React.useMemo(() => {
    const initialOptions = options
    const filteredOptions = filterList(filter)(initialOptions)
    const truncatedOptions = truncateList(maxOptions)(filteredOptions)
    const contextMenuItems = optionsToContextMenuItems(option => ({
      onClick: () => {
        if (onChange) {
          onChange(getNewValue(value)(option.value), option.value)
        }
      },
      label: option.label ? option.label : "",
      isActive: isOptionSelected(value)(option),
    }))(truncatedOptions)

    return ([
      [
        Boolean(filterable) && Boolean(customOption),
        appendCustomOption(prependFilter({ label: filterComponent })(contextMenuItems)),
      ],
      [Boolean(filterable) && !Boolean(customOption), prependFilter({ label: filterComponent })(contextMenuItems)],
      [!Boolean(filterable) && Boolean(customOption), appendCustomOption(contextMenuItems)],
    ] as Array<[boolean, IContextMenuItem[]]>).reduce(
      (acc, [condition, value]) => (condition ? value : acc),
      contextMenuItems,
    )
  }, [options, value, filter, maxOptions, filterable, customOption, onChange])

  return (
    <ContextMenu disabled={disabled} keepOpenOnItemClick={Array.isArray(value)} items={items}>
      {isOpen => (
        <Container id={uniqueId} disabled={Boolean(disabled)} color={color}>
          {label && <LabelText>{label}</LabelText>}
          <Combobox {...rest} naked={Boolean(naked)}>
            <SelectInput
              disabled={disabled}
              placeholder={placeholder}
              readOnly={value !== customInputValue}
              onClick={e => {
                if (value === customInputValue) {
                  e.stopPropagation()
                }
              }}
              value={getDisplayValue(value, customInputValue, customInputSymbol)}
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
