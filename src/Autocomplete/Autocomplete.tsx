import * as React from "react"

import ContextMenu from "../ContextMenu/ContextMenu"
import { IContextMenuItem, IContextMenuItem as Item } from "../ContextMenu/ContextMenu.Item"
import Input, { InputProps } from "../Input/Input"
import Progress from "../Progress/Progress"
import { DefaultInputProps } from "../types"
import { useUniqueId } from "../useUniqueId"
import styled from "../utils/styled"
import { makeItems } from "./Autocomplete.utils"

export interface AutocompleteProps<TValue> extends DefaultInputProps {
  /** The ID for this element, for accessibility et al */
  id?: string
  /**
   * Label text, rendering the input inside a tag if specified.
   * The `labelId` props is responsible for specifying for and id attributes.
   */
  label?: string
  /**
   * An Icon to append to each result
   */
  resultIcon?: Item["icon"]
  /**
   * A hint to the user.
   */
  hint?: InputProps["hint"]
  /**
   * Should the input fill its container?
   */
  fullWidth?: boolean
  /**
   * A search can show a loading indicator.
   */
  loading?: boolean
  /**
   * Message to display when there are no results.
   */
  noResultsMessage?: string
  /**
   * Called when a result is selected.
   */
  onResultClick: (item: Item<TValue>) => void
  /**
   * Called on search input change.
   */
  onChange: (search: string) => void
  /**
   * Search results
   */
  results?: Array<Item<TValue>>
  /**
   * The value of the Search
   */
  value: string
  /**
   * Clear the field
   */
  clear?: InputProps["clear"]
  /**
   * A placeholder for the input field
   */
  placeholder?: InputProps["placeholder"]
  /**
   * Is a result selected?
   */
  selectedResult?: Item<TValue>
  children?: never
}

const Container = styled(ContextMenu)<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};
  display: inline-block;
  align-items: center;
`

export function Autocomplete<T>({
  id,
  fullWidth,
  tabIndex,
  results,
  resultIcon,
  loading,
  noResultsMessage = "No Results Found",
  onResultClick,
  selectedResult,
  children,
  ...inputProps
}: AutocompleteProps<T>) {
  const uniqueId = useUniqueId(id)

  return (
    <Container
      anchored
      open
      iconLocation="right"
      fullWidth={Boolean(fullWidth)}
      items={makeItems({ results, value: inputProps.value, resultIcon, noResultsMessage })}
      onClick={item => onResultClick(item as IContextMenuItem<T>)}
    >
      {loading && <Progress bottom />}
      <Input id={uniqueId} tabIndex={tabIndex} fullWidth={fullWidth} preset={Boolean(selectedResult)} {...inputProps} />
    </Container>
  )
}

export default Autocomplete
