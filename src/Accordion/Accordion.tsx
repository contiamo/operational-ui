import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export type AccordionProps = DefaultProps

export const heightOfAccordionHeader = "36px"

const Container = styled("div")<{ sections: boolean[] }>`
  label: Accordion;
  height: 100%;
  display: grid;
  grid-auto-rows: ${({ sections }) => sections.map(expanded => (expanded ? "1fr" : heightOfAccordionHeader)).join(" ")};
  /* need to fix those */
  border-left: solid 1px #bfcbd2;
  border-right: solid 1px #bfcbd2;
`

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  const [expanded, setExpanded] = React.useState(() =>
    React.Children.map(children, child => Boolean((child as any).props.expanded)),
  )

  return (
    <Container sections={expanded}>
      {React.Children.map(children, (child: any, i) =>
        React.cloneElement(child, {
          ...child.props,
          expanded: expanded[i],
          toggleExpanded: () => setExpanded(Object.assign([], expanded, { [i]: !expanded[i] })),
        }),
      )}
    </Container>
  )
}

export default Accordion
