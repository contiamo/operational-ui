import * as React from "react"
import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu"
import { DefaultProps } from "../types"
import { inputFocus } from "../utils"
import styled from "../utils/styled"
import { DotMenuIcon } from "../Icon"

export interface ActionMenuProps extends DefaultProps {
  /** Action when item in dropdown is selected - if specified here, it is applied to all dropdown items */
  onClick?: ContextMenuProps["onClick"]
  /** Actions to display in dropdown */
  items: ContextMenuProps["items"]
}

const StyledContextMenu = styled(ContextMenu)(({ theme }) => ({
  " > div:focus > div": {
    ...inputFocus({ theme }),
    backgroundColor: theme.color.white,
    border: `1px solid ${theme.color.separators.light}`,
    boxShadow: "none",
    "> svg": {
      fill: theme.color.primary,
    },
  },
  " [role='option']": {
    border: `1px solid ${theme.color.separators.light}`,
  },
  " [role='option']:not(:last-of-type)": {
    borderBottom: 0,
  },
  " [role='listbox']": {
    padding: 0,
    top: 35,
  },
}))

const Container = styled("div")<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  height: 36,
  width: 36,
  /**
   * `textAlign` is set explicitly for when a parent sets a text-align to right-position this container,
   * leaving its content left-aligned.
   */
  textAlign: "right",
  fontWeight: theme.font.weight.medium,
  borderRadius: theme.borderRadius,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  cursor: "pointer",
  marginBottom: -1.5,
  position: "relative",
  zIndex: 1,
  ...(isOpen && {
    backgroundColor: theme.color.white,
    border: `1px solid ${theme.color.separators.light}`,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // Mimic a white border bottom to avoid issue cut corner / jumping issue
    ":after": {
      content: "''",
      backgroundColor: theme.color.white,
      height: 2,
      position: "absolute",
      zIndex: 1,
      right: 0,
      bottom: -1,
      left: 0,
    },
    "@media (-webkit-min-device-pixel-ratio: 2) (min-resolution: 192dpi)": {
      bottom: -1.5,
      left: 0.5,
    },
    "> svg": {
      fill: theme.color.primary,
      cursor: "pointer",
    },
  }),
  ":hover, :focus": {
    backgroundColor: theme.color.white,
    border: `1px solid ${theme.color.separators.light}`,

    "> svg": {
      fill: theme.color.primary,
      cursor: "pointer",
    },
  },
  "> svg": {
    cursor: "pointer",
  },
}))

const ActionMenu: React.SFC<ActionMenuProps> = ({ items, ...props }) => (
  <StyledContextMenu align="right" {...props} items={items} condensed>
    {isOpen => {
      const iconColor = isOpen ? "primary" : "color.text.lighter"

      return (
        <Container isOpen={isOpen}>
          <DotMenuIcon size={16} color={iconColor} />
        </Container>
      )
    }}
  </StyledContextMenu>
)

export default ActionMenu
