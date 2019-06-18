import * as React from "react"

import { DefaultProps } from "../types"
import { darken, inputFocus } from "../utils"
import styled from "../utils/styled"
import { CaretDownIcon, CaretRightIcon } from "../Icon/Icon"
import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu"

export interface ComboButtonProps extends DefaultProps {
  /** Title */
  title?: string
  /** Actions to display in dropdown */
  items: ContextMenuProps["items"]
  /** Disabled option */
  disabled?: boolean
  /** What is the tab index, for accessibility? */
  tabIndex?: number
}

const BaseComboButton = styled("button")<{ disabled?: ComboButtonProps["disabled"]; isOpen: boolean }>(
  ({ theme, disabled, isOpen }) => {
    return {
      backgroundColor: theme.color.primary,
      lineHeight: "36px",
      fontSize: theme.font.size.small,
      fontFamily: theme.font.family.main,
      fontWeight: theme.font.weight.medium,
      color: theme.color.text.white,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: `0 0 0 ${theme.space.element}px`,
      borderRadius: theme.borderRadius,
      border: 0,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1.0,
      outline: "none",
      position: "relative",
      marginRight: theme.space.small,
      ...(isOpen
        ? {
            backgroundColor: theme.color.white,
            color: theme.color.text.default,
            borderColor: theme.color.border.select,
          }
        : {
            backgroundColor: theme.color.primary,
            color: theme.color.text.white,
            borderColor: theme.color.border.invisible,
          }),
      // Apply styles with increased specificity to override defaults
      ":focus": {
        ...inputFocus({ theme }),
      },
      ...(!disabled
        ? {
            ":hover": {
              backgroundColor: isOpen ? theme.color.white : darken(theme.color.primary, 5),
            },
          }
        : {}),
    }
  },
)

const CaretContainer = styled("div")<{ isOpen: boolean }>(({ isOpen, theme }) => {
  return {
    width: "36px",
    marginLeft: theme.space.content,
    borderLeft: `1px solid ${isOpen ? theme.color.primary : theme.color.text.white}`,
  }
})

const ItemWithCaret = styled("div")`
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`

const ComboButton: React.SFC<ComboButtonProps> = ({ items, title, tabIndex, ...props }) => {
  // Dropdown buttons always have right carets for every item. These are
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
    <ContextMenu {...props} iconLocation="right" items={itemsWithCarets}>
      {isOpen => {
        return (
          <BaseComboButton
            {...props}
            role="button"
            aria-label={title}
            tabIndex={tabIndex}
            onClick={(ev: React.SyntheticEvent<React.ReactNode>) => {
              if (props.disabled) {
                ev.preventDefault()
                return
              }
            }}
            title={title}
            isOpen={isOpen}
          >
            {title}
            <CaretContainer isOpen={isOpen}>
              <CaretDownIcon size={8} />
            </CaretContainer>
          </BaseComboButton>
        )
      }}
    </ContextMenu>
  )
}

export default ComboButton
