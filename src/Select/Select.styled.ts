import styled from "../utils/styled"
import { expandColor } from "../utils/constants"
import Input from "../Input/Input"

export const Container = styled("div")<{ disabled: boolean; color?: string }>`
  display: flex;
  flex-direction: column;
  color: ${({ theme, color }) => expandColor(theme, color)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

export const Combobox = styled("div")<{ naked: boolean }>`
  display: grid;
  grid-template-columns: auto 40px;
  grid-gap: 1px;
  align-items: stretch;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-width: ${({ naked }) => (naked ? 0 : 1)}px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
`

export const SelectInput = styled(Input)`
  width: fit-content;
  border: 0;
  background: transparent;
  color: currentColor;
  cursor: inherit;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const FilterInput = styled(Input)`
  border: 0;
  margin: ${({ theme }) => -theme.space.content}px;
  border-radius: 0;
  height: auto;
`

export const DropdownButton = styled("div")<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 1px ${({ theme, isOpen }) => (isOpen ? theme.color.primary : "transparent")};
  border-top-right-radius: ${({ theme }) => theme.borderRadius}px;
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius}px;

  ::after {
    content: "";
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-top-color: ${({ theme, isOpen }) => (isOpen ? theme.color.primary : theme.color.border.default)};
    transform: ${({ isOpen }) => (isOpen ? `translateY(-2px) rotate(180deg)` : `translateY(2px)`)};
  }
`

DropdownButton.defaultProps = { role: "button", "aria-disabled": false, "aria-label": "Expand" }
