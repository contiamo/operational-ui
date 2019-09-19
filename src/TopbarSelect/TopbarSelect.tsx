import { inputFocus } from "../utils"
import React, { useLayoutEffect, useRef, useState, useMemo } from "react"

import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu"
import styled from "../utils/styled"
import { CaretUpIcon, CaretDownIcon } from "../Icon"

export interface TopbarSelectProps {
  /** A label added right before displaying the selected value */
  label: string
  /** Selected value */
  selected?: string
  /** A placeholder displayed when no item is selected */
  placeholder?: string
  /** Menu items, conforming to the ContextMenu API */
  items: ContextMenuProps["items"]
  /** Change handler */
  onChange?: ContextMenuProps["onClick"]
}

const TopbarSelectContainer = styled("div")<{ isActive: boolean }>`
  line-height: 1;
  height: ${props => props.theme.topbarHeight - (props.isActive ? 1 : 0)}px;
  display: flex;
  align-items: center;
  padding: 0px ${props => props.theme.space.medium}px;
  box-shadow: ${props => (props.isActive ? props.theme.shadows.contextMenu : "none")};
  border-bottom: 1px solid transparent;
  cursor: pointer;
  background-color: ${props => (props.isActive ? props.theme.color.white : "transparent")};
  color: ${props => props.theme.color.text.dark};
  & svg {
    /** Icons are purely presentational and click events are handled upstream */
    pointer-events: none;
  }
  :focus {
    ${({ theme }) => inputFocus({ theme })};
  }
`

const TopbarSelectValue = styled("div")`
  padding: 0px ${props => props.theme.space.base}px;
  font-size: ${props => props.theme.font.size.small}px;
  display: flex;
  align-items: center;
`

const TopbarSelectValueSpan = styled("span")`
  margin-right: ${props => props.theme.space.element}px;
`

const TopbarSelectLabel = styled("p")`
  margin: 0px ${props => props.theme.space.element}px 0px 0px;
  font-size: ${props => props.theme.font.size.small}px;
  font-weight: ${props => props.theme.font.weight.medium};
`

const TopbarSelect = ({ label, selected, items, onChange, ...props }: TopbarSelectProps) => {
  const [containerWidth, setContainerWidth] = useState(0)

  const Icon = useMemo(() => {
    const item = items.find(item => (typeof item === "string" ? false : item.label === selected))
    return typeof item === "object" && item.icon
  }, [items, selected])
  const $container = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if ($container.current) {
      setContainerWidth($container.current.clientWidth)
    }
  })

  return (
    <ContextMenu
      condensed
      items={items}
      width={containerWidth}
      onClick={newItem => {
        if (onChange) {
          onChange(newItem)
        }
      }}
    >
      {isActive => (
        <TopbarSelectContainer {...props} isActive={isActive} ref={$container}>
          <TopbarSelectLabel>{label}</TopbarSelectLabel>
          <TopbarSelectValue>
            {Icon && <Icon left />}
            <TopbarSelectValueSpan>{selected}</TopbarSelectValueSpan>
            {React.createElement(isActive ? CaretUpIcon : CaretDownIcon, { size: 5, color: "color.text.lightest" })}
          </TopbarSelectValue>
        </TopbarSelectContainer>
      )}
    </ContextMenu>
  )
}

export default TopbarSelect
