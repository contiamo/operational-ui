import * as React from "react"
import Icon from "../Icon/Icon"
import { DefaultProps } from "../types"
import { useUniqueId } from "../useUniqueId"
import styled from "../utils/styled"

export interface AccordionSectionProps extends DefaultProps {
  title: React.ReactNode
  children: React.ReactNode
  tabIndex?: number
  expanded?: boolean
  toggleExpanded?: () => void
  isMousRef?: React.MutableRefObject<boolean>
}

const Container = styled("div")<{ expanded: boolean }>`
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

const Header = styled("div")<{ expanded: boolean }>(({ theme, expanded }) => ({
  cursor: "pointer",
  borderTop: `1px solid ${theme.color.separators.default}`,
  borderBottom: `1px solid ${expanded ? theme.color.separators.default : theme.color.background.lighter}`,
  // disable browser focus to customise focus state
  ":focus": {
    outline: "none",
  },

  // this is copy paste from CardHeader Container
  // TODO: fix `height: theme.space.element` * 2 and `padding: 0 ${theme.space.element}px`

  fontFamily: theme.font.family.main,
  fontSize: theme.font.size.body,
  fontWeight: theme.font.weight.medium,
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.color.background.lighter,
  color: theme.color.text.dark,
  flex: "0 0 auto", // Make sure it stays the same size if other parts of the card push it

  // This ensures that the card header text and card controls are placed in opposite corners.
  justifyContent: "space-between",
  height: theme.space.element * 2,
  padding: `0 ${theme.space.element}px`,
  lineHeight: 1,
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
  /* we show it above other elements so that shadow would be visible, but we disable all events for it */
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
  isMousRef,
  className,
}) => {
  const uniqueId = useUniqueId(id)
  const titleId = `accordion-heading-${uniqueId}`
  const contentId = `accordion-panel-${uniqueId}`
  const [hasFocus, setHasFocus] = React.useState(false)

  return (
    <Container expanded={expanded} className={className}>
      <Header
        id={titleId}
        aria-controls={contentId}
        aria-expanded={expanded}
        tabIndex={tabIndex}
        onClick={toggleExpanded}
        onKeyPress={toggleExpanded}
        expanded={expanded}
        onFocus={() => {
          if (isMousRef && !isMousRef.current) {
            setHasFocus(true)
          }
        }}
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
