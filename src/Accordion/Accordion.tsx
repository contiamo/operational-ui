import * as React from "react"
import { SectionHeader } from "../Internals/SectionHeader"
import { DefaultProps } from "../types"
import styled from "../utils/styled"
import { IconChevronUp, IconChevronDown } from "../Icon/Icon"

export interface Section {
  title: React.ReactNode
  content: () => React.ReactNode
  expanded: boolean
  key: string | number
}

export interface AccordionProps extends DefaultProps {
  children?: never
  onToggle: (sectionIndex: number) => void
  sections: Section[]
}

const Container = styled("div")<{ sections: Section[] }>`
  label: Accordion;
  height: 100%;
  display: grid;
  grid-template-rows: ${({ theme, sections }) =>
    sections.map(({ expanded }) => (expanded ? "1fr" : `${theme.space.element * 2}px`)).join(" ")};
  border: solid 1px ${({ theme }) => theme.color.separators.default};
  border-top: none;
`

const AccordionSection = styled("div")<{ expanded: boolean }>`
  label: AccordionSection;
  /* to make sure it respects parrent grid's row height */
  overflow: hidden;
  /* to fix overflow: hidden above, otherwise header can disappear */
  display: grid;
  grid-template-rows: ${({ theme }) => {
    const headerHeight = theme.space.element * 2
    return `${headerHeight}px calc(100% - ${headerHeight}px)`
  }};
  /* for Focus */
  position: relative;
`

const Header = styled(SectionHeader)<{ expanded: boolean }>(({ theme, expanded }) => ({
  cursor: "pointer",
  borderTop: `1px solid ${theme.color.separators.default}`,
  borderBottom: `1px solid ${expanded ? theme.color.separators.default : theme.color.background.lighter}`,
  // disable browser focus to customise focus state
  ":focus": {
    outline: "none",
  },
}))

Header.defaultProps = { role: "button", "aria-disabled": false }

const Panel = styled("div")`
  label: AccordionPanel;
  /* we need it because of overflow: hidden; above */
  overflow: auto;
  height: 100%;
  padding: ${({ theme }) => theme.space.element}px;
  background-color: ${({ theme }) => theme.color.white};
`

Panel.defaultProps = { role: "region" }

const Focus = styled("div")`
  label: AccordionFocus;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* we show it above other elements so that shadow would be visible, but we disable all events for it */
  pointer-events: none;
  ${({ theme }) => `box-shadow: ${theme.shadows.insetFocus};`}
`

const Accordion = ({ sections, onToggle, ...rest }: AccordionProps) => {
  // this ref is used to detect if visitor uses mouse or keyboard
  // and show focuse state in case of keyboard
  const isMouseRef = React.useRef(false)
  const [focusIndex, setFocusIndex] = React.useState<number | null>(null)

  return (
    <Container
      sections={sections}
      onMouseDown={() => {
        isMouseRef.current = true
      }}
      onKeyDown={() => {
        isMouseRef.current = false
      }}
      data-cy="operational-ui__Accordion"
      {...rest}
    >
      {sections.map(({ title, content, expanded, key }, i) => {
        const titleId = `accordion-heading-${key}`
        const contentId = `accordion-panel-${key}`
        const toggle = () => {
          isMouseRef.current = false
          onToggle(i)
        }

        return (
          <AccordionSection expanded={expanded} key={key}>
            <Header
              id={titleId}
              aria-controls={contentId}
              aria-expanded={expanded}
              tabIndex={0}
              onClick={toggle}
              onKeyPress={toggle}
              expanded={expanded}
              onFocus={() => {
                if (!isMouseRef.current) {
                  setFocusIndex(i)
                }
              }}
              onBlur={() => setFocusIndex(null)}
            >
              {title}
              {expanded ? <IconChevronUp /> : <IconChevronDown />}
            </Header>
            <Panel id={contentId} aria-labelledby={titleId} hidden={!expanded}>
              {expanded && content()}
            </Panel>
            {focusIndex === i ? <Focus /> : null}
          </AccordionSection>
        )
      })}
    </Container>
  )
}

export default Accordion
