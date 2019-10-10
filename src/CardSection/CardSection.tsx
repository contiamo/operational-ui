import * as React from "react"

import ActionMenu from "../ActionMenu/ActionMenu"
import { ContextMenuProps } from "../ContextMenu/ContextMenu"
import { ChevronUpIcon, ChevronDownIcon } from "../Icon"
import { DefaultProps, DragProps } from "../types"
import styled from "../utils/styled"
import { headerHeight } from "../utils/constants"

export interface CardSectionProps extends DefaultProps, DragProps {
  /** Column title */
  title?: React.ReactNode
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
const Container = styled("div")<{ disabled?: boolean }>`
  flex: 1 1;
  display: block;
  position: relative;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "inherit")};
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
    padding: ${noHorizontalPadding ? `${theme.space.element}px 0` : theme.space.medium}px;
  `};
`

const Title = styled("div")<{ withToggle: boolean; forceHoverStyles: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${headerHeight}px;
  ${({ theme, withToggle, forceHoverStyles }) => `
    padding: 0px ${theme.space.medium}px;
    font-family: ${theme.font.family.main};
    font-weight: ${theme.font.weight.medium};
    color: ${theme.color.text.lighter};
    font-size: ${theme.font.size.small}px;
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
      background-color: rgba(0, 0, 0, 0.05);
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

  > [role="button"] > div {
    border: 1px solid transparent;
    border-radius: 0;
    background-color: transparent;
    z-index: 0;

    > svg {
      cursor: pointer !important;
    }
  }

  > [role="button"]:hover > div,
  > [role="button"]:focus > div {
    border: 1px solid transparent;
    background-color: rgba(0, 0, 0, 0.05);

    /* Fake bottom-border */
    :after {
      background-color: transparent;
    }
  }
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
  <Container {...props} disabled={disabled}>
    <Overlay overlayType={makeOverlayType(disabled, dragAndDropFeedback)} />
    {(title || actions || onToggle) && (
      <Title
        onMouseEnter={onToggleMouseEnter}
        onMouseLeave={onToggleMouseLeave}
        withToggle={Boolean(onToggle)}
        forceHoverStyles={Boolean(forceToggleHoverStyles)}
        onClick={onToggle}
      >
        {title}
        {onToggle && (collapsed ? <ChevronDownIcon size={14} /> : <ChevronUpIcon size={14} />)}
        {actions && <StyledActionMenu data-cy="card-section__action-menu" items={actions} onClick={onActionClick} />}
      </Title>
    )}
    {!collapsed && <Content noHorizontalPadding={noHorizontalPadding}>{children}</Content>}
  </Container>
)

export default CardSection
