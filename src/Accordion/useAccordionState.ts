import * as React from "react"
import { Section } from "./Accordion"

/**
 * `sections` is intial state, the same way as argument in `useState`
 *
 * @param sections Section[]
 */
export const useAccordionState = (sections: Section[]): [Section[], (index: number) => void] => {
  const [stateSections, updateSections] = React.useState(sections)

  const onToggle = React.useCallback(
    index => {
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
