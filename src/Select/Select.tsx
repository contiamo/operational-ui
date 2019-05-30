import * as React from "react"
import { DefaultProps } from "../types"

export type Value = number | string

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

export const Select: React.FC<SelectProps> = () => <></>

export default Select
