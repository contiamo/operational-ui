import { DefaultProps } from "../types"

export type Value = number | symbol | string

export interface IOption {
  label?: string
  value: Value
}

export interface BaseSelectProps extends DefaultProps {
  /** Options available */
  options: IOption[]
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
  /** We never have children */
  children?: never
}

export interface SelectPropsWithCustomOption extends BaseSelectProps {
  /** A pseudo-option that allows a user to supply a custom value. */
  customOption?: string
  /** Current value */
  value: null | Value
}

export interface SelectPropsWithMultiSelect extends BaseSelectProps {
  /** Custom Option */
  customOption?: never
  /** Current value */
  value: null | Value | Value[]
}

export type SelectProps = SelectPropsWithCustomOption | SelectPropsWithMultiSelect
