import * as React from "react"

import ActionMenu from "../ActionMenu/ActionMenu"
import { ContextMenuProps } from "../ContextMenu/ContextMenu"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface CardSectionProps extends DefaultProps {
  /** Column title */
  title?: string
  /** Disabled */
  disabled?: boolean
  /** Actions */
  actions?: ContextMenuProps["items"]
  /** Action click handler */
  onActionClick?: ContextMenuProps["onClick"]
}

/**
 * The flex rule only kicks in when the parent is flex-positioned in case
 * sections are stacked horizontally.
 */
const Container = styled("div")`
  flex: 1 1;
  display: block;
  position: relative;
  ${({ theme }) => `
    border-right: 1px solid ${theme.color.separators.default};
  `};
`

const DisabledOverlay = styled("div")`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.1);
  ${({ theme }) => `
    z-index: ${theme.zIndex.tooltip};
  `};
`

const Content = styled("div")`
  display: block;
  ${({ theme }) => `
    padding: ${theme.space.element}px;
  `};
`

const Title = styled("div")`
  position: relative;
  display: flex;
  align-items: center;
  height: 36px;
  ${({ theme }) => `
    padding: 0px ${theme.space.element}px;
    font-family: ${theme.font.family.main};
    font-weight: ${theme.font.weight.bold};
    color: ${theme.color.text.dark};
    font-size: ${theme.font.size.body};
    border-bottom: 1px solid ${theme.color.separators.default};
  `};
`

const StyledActionMenu = styled(ActionMenu)`
  position: absolute;
  top: 0px;
  right: 0px;
`

const CardSection: React.SFC<CardSectionProps> = ({ title, children, disabled, actions, onActionClick, ...props }) => (
  <Container {...props}>
    {disabled && <DisabledOverlay />}
    {title && (
      <Title>
        {title}
        {actions && <StyledActionMenu items={actions} onClick={onActionClick} />}
      </Title>
    )}
    <Content>{children}</Content>
  </Container>
)

export default CardSection
