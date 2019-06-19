import * as React from "react"
import { SectionHeader } from "../Internals/SectionHeader"
import styled from "../utils/styled"
import { ChevronUpIcon, ChevronDownIcon } from "../Icon/Icon"
import { DefaultProps } from "../types"
import isFunction from "lodash/isFunction"

export interface AccordionSectionProps extends DefaultProps {
  title: React.ReactNode
  children: (() => React.ReactNode) | React.ReactNode
  // for internal use
  index?: number
  expanded?: boolean
  toggleSection?: (index: number) => void
  isMouseRef?: React.MutableRefObject<boolean>
}

const Container = styled.div<{ expanded: boolean }>`
  label: AccordionSectionContainer;
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

const Panel = styled.div`
  label: AccordionPanel;
  /* we need it because of overflow: hidden; above */
  overflow: auto;
  height: 100%;
  padding: ${({ theme }) => theme.space.element}px;
  background-color: ${({ theme }) => theme.color.white};
`

Panel.defaultProps = { role: "region" }

const Focus = styled.div`
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

const AccordionSection: React.FC<AccordionSectionProps> = ({
  id,
  index,
  expanded,
  toggleSection,
  title,
  children,
  isMouseRef,
}) => {
  const titleId = `${id}-${index}-heading`
  const contentId = `${id}-${index}-panel`
  const [focusFlag, setFocusFlag] = React.useState(false)

  if (expanded === undefined || index === undefined || isMouseRef === undefined || toggleSection === undefined) {
    throw new Error("Only AccordionSections can be used inside Accordion. See https://operational-ui.netlify.com/#!/Accordion for more info.")
  }

  return (
    <Container expanded={expanded}>
      <Header
        id={titleId}
        aria-controls={contentId}
        aria-expanded={expanded}
        tabIndex={0}
        onClick={() => toggleSection(index)}
        onKeyPress={() => toggleSection(index)}
        expanded={expanded}
        onFocus={() => {
          if (!isMouseRef.current) {
            setFocusFlag(true)
          }
        }}
        onBlur={() => setFocusFlag(false)}
      >
        {title}
        {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Header>
      <Panel id={contentId} aria-labelledby={titleId} hidden={!expanded}>
        {expanded && isFunction(children) ? children() : children}
      </Panel>
      {focusFlag ? <Focus /> : null}
    </Container>
  )
}

export default AccordionSection
