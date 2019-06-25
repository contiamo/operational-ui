import { IOption, SelectProps, Value } from "./Select.types"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"

export const appendItem = (newItem: IContextMenuItem) => (existingItems: IContextMenuItem[]): IContextMenuItem[] => [
  ...existingItems,
  newItem,
]

export const truncateList = (maxLength?: number) => (options: SelectProps["options"]) =>
  maxLength ? options.slice(0, maxLength) : options

export const filterList = (filter: string) => {
  const searchRegExp = new RegExp(filter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig")
  return (options: SelectProps["options"]) => options.filter(option => String(option.label).match(searchRegExp))
}

export const prependItem = (filterItem: IContextMenuItem) => (items: IContextMenuItem[]): IContextMenuItem[] => [
  filterItem,
  ...items,
]

export const isOptionSelected = (value: Value | Value[] | null) => (option: IOption) => {
  if (!Array.isArray(value)) {
    return value === option.value
  }

  return value.includes(option.value)
}

export const getNewValue = (value: Value | Value[] | null) => (newValue: Value) => {
  if (Array.isArray(value)) {
    const newValueIndex = value.indexOf(newValue)
    if (newValueIndex === -1) {
      return [...value, newValue]
    } else {
      return [...value.slice(0, newValueIndex), ...value.slice(newValueIndex + 1)]
    }
  }
  return newValue
}

export const getDisplayValue = (internalValue: Value | Value[] | null) => (options: IOption[]): string => {
  if (Array.isArray(internalValue)) {
    return options
      .filter(option => internalValue.includes(option.value))
      .map(option => option.label)
      .join(", ")
  }

  const valueExistsInOptions = options.find(option => option.value === internalValue)
  if (valueExistsInOptions) {
    return valueExistsInOptions.label || String(valueExistsInOptions.value)
  }

  if (internalValue === null) {
    return ""
  }

  return String(internalValue)
}

export const optionsToContextMenuItems = (overrides?: (option: IOption) => Partial<IContextMenuItem>) => (
  options: IOption[],
) =>
  options.map(
    (option): IContextMenuItem => ({
      ...option,
      label: option.label || String(option.value), // fall back to the value if no label
      ...(overrides ? overrides(option) : {}),
    }),
  )

export const getOptionFromItem = (haystack: IContextMenuItem[]) => (needle: IContextMenuItem): IOption | undefined => {
  const result = haystack.find(item => needle.label === item.label)

  if (result) {
    return { label: result.label || result.value, value: result.value }
  }

  return undefined
}
