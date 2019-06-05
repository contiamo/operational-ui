import * as React from "react"

import ContextMenu from "../ContextMenu/ContextMenu"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import LabelText from "../LabelText/LabelText"
import { useUniqueId } from "../useUniqueId"
import { FilterInput, Combobox, Listbox, DropdownButton, SelectInput } from "./Select.styled"
import { SelectProps } from "./Select.types"
import {
  truncateList,
  appendItem,
  customInputSymbol,
  filterList,
  getDisplayValue,
  getNewValue,
  isOptionSelected,
  prependItem,
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
  fullWidth,
  tabIndex = 0,
  ...rest
}) => {
  const uniqueId = useUniqueId(id)
  const [filter, setFilter] = React.useState("")
  const [customInputValue, setCustomInputValue] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useMemo(() => React.createRef<HTMLInputElement>(), [])

  React.useEffect(() => {
    if (value === customInputValue && inputRef.current) {
      inputRef.current.focus()
    }
  }, [value, customInputValue])

  const appendCustomOption = React.useCallback(
    (options: IContextMenuItem[]): IContextMenuItem[] => {
      // We can't have a multiselect _and_ a custom option.
      if (Array.isArray(value) && process.env.NODE_ENV !== "production") {
        console.trace(
          "⚠️ Cannot show custom option with a multi-select Select component. Please either choose to have a single value, or remove the `customOption` property from your `Select` component.",
        )
        return options
      }

      return appendItem({
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
        autoFocus
        onClick={e => e.stopPropagation()}
        fullWidth
        placeholder="Filter..."
        value={filter}
        onChange={setFilter}
      />
    ),
    [filter],
  )

  /** Get a list of items to feed to the ContextMenu */
  const items = React.useMemo(() => {
    const initialOptions = options
    const filteredOptions = filterList(filter)(initialOptions)
    const truncatedOptions = truncateList(maxOptions)(filteredOptions)
    const contextMenuItems = optionsToContextMenuItems(option => ({
      label: option.label ? option.label : "",
      isActive: isOptionSelected(value)(option),
    }))(truncatedOptions)

    // Case 1: It's both filterable _and_ has a custom option
    if (Boolean(filterable) && Boolean(customOption)) {
      return appendCustomOption(prependItem({ label: filterComponent })(contextMenuItems))
    }

    // Case 2: It's filterable and no custom option
    if (Boolean(filterable) && !Boolean(customOption)) {
      return prependItem({ label: filterComponent })(contextMenuItems)
    }

    // Case 3, It has a custom option but is not filterable
    if (!Boolean(filterable) && Boolean(customOption)) {
      return appendCustomOption(contextMenuItems)
    }

    // Default case, it's just a normal set of items
    return contextMenuItems
  }, [options, value, filter, maxOptions, filterable, customOption, onChange])

  return (
    <ContextMenu
      onClick={item => {
        console.log(value, item.value, customInputValue)
        if (onChange) {
          onChange(getNewValue(value)(item.value), item.value)
        }
        if (containerRef.current && item.value !== customInputSymbol) {
          containerRef.current.focus()
        }
        if (item.value === customInputSymbol && inputRef.current) {
          inputRef.current.focus()
        }
      }}
      disabled={disabled}
      keepOpenOnItemClick={Array.isArray(value)}
      items={items}
      tabIndex={tabIndex}
      aria-labelledby={`operational-ui__Select-Label-${uniqueId}`}
      {...rest}
    >
      {isOpen => (
        <Listbox
          fullWidth={Boolean(fullWidth)}
          ref={containerRef}
          aria-labelledby={`operational-ui__Select-Label-${uniqueId}`}
          aria-disabled={Boolean(disabled)}
          disabled={Boolean(disabled)}
          aria-expanded={isOpen}
          id={`operational-ui__Select-${uniqueId}`}
          color={color}
        >
          {label && <LabelText id={`operational-ui__Select-Label-${uniqueId}`}>{label}</LabelText>}
          <Combobox naked={Boolean(naked)}>
            <SelectInput
              inputRef={inputRef}
              fullWidth={fullWidth}
              disabled={disabled}
              placeholder={placeholder}
              readOnly={getDisplayValue(value, customInputValue, customInputSymbol) !== customInputValue}
              value={getDisplayValue(value, customInputValue, customInputSymbol)}
              id={`operational-ui__Select-Input-${uniqueId}`}
              onClick={e => {
                if (value === customInputValue) {
                  e.stopPropagation()
                }
              }}
              onChange={newValue => {
                setCustomInputValue(newValue)
                if (onChange) {
                  onChange(newValue)
                }
              }}
            />
            <DropdownButton isOpen={isOpen} />
          </Combobox>
        </Listbox>
      )}
    </ContextMenu>
  )
}

export default Select
