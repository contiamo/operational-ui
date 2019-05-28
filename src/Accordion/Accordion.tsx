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

const Container = styled("div")<{ sections: boolean[] }>`
  label: Accordion;
  height: 100%;
  display: grid;
  grid-template-rows: ${({ theme, sections }) =>
    sections.map(expanded => (expanded ? "1fr" : `${theme.space.element * 2}px`)).join(" ")};
  border: solid 1px ${({ theme }) => theme.color.separators.default};
  border-top: none;
`

const Accordion = ({ children, ...rest }: AccordionProps) => {
  const [expandedSections, setExpandedSections] = React.useState(() =>
    React.Children.map(children, child => Boolean(child.props.expanded)),
  )
  // this ref is used to detect if visitor uses mouse or keyboard
  // and show focuse state in case of keyboard
  const isMousRef = React.useRef(false)

  /**
   * We use `React.cloneElement`, but it is possible to accomplish with `React.Context` as well
   */
  return (
    <Container
      sections={expandedSections}
      onMouseDown={() => {
        isMousRef.current = true
      }}
      onKeyDown={() => {
        isMousRef.current = false
      }}
      data-cy="operational-ui__Accordion"
      {...rest}
    >
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          ...child.props,
          expanded: expandedSections[i],
          toggleExpanded: () => setExpandedSections(updateArray(expandedSections, i, !expandedSections[i])),
          isMousRef,
        }),
      )}
    </Container>
  )
}

export default Accordion
