import * as React from "react"
import { SectionHeader } from "../Internals/SectionHeader"
import styled from "../utils/styled"
import { ChevronUpIcon, ChevronDownIcon } from "../Icon/Icon"
import { DefaultProps } from "../types"
import isFunction from "lodash/isFunction"
import { headerHeight } from "../utils/constants"

export interface AccordionSectionProps extends DefaultProps {
  title: React.ReactNode
  children: (() => React.ReactNode) | React.ReactNode
  // for internal use
  _index?: number
  _expanded?: boolean
  _toggleSection?: (index: number) => void
  _isMouseRef?: React.MutableRefObject<boolean>
}

const Container = styled.div<{ expanded: boolean }>`
  label: AccordionSectionContainer;
  /* to make sure it respects parrent grid's row height */
  overflow: hidden;
  /* to fix overflow: hidden above, otherwise header can disappear */
  display: grid;
  grid-template-rows: ${headerHeight}px calc(100% - ${headerHeight}px);
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
  paddingRight: 0,
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

const IconWrapper = styled.div`
  width: ${headerHeight}px;
  height: ${headerHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AccordionSection: React.FC<AccordionSectionProps> = ({
  id,
  title,
  children,
  _index,
  _expanded,
  _toggleSection,
  _isMouseRef,
}) => {
  const titleId = `${id}-${_index}-heading`
  const contentId = `${id}-${_index}-panel`
  const [focusFlag, setFocusFlag] = React.useState(false)

  if (_expanded === undefined || _index === undefined || _isMouseRef === undefined || _toggleSection === undefined) {
    throw new Error(
      "Only AccordionSections can be used inside Accordion. See https://operational-ui.netlify.com/#!/Accordion for more info.",
    )
  }

  return (
    <Container expanded={_expanded}>
      <Header
        id={titleId}
        aria-controls={contentId}
        aria-expanded={_expanded}
        tabIndex={0}
        onClick={() => _toggleSection(_index)}
        onKeyPress={() => _toggleSection(_index)}
        expanded={_expanded}
        onFocus={() => {
          if (!_isMouseRef.current) {
            setFocusFlag(true)
          }
        }}
        onBlur={() => setFocusFlag(false)}
      >
        {title}
        <IconWrapper>{_expanded ? <ChevronUpIcon size={12} /> : <ChevronDownIcon size={12} />}</IconWrapper>
      </Header>
      <Panel id={contentId} aria-labelledby={titleId} hidden={!_expanded}>
        {_expanded && isFunction(children) ? children() : children}
      </Panel>
      {focusFlag ? <Focus /> : null}
    </Container>
  )
}

export default AccordionSection
