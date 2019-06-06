import { IOption, SelectProps, Value } from "./Select.types"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"

export const appendItem = (newItem: IContextMenuItem) => (existingItems: IContextMenuItem[]): IContextMenuItem[] => [
  ...existingItems,
  newItem,
]

export const truncateList = (maxLength?: number) => (options: SelectProps["options"]) =>
  maxLength ? options.slice(0, maxLength) : options

export const filterList = (filter: string) => (options: SelectProps["options"]) =>
  options.filter(option => String(option.label).match(new RegExp(filter, "ig")))

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

export const customInputSymbol = Symbol("custom input")

export const getDisplayValue = (
  internalValue: Value | Value[] | null,
  customInputValue?: Value,
  customInputSymbol?: symbol,
) => (options: IOption[]): string => {
  // Symbol in initial case, value after it has changed
  if (internalValue === customInputSymbol || internalValue === customInputValue) {
    return String(customInputValue)
  }

  if (Array.isArray(internalValue)) {
    return options
      .filter(option => internalValue.includes(option.value))
      .map(option => option.label)
      .join(", ")
  }

  if (internalValue === null) {
    return ""
  }

  return options
    .filter(option => option.value === internalValue)
    .map(option => option.label)
    .join("")
}

export const optionsToContextMenuItems = (overrides?: (option: IOption) => Partial<IContextMenuItem>) => (
  options: IOption[],
) =>
  options.map(
    (option): IContextMenuItem => ({
      ...option,
      label: option.label || "", // It's optional in one but required in the other
      ...(overrides ? overrides(option) : {}),
    }),
  )
