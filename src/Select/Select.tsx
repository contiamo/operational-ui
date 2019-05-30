import * as React from "react"
import { DefaultProps } from "../types"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import ContextMenu from "../ContextMenu/ContextMenu"
import styled from "../utils/styled"
import Input from "../Input/Input"

export type Value = number | string

export interface IOption {
  label?: string
  value: Value
}

export interface SelectProps extends DefaultProps {
  /** Options available */
  options: IOption[]
  /** Current value */
  value: null | Value | Value[]
  /** Make the list filterable */
  filterable?: boolean
  /**
   * Limit the number of options displayed
   */
  maxOptions?: number
  /** Disable the component */
  disabled?: boolean
  /** Callback trigger on any changes */
  onChange?: (newValue: null | Value | Value[], changedItem?: Value) => void
  /** Text color */
  color?: string
  /** Text to display when no active selection */
  placeholder?: string
  /** Label text */
  label?: string
  /** Should the Select be rendered with a full box style? */
  naked?: boolean
}

const borderRadius = 2

const Container = styled("div")`
  display: flex;
  flex-direction: column;
`

const Combobox = styled("div")`
  display: grid;
  grid-template-columns: auto 40px;
  grid-gap: 1px;
  align-items: stretch;
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-radius: ${borderRadius}px;
`

const SelectInput = styled(Input)`
  width: fit-content;
  border: 0;
  background: transparent;
  color: currentColor;
  cursor: inherit;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`

const DropdownButton = styled("div")<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 1px ${({ theme, isOpen }) => (isOpen ? theme.color.primary : "transparent")};
  border-top-right-radius: ${borderRadius}px;
  border-bottom-right-radius: ${borderRadius}px;

  ::after {
    content: "";
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-top-color: ${({ theme, isOpen }) => (isOpen ? theme.color.primary : theme.color.border.default)};
    transform: ${({ isOpen }) => (isOpen ? `translateY(-2px) rotate(180deg)` : `translateY(2px)`)};
  }
`

export const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const items = React.useMemo(
    () =>
      options.map(
        (option): IContextMenuItem => ({
          ...option,
          onClick: () => {
            if (onChange) {
              onChange(option.value, option.value)
            }
          },
          label: option.label ? option.label : "",
        }),
      ),
    [options],
  )

  return (
    <ContextMenu items={items}>
      {isOpen => (
        <Container>
          <Combobox>
            <SelectInput value={String(value)} />
            <DropdownButton isOpen={isOpen} />
          </Combobox>
        </Container>
      )}
    </ContextMenu>
  )
}

export default Select
