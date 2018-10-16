import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import { AutocompleteProps } from "./Autocomplete"

export function makeItems<TValue>({
  value,
  results,
  resultIcon,
  noResultsMessage,
}: Partial<AutocompleteProps<TValue>>): Array<IContextMenuItem<TValue>> {
  if (!results || !value) {
    return []
  }

  if (results && results.length) {
    return results.map(result => ({
      ...result,
      ...(resultIcon ? { icon: result.icon || resultIcon } : { icon: result.icon }),
    }))
  }

  return [{ label: noResultsMessage! } || { label: "" }]
}
