import * as React from "react"
import { Section } from "./Accordion"

export const useAccordionState = (sections: Section[]) => {
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
