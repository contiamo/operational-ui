import * as React from "react"

import ContextMenu from "../ContextMenu/ContextMenu"
import { IContextMenuItem, IContextMenuItem as Item } from "../ContextMenu/ContextMenu.Item"
import Input, { InputProps } from "../Input/Input"
import Progress from "../Progress/Progress"
import styled from "../utils/styled"

export interface AutocompleteProps<TValue> {
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
  noResultsMessage?: string | Item<TValue>
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
}

const Container = styled(ContextMenu)<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};
  display: flex;
  align-items: center;
`

function makeItems<TValue>({ value, results, resultIcon, noResultsMessage }: Partial<AutocompleteProps<TValue>>) {
  if (!results || !value) {
    return []
  }

  if (results && results.length) {
    return results.map(
      (result: string | IContextMenuItem) =>
        typeof result === "string" ? { label: result, icon: resultIcon } : { ...result, icon: resultIcon },
    )
  }

  return [noResultsMessage || ""]
}

function Autocomplete<TValue>({
  fullWidth,
  label,
  results,
  resultIcon,
  loading,
  noResultsMessage,
  onChange,
  value,
  onResultClick,
  hint,
}: AutocompleteProps<TValue>) {
  return (
    <Container
      iconLocation="right"
      fullWidth={Boolean(fullWidth)}
      items={makeItems({ results, value, resultIcon, noResultsMessage })}
      onClick={item => onResultClick(item as IContextMenuItem<TValue>)}
    >
      {loading && <Progress bottom />}
      <Input hint={hint} fullWidth={true} value={value} onChange={onChange} label={label} />
    </Container>
  )
}

export default Autocomplete
