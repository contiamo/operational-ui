import * as React from "react"
import { Section } from "./Accordion"

/**
 * `initialSections` is intial state, the same way as argument in `useState`
 *
 * @param initialSections Section[]
 */
export const useAccordionState = (initialSections: Section[]): [Section[], (index: number) => void] => {
  const [stateSections, updateSections] = React.useState(initialSections)

  const onToggle = React.useCallback(
    index => {
      if (index < 0 || index >= stateSections.length) {
        throw new Error(`index out of bounds: ${index}`)
      }
      const newSections = [...stateSections]
      newSections[index] = {
        ...newSections[index],
        expanded: !newSections[index].expanded,
      }
      updateSections(newSections)
    },
    [stateSections],
  )

  return [stateSections, onToggle]
}
