import styled from "../utils/styled"
import { inputFocus } from "../utils"
import { expandColor } from "../utils/constants"
import Input from "../Input/Input"

export const Listbox = styled("div")<{ disabled: boolean; color?: string; fullWidth: boolean }>`
  label: SelectListbox;
  display: flex;
  flex-direction: column;
  color: ${({ theme, color }) => expandColor(theme, color)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  outline: none;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "initial")};
`

const dropdownButtonWidth = 40

export const Combobox = styled("div")<{ naked: boolean; isOpen: boolean; hasCustomOption: boolean }>`
  display: grid;
  grid-template-columns: calc(100% - ${dropdownButtonWidth}px) ${dropdownButtonWidth}px;
  grid-gap: 1px;
  align-items: stretch;
  box-shadow: 0 0 0 1px
    ${({ theme, isOpen, hasCustomOption }) =>
      !hasCustomOption && isOpen ? theme.color.primary : theme.color.border.select};
  border-width: ${({ naked }) => (naked ? 0 : 1)}px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ naked }) => (naked ? "transparent" : "white")};

  :focus {
    ${({ theme }) => inputFocus({ theme })}
  }
`

export const SelectInput = styled(Input)<{ hasCustomOption: boolean }>`
  width: inherit;
  border: 0;
  background: transparent;
  color: currentColor;
  cursor: inherit;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: none;
  :focus {
    box-shadow: none;
  }
`

export const FilterInput = styled(Input)`
  border: 0;
  margin: ${({ theme }) => -theme.space.content}px;
  border-radius: 0;
  height: auto;
  min-height: 32px;
  max-width: none;
`

export const DropdownButton = styled("div")<{ naked: boolean; isOpen: boolean; hasCustomOption: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -1px 0;
  border: none;
  border-top-right-radius: ${({ theme }) => theme.borderRadius}px;
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius}px;

  :focus {
    box-shadow: none;
  }

  ::after {
    content: "";
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-top-color: ${({ theme, isOpen, naked }) =>
      !naked ? (isOpen ? theme.color.primary : theme.color.text.default) : "currentColor"};
    transform: ${({ isOpen }) => (isOpen ? `translateY(-2px) rotate(180deg)` : `translateY(2px)`)};
  }
`

DropdownButton.defaultProps = { role: "button", "aria-disabled": false, "aria-label": "Expand" }
