import React, { useRef, useState } from "react"

import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu"
import Icon from "../Icon/Icon"
import useDebouncedCallback from "../useDebouncedCallback"
import useWindowEventListener from "../useWindowEventListener"
import styled from "../utils/styled"

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
  onChange?: (newLabel: string | React.ReactElement<any>) => void
}

const TopbarSelectContainer = styled("div")<{ isActive: boolean }>`
  line-height: 1;
  height: ${props => props.theme.topbarHeight}px;
  display: flex;
  align-items: center;
  padding: 0px ${props => props.theme.space.medium}px;
  box-shadow: ${props => (props.isActive ? props.theme.shadows.popup : "none")};
  border-bottom: ${props => (props.isActive ? "1px" : "0px")};
  border-color: ${props => props.theme.color.border.default};
  cursor: pointer;
  background-color: ${props => (props.isActive ? props.theme.color.white : "transparent")};
  :hover {
    background-color: ${props => (props.isActive ? props.theme.color.white : props.theme.color.background.lighter)};
  }
  & svg {
    /** Icons are purely presentational and click events are handled upstream */
    pointer-events: none;
  }
`

const TopbarSelectValue = styled("div")`
  padding: 0px ${props => props.theme.space.base}px;
  font-size: ${props => props.theme.font.size.fineprint}px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.color.text.dark};
  & > :first-child {
    margin-right: ${props => props.theme.space.element}px;
  }
`

const TopbarSelectValueSpan = styled("span")<{ active?: boolean }>`
  color: ${props => (props.active ? props.theme.color.text.dark : props.theme.color.text.lighter)};
`

const TopbarSelectLabel = styled("p")`
  margin: 0px ${props => props.theme.space.base}px 0px 0px;
  font-size: ${props => props.theme.font.size.fineprint}px;
  color: ${props => props.theme.color.text.lightest};
  font-weight: ${props => props.theme.font.weight.medium};
`

const TopbarSelect = ({ label, selected, items, onChange, ...props }: TopbarSelectProps) => {
  const [containerWidth, setContainerWidth] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  const updateContainerWidth = () => {
    if (!containerRef.current) {
      return
    }

    if (containerRef.current.clientWidth !== containerWidth) {
      setContainerWidth(containerRef.current.clientWidth)
    }
  }

  const debouncedUpdateRenderedWidth = useDebouncedCallback(updateContainerWidth, 100, [])

  useWindowEventListener("resize", debouncedUpdateRenderedWidth)

  return (
    <ContextMenu
      condensed
      items={items}
      width={containerWidth}
      onClick={newItem => {
        if (onChange) {
          onChange(newItem.label)
        }
      }}
    >
      {isActive => (
        <TopbarSelectContainer {...props} isActive={isActive} ref={containerRef}>
          <TopbarSelectLabel>{label}</TopbarSelectLabel>
          <TopbarSelectValue>
            <TopbarSelectValueSpan active={Boolean(selected)}>{selected}</TopbarSelectValueSpan>
            <Icon color="color.text.lightest" name={isActive ? "CaretUp" : "CaretDown"} size={12} />
          </TopbarSelectValue>
        </TopbarSelectContainer>
      )}
    </ContextMenu>
  )
}

export default TopbarSelect
