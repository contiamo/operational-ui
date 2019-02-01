import * as React from "react"

import ActionMenu from "../ActionMenu/ActionMenu"
import { ContextMenuProps } from "../ContextMenu/ContextMenu"
import Icon from "../Icon/Icon"
import { DefaultProps, DragProps } from "../types"
import styled from "../utils/styled"

export interface CardSectionProps extends DefaultProps, DragProps {
  /** Column title */
  title?: string
  /** Disabled */
  disabled?: boolean
  /** Feedback during drag and drop interaction */
  dragAndDropFeedback?: DragAndDropFeedback
  /**
   * Disable horizontal padding. Useful for usage with e.g. the `Tree` component, which
   * has visually weak and often hidden toggle button on the left, and would produce
   * disproportionate horizontal space in small sections.
   */
  noHorizontalPadding?: boolean
  /** Actions */
  actions?: ContextMenuProps["items"]
  /** Action click handler */
  onActionClick?: ContextMenuProps["onClick"]
  /** Is this collapsed? */
  collapsed?: boolean
  /** Toggle collapsed state */
  onToggle?: () => void
  /** Fires when the toggle area is hovered */
  onToggleMouseEnter?: () => void
  /** Fires when the mouse leaves the hover area */
  onToggleMouseLeave?: () => void
  /** Force the toggle area to have hover styles whether they are hovered or not */
  forceToggleHoverStyles?: boolean
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

const Content = styled("div")<{ noHorizontalPadding?: boolean }>`
  display: block;
  ${({ theme, noHorizontalPadding }) => `
    padding: ${noHorizontalPadding ? `${theme.space.element}px 0` : theme.space.small}px;
  `};
`

const Title = styled("div")<{ withToggle: boolean; forceHoverStyles: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  ${({ theme, withToggle, forceHoverStyles }) => `
    padding: 0px ${theme.space.small}px;
    font-family: ${theme.font.family.main};
    font-weight: ${theme.font.weight.medium};
    color: ${theme.color.text.lighter};
    font-size: 13px;
    border-bottom: 1px solid ${theme.color.separators.default};
    ${
      withToggle
        ? `
    cursor: pointer;
    background-color: ${forceHoverStyles ? theme.color.background.lightest : "transparent"};
    svg {
      cursor: pointer;
      color: ${forceHoverStyles ? theme.color.separators.dark : theme.color.separators.default};
    }
    :hover {
      background-color: ${theme.color.background.lightest};
    }
    :hover svg {
      color: ${theme.color.separators.dark};
    }
    `
        : ""
    }
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
  noHorizontalPadding,
  onActionClick,
  collapsed,
  onToggle,
  onToggleMouseEnter,
  onToggleMouseLeave,
  forceToggleHoverStyles,
  ...props
}) => (
  <Container {...props}>
    <Overlay overlayType={makeOverlayType(disabled, dragAndDropFeedback)} />
    {title && (
      <Title
        onMouseEnter={onToggleMouseEnter}
        onMouseLeave={onToggleMouseLeave}
        withToggle={Boolean(onToggle)}
        forceHoverStyles={Boolean(forceToggleHoverStyles)}
        onClick={onToggle}
      >
        {title}
        {onToggle && <Icon size={14} name={collapsed ? "ChevronDown" : "ChevronUp"} />}
        {actions && <StyledActionMenu items={actions} onClick={onActionClick} />}
      </Title>
    )}
    {!collapsed && <Content noHorizontalPadding={noHorizontalPadding}>{children}</Content>}
  </Container>
)

export default CardSection
