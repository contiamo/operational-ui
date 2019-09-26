import * as React from "react"

import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu"
import LabelText from "../LabelText/LabelText"
import { useUniqueId } from "../useUniqueId"
import { FilterInput, Combobox, Listbox, DropdownButton, SelectInput } from "./Select.styled"
import { SelectProps, IOption } from "./Select.types"
import {
  truncateList,
  appendItem,
  filterList,
  getDisplayValue,
  getNewValue,
  isOptionSelected,
  prependItem,
  optionsToContextMenuItems,
  getOptionFromItem,
} from "./Select.util"

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  maxOptions,
  value,
  naked,
  onChange,
  customInputSettings,
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
  const $container = React.useRef<HTMLDivElement>(null)
  const $input = React.useMemo(() => React.createRef<HTMLInputElement>(), [])

  React.useEffect(() => {
    if (customOption && value === customOption.value && $input.current) {
      $input.current.focus()
    }
  }, [value, customOption])

  const appendCustomOption = React.useCallback(
    (optionToAppend: IOption) => (options: ContextMenuProps["items"]): ContextMenuProps["items"] => {
      // We can't have a multiselect _and_ a custom option.
      if (Array.isArray(value) && process.env.NODE_ENV !== "production") {
        console.trace(
          "⚠️ Cannot show custom option with a multi-select Select component. Please either choose to have a single value, or remove the `customOption` property from your `Select` component.",
        )
        return options
      }

      return appendItem(optionsToContextMenuItems()([optionToAppend])[0])(options)
    },
    [customOption, value],
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
      label: option.label ? option.label : String(option.value),
      isActive: isOptionSelected(value)(option),
    }))(truncatedOptions)

    // Case 1: It's both filterable _and_ has a custom option
    if (filterable && customOption !== undefined) {
      return appendCustomOption(customOption)(
        prependItem({ label: filterComponent, separator: "bottom" })(contextMenuItems),
      )
    }

    // Case 2: It's filterable and no custom option
    if (filterable && customOption === undefined) {
      return prependItem({ label: filterComponent, separator: "bottom" })(contextMenuItems)
    }

    // Case 3, It has a custom option but is not filterable
    if (!filterable && customOption !== undefined) {
      return appendCustomOption(customOption)(contextMenuItems)
    }

    // Default case, it's just a normal set of items
    return contextMenuItems
  }, [options, value, filter, maxOptions, filterable, customOption, onChange])

  const isReadOnly = React.useMemo(() => (customOption ? customOption.value !== value : true), [customOption, value])

  return (
    <ContextMenu
      onClick={item => {
        if (onChange) {
          onChange(getNewValue(value)(item.value), getOptionFromItem(items)(item))
        }
        if ($container.current) {
          $container.current.focus()
        }
        if ($input.current) {
          $input.current.focus()
        }
      }}
      anchored
      disabled={disabled}
      keepOpenOnItemClick={Array.isArray(value)}
      items={items}
      aria-labelledby={`operational-ui__Select-Label-${uniqueId}`}
      initialFocusedItemIndex={options.findIndex(option => option.value === value)}
      {...rest}
    >
      {isOpen => (
        <Listbox
          fullWidth={Boolean(fullWidth)}
          ref={$container}
          aria-labelledby={`operational-ui__Select-Label-${uniqueId}`}
          aria-disabled={Boolean(disabled)}
          disabled={Boolean(disabled)}
          aria-expanded={isOpen}
          id={`operational-ui__Select-${uniqueId}`}
          color={color}
        >
          {label && <LabelText id={`operational-ui__Select-Label-${uniqueId}`}>{label}</LabelText>}
          <Combobox
            isOpen={isOpen}
            hasCustomOption={customOption ? customOption.value === value : false}
            naked={Boolean(naked)}
          >
            <SelectInput
              inputRef={$input}
              fullWidth={fullWidth}
              tabIndex={customOption && customOption.value === value ? 0 : -1}
              disabled={disabled}
              placeholder={placeholder}
              hasCustomOption={customOption ? customOption.value === value : false}
              readOnly={isReadOnly}
              value={getDisplayValue(value)(options)}
              id={`operational-ui__Select-Input-${uniqueId}`}
              onClick={e => {
                if (customOption && value === customOption.value) {
                  e.stopPropagation()
                }
              }}
              onChange={newValue => {
                if (onChange) {
                  onChange(newValue, customOption)
                }
              }}
              onBlur={() => {
                if (!isReadOnly && customInputSettings && customInputSettings.onBlur) {
                  customInputSettings.onBlur(getDisplayValue(value)(options))
                }
              }}
            />
            <DropdownButton
              naked={Boolean(naked)}
              hasCustomOption={customOption ? customOption.value === value : false}
              isOpen={isOpen}
            />
          </Combobox>
        </Listbox>
      )}
    </ContextMenu>
  )
}

export default Select
