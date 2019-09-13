import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"
import AccordionSection, { AccordionSectionProps } from "../AccordionSection/AccordionSection"
import { useUniqueId } from "../useUniqueId"
import { headerHeight } from "../utils/constants"

type AccordionSectionElement = React.ReactElement<AccordionSectionProps, typeof AccordionSection>

export interface AccordionProps extends DefaultProps {
  children: AccordionSectionElement | AccordionSectionElement[]
  onToggle?: (sectionIndex: number) => void
  expanded?: boolean[]
}

const Container = styled("div")<{ sections: boolean[] }>`
  label: Accordion;
  height: 100%;
  display: grid;
  grid-template-rows: ${({ sections }) => sections.map(expanded => (expanded ? "1fr" : `${headerHeight}px`)).join(" ")};
  border-top: none;
`

const Accordion = ({ onToggle, expanded, children, id, ...rest }: AccordionProps) => {
  const uid = useUniqueId(id)

  // this ref is used to detect if visitor uses mouse or keyboard
  // to show focus state in case of keyboard
  const isMouseRef = React.useRef(false)

  const [sections, setSections] = React.useState<boolean[]>(expanded || [])

  const toggleSection = (index: number) => {
    if (onToggle && expanded) {
      onToggle(index)
    } else {
      const newSections = [...sections]
      newSections[index] = !newSections[index]
      setSections(newSections)
    }
    isMouseRef.current = false
  }

  // number of items in state and number of childre can be different
  const sectionsMapped = React.Children.map(children, (_, index) =>
    Boolean(onToggle && expanded ? expanded[index] : sections[index]),
  )

  return (
    <Container
      sections={sectionsMapped}
      onMouseDown={() => {
        isMouseRef.current = true
      }}
      onKeyDown={() => {
        isMouseRef.current = false
      }}
      data-cy="operational-ui__Accordion"
      id={uid}
      {...rest}
    >
      {React.Children.map(children, (element, index) =>
        React.cloneElement(element, {
          ...element.props,
          id: uid,
          _expanded: sectionsMapped[index],
          _toggleSection: toggleSection,
          _index: index,
        }),
      )}
    </Container>
  )
}

export default Accordion
