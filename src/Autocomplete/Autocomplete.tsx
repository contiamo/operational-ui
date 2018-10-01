import * as React from "react"

import ContextMenu, { Item } from "../ContextMenu/ContextMenu"
import Input from "../Input/Input"
import Spinner from "../Spinner/Spinner"
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
   * Should the input fill its container?
   */
  fullWidth?: boolean
  /**
   * The current value of the input field.
   * You must always supply this from the parent component, as per https://facebook.github.io/react/docs/forms.html#controlled-components.
   */
  value: { label: string; value?: TValue }
  /**
   * A search can show a loading indicator.
   */
  loading?: boolean
  /**
   * Message to display when there are no results.
   */
  noResultsMessage?: string | Item
  /**
   * Called when a result is selected.
   */
  onResultClick: (item?: string | Item) => void
  /**
   * Called on search input change.
   */
  onChange: (search: string) => void
  /**
   * Search results
   */
  results?: Array<{ label: string; value: TValue }>
  /**
   * Minimum characters to query for results.
   */
  minCharacters?: number
}

const initialState = {
  /**
   * `true` if the dropdown result is open
   */
  isOpen: false,
  searchValue: "",
}

type AutocompleteState = Readonly<typeof initialState>

const Container = styled(ContextMenu)<Partial<AutocompleteProps<any>>>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};
  display: flex;
  align-items: center;
`

function makeItems<TValue>({
  searchValue,
  minCharacters,
  results,
  resultIcon,
  noResultsMessage,
}: Partial<AutocompleteProps<TValue> & AutocompleteState>) {
  if (!searchValue || !(searchValue.length > (minCharacters || 0))) {
    return []
  }

  if (results && results.length) {
    return results.map(
      result => (typeof result === "string" ? { label: result, icon: resultIcon } : { ...result, icon: resultIcon }),
    )
  }

  if (!results || !results.length) {
    return [noResultsMessage || ""]
  }

  return []
}

class Autocomplete<TValue> extends React.Component<AutocompleteProps<TValue>, AutocompleteState> {
  public readonly state = initialState

  public static defaultProps = {
    minCharacters: 3,
  }

  public static getDerivedStateFromProps(props: AutocompleteProps<any>) {
    return { searchValue: props.value }
  }

  public render() {
    const {
      fullWidth,
      label,
      results,
      resultIcon,
      minCharacters,
      loading,
      noResultsMessage,
      onChange,
      onResultClick,
    } = this.props
    const { searchValue } = this.state
    return (
      <Container
        fullWidth={fullWidth}
        items={makeItems({ results, searchValue, resultIcon, minCharacters, noResultsMessage })}
        onClick={item => (item && typeof item === "string" ? onResultClick(item) : onResultClick((item as Item).label))}
      >
        <Input
          icon={loading ? <Spinner /> : "Search"}
          fullWidth={true}
          value={searchValue}
          onChange={onChange}
          label={label}
        />
      </Container>
    )
  }
}

export default Autocomplete
