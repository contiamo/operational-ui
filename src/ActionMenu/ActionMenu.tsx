import * as React from "react"
import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu"
import { DefaultProps } from "../types"
import { inputFocus } from "../utils"
import styled from "../utils/styled"
import { ChevronUpIcon, HamburgerMenuIcon, DotMenuIcon } from "../Icon/Icon"

export interface ActionMenuProps extends DefaultProps {
  /** Action when item in dropdown is selected - if specified here, it is applied to all dropdown items */
  onClick?: ContextMenuProps["onClick"]
  /** Title */
  title?: string
  /** Actions to display in dropdown */
  items: ContextMenuProps["items"]
  /** Should the title always be visible? */
  stickyTitle?: boolean
}

const StyledContextMenu = styled(ContextMenu)<{ title?: string }>(({ theme, title }) => ({
  ...(title
    ? {
        " > div": {
          borderRadius: theme.borderRadius,
          boxShadow: `0 0 0 1px ${theme.color.separators.light}`,
          padding: 0,
        },
      }
    : {}),
  ":focus > div ": {
    ...inputFocus({ theme }),
  },
}))

const Container = styled("div")(({ theme, title }) => ({
  height: 36,
  width: 36,
  /**
   * `textAlign` is set explicitly for when a parent sets a text-align to right-position this container,
   * leaving its content left-aligned.
   */
  textAlign: "right",
  padding: `0 ${theme.space.content}px`,
  backgroundColor: title ? theme.color.white : "none",
  fontWeight: theme.font.weight.medium,
  borderRadius: theme.borderRadius,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  userSelect: "none",
  cursor: "pointer",
  ":hover": {
    ...(title ? {} : { backgroundColor: theme.color.white, boxShadow: `0 0 0 1px ${theme.color.separators.light}` }),
    "> svg": {
      fill: theme.color.primary,
      cursor: "pointer",
    },
  },
  ":focus": {
    ...inputFocus({ theme }),
  },
  "> svg": {
    cursor: "pointer",
  },
}))

const TitleContainer = styled("p")(({ theme }) => ({
  minWidth: 90,
  width: "100%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  justifySelf: "flex-start",
  color: theme.color.primary,
  textAlign: "left",
}))

const ActionMenu: React.SFC<ActionMenuProps> = ({ stickyTitle, items, title, ...props }) => (
  <StyledContextMenu align="right" {...props} items={items} condensed title={title}>
    {isOpen => {
      const iconColor = isOpen || stickyTitle ? "primary" : "color.text.lighter"

      if (title) {
        return (
          <Container title={title}>
            {(isOpen || stickyTitle) && <TitleContainer>{title}</TitleContainer>}
            {isOpen ? <ChevronUpIcon color={iconColor} /> : <HamburgerMenuIcon color={iconColor} />}
          </Container>
        )
      } else {
        return (
          <Container title={title}>
            <DotMenuIcon size={16} color={iconColor} />
          </Container>
        )
      }
    }}
  </StyledContextMenu>
)

export default ActionMenu
