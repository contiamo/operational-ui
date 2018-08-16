import * as React from "react"

import ActionMenu from "../ActionMenu/ActionMenu"
import { ContextMenuProps } from "../ContextMenu/ContextMenu"
import { DefaultProps, DragProps } from "../types"
import styled from "../utils/styled"

export interface CardSectionProps extends DefaultProps, DragProps {
  /** Column title */
  title?: string
  /** Disabled */
  disabled?: boolean
  /** Feedback during drag and drop interaction */
  dragAndDropFeedback?: DragAndDropFeedback
  /** Actions */
  actions?: ContextMenuProps["items"]
  /** Action click handler */
  onActionClick?: ContextMenuProps["onClick"]
}

export type DragAndDropFeedback = "validTarget" | "invalidTarget" | "dropping"

export type OverlayType = "noOverlay" | "disabled" | DragAndDropFeedback

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

const Overlay = styled("div")<{ overlayType: OverlayType }>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  pointer-events: none;
  ${({ theme }) => `
    z-index: ${theme.zIndex.tooltip};
  `};
  ${({ theme, overlayType }) => {
    switch (overlayType) {
      case "noOverlay":
        return `
          background-color: transparent;
        `
      case "disabled":
        return `
          background-color: rgba(0, 0, 0, 0.1);
        `
      case "validTarget":
        return `
          background-color: rgba(239, 223, 50, 0.2);
        `
      case "invalidTarget":
        return `
          background-color: rgba(255, 255, 255, 0.2);
          border: 2px solid ${theme.color.error};
        `
      case "dropping":
        return `
          background-color: rgba(239, 223, 50, 0.4);
        `
    }
  }};
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

const makeOverlayType = (
  disabled?: CardSectionProps["disabled"],
  dragAndDropFeedback?: CardSectionProps["dragAndDropFeedback"],
): OverlayType => {
  if (disabled) {
    return "disabled"
  }
  if (!dragAndDropFeedback) {
    return "noOverlay"
  }
  return dragAndDropFeedback
}

const CardSection: React.SFC<CardSectionProps> = ({
  title,
  children,
  disabled,
  dragAndDropFeedback,
  actions,
  onActionClick,
  ...props
}) => (
  <Container {...props}>
    <Overlay overlayType={makeOverlayType(disabled, dragAndDropFeedback)} />
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
