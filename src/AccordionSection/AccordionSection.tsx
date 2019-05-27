import * as React from "react"
import { heightOfAccordionHeader } from "../Accordion/Accordion"
import Icon from "../Icon/Icon"
import { DefaultProps } from "../types"
import { useUniqueId } from "../useUniqueId"
import styled from "../utils/styled"

export interface AccordionSectionProps extends DefaultProps {
  title: React.ReactNode
  children: React.ReactNode
  id?: string
  tabindex?: number
  expanded?: boolean
  toggleExpanded?: () => void
}

const Container = styled("div")<{ expanded: boolean }>`
  label: AccordionSection;
  overflow: hidden;
`

const Header = styled("div", { shouldForwardProp: () => true })<{ tabindex: number }>`
  label: AccordionHeader;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  ${({ theme }) => `
    font-family: ${theme.font.family.main};
    font-weight: ${theme.font.weight.bold};
    color: ${theme.color.text.dark};
    font-size: ${theme.font.size.small}px;
    border-bottom: 1px solid ${theme.color.separators.default};
  `}
  :focus {
    outline: none;
    /* need to fix those */
    border: 2px solid #bfcbd2;
    border-top: 3px solid #bfcbd2;
    border-bottom: 3px solid #bfcbd2;
    padding: 8px 18px;
  }
  height: ${heightOfAccordionHeader};
  padding: 10px 20px;
  line-height: 15px;
  /* need to fix those */
  border-bottom: solid 1px #bfcbd2;
  border-top: solid 1px #bfcbd2;
  background: #f2f4f6;
`

Header.defaultProps = { role: "button", "aria-disabled": false }

const Panel = styled("div")`
  label: AccordionPanel;
  overflow: auto;
  height: 100%;
  padding: 10px 20px;
`

Panel.defaultProps = { role: "region" }

const Chevron = styled(Icon)`
  align-content: flex-end;
`

Chevron.defaultProps = { size: 14 }

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  children,
  id,
  tabindex = 0,
  expanded = false,
  toggleExpanded,
}) => {
  const uniqueId = useUniqueId(id)
  const titleId = `accordion-heading-${uniqueId}`
  const contentId = `accordion-panel-${uniqueId}`

  return (
    <Container expanded={expanded}>
      <Header
        id={titleId}
        aria-controls={contentId}
        aria-expanded={expanded}
        tabindex={tabindex}
        onClick={toggleExpanded}
        onKeyPress={toggleExpanded}
      >
        {title}
        <Chevron name={expanded ? "ChevronUp" : "ChevronDown"} />
      </Header>
      <Panel id={contentId} aria-labelledby={titleId} hidden={!expanded}>
        {children}
      </Panel>
    </Container>
  )
}

export type AccordionSectionElement = React.ReactElement<AccordionSectionProps, typeof AccordionSection>

export default AccordionSection
