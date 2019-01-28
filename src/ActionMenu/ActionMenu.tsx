import * as React from "react"
import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu"
import Icon from "../Icon/Icon"
import { DefaultProps } from "../types"
import { darken } from "../utils"
import styled from "../utils/styled"

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

const Container = styled("div")(({ theme }) => ({
  height: 35,
  /**
   * `textAlign` is set explicitly for when a parent sets a text-align to right-position this container,
   * leaving its content left-aligned.
   */
  textAlign: "right",
  padding: `0 ${theme.space.content}px`,
  backgroundColor: theme.color.white,
  fontWeight: theme.font.weight.medium,
  borderRadius: theme.borderRadius,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  userSelect: "none",
  boxShadow: `0 0 0 1px ${theme.color.separators.light}`,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: darken(theme.color.white, 5),
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

const ClickableIcon = styled(Icon)`
  cursor: pointer;
`

const ActionMenu: React.SFC<ActionMenuProps> = ({ stickyTitle, items, title, ...props }) => (
  <ContextMenu align="right" {...props} items={items} condensed embedChildrenInMenu>
    {isOpen => (
      <Container>
        {(isOpen || stickyTitle) && <TitleContainer>{title}</TitleContainer>}
        <ClickableIcon
          color={isOpen || stickyTitle ? "primary" : "color.text.lighter"}
          name={isOpen ? "ChevronUp" : "Menu"}
        />
      </Container>
    )}
  </ContextMenu>
)

ActionMenu.defaultProps = {
  title: "Actions",
}

export default ActionMenu
