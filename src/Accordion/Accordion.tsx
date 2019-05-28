import * as React from "react"
import { AccordionSectionElement } from "../AccordionSection/AccordionSection"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface AccordionProps extends DefaultProps {
  children: AccordionSectionElement[]
}

/**
 * update array without mutation
 */
const updateArray: <T>(arr: T[], pos: number, newValue: T) => T[] = (arr, pos, newValue) =>
  Object.assign([], arr, { [pos]: newValue })

export const heightOfAccordionHeader = "36px"

const Container = styled("div")<{ sections: boolean[] }>`
  label: Accordion;
  height: 100%;
  display: grid;
  grid-template-rows: ${({ sections }) =>
    sections.map(expanded => (expanded ? "1fr" : heightOfAccordionHeader)).join(" ")};
  border-left: solid 1px ${({ theme }) => theme.color.separators.default};
  border-right: solid 1px ${({ theme }) => theme.color.separators.default};
`

const Accordion = ({ children }: AccordionProps) => {
  const [expandedSections, setExpandedSections] = React.useState(() =>
    React.Children.map(children, child => Boolean(child.props.expanded)),
  )
  /**
   * We use `React.cloneElement`, but it is possible to accomplish with `React.Context` as well
   */
  return (
    <Container sections={expandedSections}>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          ...child.props,
          expanded: expandedSections[i],
          toggleExpanded: () => setExpandedSections(updateArray(expandedSections, i, !expandedSections[i])),
        }),
      )}
    </Container>
  )
}

export default Accordion
