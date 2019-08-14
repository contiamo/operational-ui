import * as React from "react"

import { DefaultProps } from "../types"
import styled from "../utils/styled"
import { CaretDownIcon, CaretUpIcon, ChevronRightIcon } from "../Icon/Icon"
import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu"
import Button, { makeColors } from "../Button/Button"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import { setAlpha, isWhite } from "../utils"

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
  /** Alignment */
  align?: "left" | "right"
}

const BaseDropdownButton = styled(Button)<{ isOpen: boolean }>(({ isOpen, theme }) => ({
  paddingRight: 0,
  marginRight: 0,
  ...(isOpen && {
    borderBottom: `1px solid ${({theme}) => theme.color.white}`,
    zIndex: theme.zIndex.selectOptions + 2,
  }),
}))

const CaretContainer = styled("div")<{ isOpen: boolean; color: string }>(({ isOpen, theme, color }) => {
  const { background: backgroundColor, border: borderColor } = makeColors(theme, color)
  return {
    width: 36,
    marginLeft: theme.space.content,
    borderLeft: isOpen
      ? "none"
      : `1px solid ${isWhite(backgroundColor) ? borderColor : setAlpha(0.5)(theme.color.white)}`,
  }
})

const ItemWithChevron = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ContextMenuWithBorder = styled(ContextMenu)(({ theme }) => ({
  "& div[role='listbox']": {
    border: `1px solid ${theme.color.border.disabled}`,
    transform: "translate(0, -1px)",
  },
}))

const DropdownButton: React.FC<DropdownButtonProps> = ({
  items,
  onItemClick,
  color = "primary",
  align,
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
    <ContextMenuWithBorder {...props} onClick={onItemClick} iconLocation="right" items={itemsWithCarets} align={align}>
      {isOpen => {
        return (
          <BaseDropdownButton
            {...props}
            color={isOpen ? "default" : color}
            textColor={isOpen ? "primary" : undefined}
            isOpen={isOpen}
          >
            {children}
            <CaretContainer isOpen={isOpen} color={color}>
              {isOpen ? <CaretUpIcon size={8} /> : <CaretDownIcon size={8} />}
            </CaretContainer>
          </BaseDropdownButton>
        )
      }}
    </ContextMenuWithBorder>
  )
}

export default DropdownButton
