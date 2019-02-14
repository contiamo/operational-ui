import nanoid from "nanoid"
import * as React from "react"

import ContextMenu from "../ContextMenu/ContextMenu"
import { IContextMenuItem, IContextMenuItem as Item } from "../ContextMenu/ContextMenu.Item"
import Input, { InputProps } from "../Input/Input"
import Progress from "../Progress/Progress"
import styled from "../utils/styled"
import { makeItems } from "./Autocomplete.utils"

export interface AutocompleteProps<TValue> {
  /** The ID for this element, for accessibility et al */
  id?: string
  /** Helps with ordering keyboard navigation */
  tabIndex?: number | string
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
  z-index: ${({ theme }) => theme.zIndex.selectOptions - 1}; /* always be under a select's options */
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
  const [isContextMenuOpen, setIsContextMenuOpen] = React.useState(false)
  const autocompleteId = React.useRef(id || nanoid())

  return (
    <Container
      open={isContextMenuOpen}
      iconLocation="right"
      fullWidth={Boolean(fullWidth)}
      items={makeItems({ results, value: inputProps.value, resultIcon, noResultsMessage })}
      onClick={item => onResultClick(item as IContextMenuItem<T>)}
    >
      {loading && <Progress bottom />}
      <Input
        id={autocompleteId.current}
        tabIndex={tabIndex}
        onFocus={() => setIsContextMenuOpen(true)}
        onBlur={() => setIsContextMenuOpen(false)}
        fullWidth={true}
        preset={Boolean(selectedResult)}
        {...inputProps}
      />
    </Container>
  )
}

export default Autocomplete
