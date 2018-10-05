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

const initialState = { isContextMenuOpen: false }

class Autocomplete<TValue> extends React.Component<AutocompleteProps<TValue>, Readonly<typeof initialState>> {
  public state = initialState

  private openContextMenu = () => this.setState(() => ({ isContextMenuOpen: true }))
  private closeContextMenu = () => this.setState(() => ({ isContextMenuOpen: false }))

  public render() {
    const {
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
      placeholder,
      clear,
      selectedResult,
    } = this.props

    const { isContextMenuOpen } = this.state

    return (
      <Container
        open={isContextMenuOpen}
        iconLocation="right"
        fullWidth={Boolean(fullWidth)}
        items={makeItems({ results, value, resultIcon, noResultsMessage })}
        onClick={item => onResultClick(item as IContextMenuItem<TValue>)}
      >
        {loading && <Progress bottom />}
        <Input
          onFocus={this.openContextMenu}
          onBlur={this.closeContextMenu}
          hint={hint}
          fullWidth={true}
          value={value}
          onChange={onChange}
          label={label}
          placeholder={placeholder}
          preset={Boolean(selectedResult)}
          clear={clear}
        />
      </Container>
    )
  }
}

export default Autocomplete
