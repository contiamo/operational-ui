import * as React from "react"
import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu"
import Icon from "../Icon/Icon"
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

const TopbarSelectContainer = styled("div")`
  height: ${props => props.theme.topbarHeight}px;
  display: flex;
  align-items: center;
  padding: 0px ${props => props.theme.space.medium}px;
  :hover {
    background-color: ${props => props.theme.color.background.lighter};
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
  color: ${props => props.theme.color.text.lighter};
  font-weight: ${props => props.theme.font.weight.medium};
`

export const TopbarSelect: React.SFC<TopbarSelectProps> = ({ label, selected, items, onChange, ...props }) => (
  <ContextMenu
    condensed
    items={items}
    onClick={newItem => {
      if (onChange) {
        onChange(newItem.label)
      }
    }}
  >
    {isActive => (
      <TopbarSelectContainer {...props}>
        <TopbarSelectLabel>{label}</TopbarSelectLabel>
        <TopbarSelectValue>
          <TopbarSelectValueSpan active={Boolean(selected)}>{selected}</TopbarSelectValueSpan>
          <Icon name={isActive ? "ChevronUp" : "ChevronDown"} size={12} />
        </TopbarSelectValue>
      </TopbarSelectContainer>
    )}
  </ContextMenu>
)
