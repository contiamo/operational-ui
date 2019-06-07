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
  onChange?: (newValue: null | Value | Value[], changedItem?: IOption) => void
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
  /** Shall the component be full width? */
  fullWidth?: boolean
}

export interface SelectPropsWithCustomOption extends BaseSelectProps {
  /** A pseudo-option that allows a user to supply a custom value. */
  customOption?: IOption
  /** Current value */
  value: null | Value
}

export interface SelectPropsWithMultiSelect extends BaseSelectProps {
  /** We cannot have a custom option in a multi-selectable Select component */
  customOption?: never
  /** The value of the pseudo-option that allows a user to supply a custom value. */
  customOptionValue?: never
  /** Current value */
  value: null | Value | Value[]
}

export type SelectProps = SelectPropsWithCustomOption | SelectPropsWithMultiSelect
