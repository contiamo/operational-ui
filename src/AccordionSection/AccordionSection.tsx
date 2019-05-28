import * as React from "react"
import Icon from "../Icon/Icon"
import { DefaultProps } from "../types"
import { useUniqueId } from "../useUniqueId"
import styled from "../utils/styled"

export interface AccordionSectionProps extends DefaultProps {
  title: React.ReactNode
  children: React.ReactNode
  id?: string
  tabIndex?: number
  expanded?: boolean
  toggleExpanded?: () => void
}

const Container = styled("div")<{ expanded: boolean }>`
  label: AccordionSection;
  overflow: hidden;
  display: grid;
  grid-template-rows: ${({ theme }) => `${theme.space.element * 2}px calc(100% - ${theme.space.element * 2}px)`};
  position: relative;
`

const Header = styled("div")<{ expanded: boolean }>(({ theme, expanded }) => ({
  cursor: "pointer",
  fontFamily: theme.font.family.main,
  fontSize: theme.font.size.body,
  fontWeight: theme.font.weight.medium,
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.color.background.lighter,
  color: theme.color.text.dark,
  flex: "0 0 auto", // Make sure it stays the same size if other parts of the card push it
  borderTop: `1px solid ${theme.color.separators.default}`,
  borderBottom: expanded
    ? `1px solid ${theme.color.separators.default}`
    : `1px solid ${theme.color.background.lighter}`,

  // This ensures that the card header text and card controls are placed in opposite corners.
  justifyContent: "space-between",
  height: theme.space.element * 2,
  padding: `0 ${theme.space.element}px`,
  lineHeight: 1,
  ":focus": {
    outline: "none",
  },
}))

Header.defaultProps = { role: "button", "aria-disabled": false }

const Panel = styled("div")`
  label: AccordionPanel;
  overflow: auto;
  height: 100%;
  padding: ${({ theme }) => theme.space.element}px;
  background-color: ${({ theme }) => theme.color.white};
`

Panel.defaultProps = { role: "region" }

const Chevron = styled(Icon)`
  align-content: flex-end;
`

const Focus = styled("div")`
  label: AccordionFocus;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  ${({ theme }) => `box-shadow: ${theme.shadows.insetFocus};`}
`

Chevron.defaultProps = { size: 14 }

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  children,
  id,
  tabIndex = 0,
  expanded = false,
  toggleExpanded,
}) => {
  const uniqueId = useUniqueId(id)
  const titleId = `accordion-heading-${uniqueId}`
  const contentId = `accordion-panel-${uniqueId}`
  const [hasFocus, setHasFocus] = React.useState(false)

  return (
    <Container expanded={expanded}>
      <Header
        id={titleId}
        aria-controls={contentId}
        aria-expanded={expanded}
        tabIndex={tabIndex}
        onClick={toggleExpanded}
        onKeyPress={toggleExpanded}
        expanded={expanded}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      >
        {title}
        <Chevron name={expanded ? "ChevronUp" : "ChevronDown"} />
      </Header>
      <Panel id={contentId} aria-labelledby={titleId} hidden={!expanded}>
        {children}
      </Panel>
      {hasFocus ? <Focus /> : null}
    </Container>
  )
}

export type AccordionSectionElement = React.ReactElement<AccordionSectionProps, typeof AccordionSection>

export default AccordionSection
