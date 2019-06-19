import * as React from "react"

import { DefaultProps } from "../types"
import { expandColor } from "../utils/constants"
import styled from "../utils/styled"
import { CaretDownIcon, CaretRightIcon } from "../Icon/Icon"
import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu"
import Button from "../Button/Button"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import { setAlpha } from "../utils"

export interface ComboButtonProps extends DefaultProps {
  /** Button color theme (hex or named color from `theme.color`) */
  color: string
  /** Actions to display in dropdown */
  items: ContextMenuProps["items"]
  /** Disabled option */
  disabled?: boolean
  /** What is the tab index, for accessibility? */
  tabIndex?: number
  /** onItemClick method for all menu items */
  onItemClick?: (item: IContextMenuItem) => void
  children?: React.ReactNode
}

const BaseComboButton = styled(Button)<{ isOpen: boolean; textColor: string }>(({ isOpen, textColor, theme }) => ({
  paddingRight: 0,
  ...(isOpen
    ? {
        boxShadow: `0 0 0 1px ${expandColor(theme, textColor)} inset`,
      }
    : {}),
}))

const CaretContainer = styled("div")<{ isOpen: boolean; color: string }>(({ isOpen, color, theme }) => ({
  width: "36px",
  marginLeft: theme.space.content,
  borderLeft: `1px solid ${isOpen ? expandColor(theme, color) : setAlpha(0.5)(theme.color.text.white)}`,
}))

const ItemWithCaret = styled("div")`
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`

const ComboButton: React.SFC<ComboButtonProps> = ({ items, onItemClick, color, children, ...props }) => {
  // Dropdown buttons always have right carets for every item. These are added automatically.
  const itemsWithCarets = items.map(item => {
    return {
      label: (
        <ItemWithCaret>
          {typeof item === "string" ? item : item.label}
          <CaretRightIcon size={8} />
        </ItemWithCaret>
      ),
    }
  })

  return (
    <ContextMenu {...props} onClick={onItemClick} iconLocation="right" items={itemsWithCarets}>
      {isOpen => {
        return (
          <BaseComboButton
            {...props}
            color={isOpen ? "default" : color}
            textColor={isOpen ? color : "default"}
            isOpen={isOpen}
          >
            {children}
            <CaretContainer isOpen={isOpen} color={color}>
              <CaretDownIcon size={8} />
            </CaretContainer>
          </BaseComboButton>
        )
      }}
    </ContextMenu>
  )
}

ComboButton.defaultProps = {
  color: "primary",
}

export default ComboButton
