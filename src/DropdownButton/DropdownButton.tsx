import * as React from "react"

import { DefaultProps } from "../types"
import { expandColor } from "../utils/constants"
import styled from "../utils/styled"
import { CaretDownIcon, CaretUpIcon, ChevronRightIcon } from "../Icon/Icon"
import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu"
import Button from "../Button/Button"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import { setAlpha } from "../utils"

export interface DropdownButtonProps extends DefaultProps {
  /** Actions to display in dropdown */
  items: ContextMenuProps["items"]
  /** Button color theme (hex or named color from `theme.color`) */
  color?: string
  /** Disabled option */
  disabled?: boolean
  /** What is the tab index, for accessibility? */
  tabIndex?: number
  /** onClick method for button */
  onClick?: (e?: React.SyntheticEvent<React.ReactNode>) => void
  /** onItemClick method for all menu items */
  onItemClick?: (item: IContextMenuItem) => void
  children?: React.ReactNode
}

const BaseDropdownButton = styled(Button)<{ isOpen: boolean; textColor: string }>(({ isOpen, textColor, theme }) => ({
  paddingRight: 0,
  ...(isOpen && { boxShadow: `0 0 0 1px ${expandColor(theme, textColor)} inset` }),
}))

const CaretContainer = styled("div")<{ isOpen: boolean; color: string }>(({ isOpen, color, theme }) => ({
  width: 36,
  marginLeft: theme.space.content,
  borderLeft: `1px solid ${isOpen ? expandColor(theme, color) : setAlpha(0.5)(theme.color.text.white)}`,
}))

const ItemWithChevron = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DropdownButton: React.FC<DropdownButtonProps> = ({
  items,
  onItemClick,
  color = "primary",
  children,
  ...props
}) => {
  // Dropdown buttons always have right chevrons for every item. These are added automatically.
  const itemsWithCarets = items.map(item => {
    const itemAsObject = typeof item === "string" ? { label: item } : item
    return {
      ...itemAsObject,
      label: (
        <ItemWithChevron>
          {itemAsObject.label}
          <ChevronRightIcon size={8} />
        </ItemWithChevron>
      ),
    }
  })

  return (
    <ContextMenu {...props} onClick={onItemClick} iconLocation="right" items={itemsWithCarets}>
      {isOpen => {
        return (
          <BaseDropdownButton
            {...props}
            color={isOpen ? "default" : color}
            textColor={isOpen ? color : "default"}
            isOpen={isOpen}
          >
            {children}
            <CaretContainer isOpen={isOpen} color={color}>
              {isOpen ? <CaretUpIcon size={8} /> : <CaretDownIcon size={8} />}
            </CaretContainer>
          </BaseDropdownButton>
        )
      }}
    </ContextMenu>
  )
}

export default DropdownButton
