import React, { useCallback } from "react"
import NameTag from "../NameTag/NameTag"
import { darken, lighten } from "../utils"
import styled from "../utils/styled"
import { ChevronRightIcon, ChevronDownIcon, IconComponentType } from "../Icon/Icon"
import Highlighter from "react-highlight-words"
import constants from "../utils/constants"

interface TreeItemProps {
  level: number
  highlight: boolean
  searchWords?: string[]
  hasChildren: boolean
  isOpen: boolean
  label: string
  tag?: string
  icon?: IconComponentType
  iconColor?: string
  color?: string
  cursor?: string
  onNodeClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onNodeContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void
  actions?: React.ReactNode
}

const Header = styled.div<{
  highlight: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  cursor?: string
  level: number
}>`
  label: TreeItem;
  display: flex;
  position: relative;
  align-items: center;
  cursor: ${({ onClick, cursor }) => cursor || (onClick ? "pointer" : "inherit")};
  background-color: ${({ highlight, theme }) => (highlight ? theme.color.highlight : "none")};
  padding: ${({ theme }) => theme.space.base}px;
  border-radius: 2px;
  padding-left: ${({ theme, level }) => theme.space.element * level}px;
  color: ${({ theme }) => theme.color.text.dark};

  :hover {
    background-color: ${({ theme, highlight }) =>
      highlight ? darken(theme.color.highlight, 20) : theme.color.background.lighter};

    /* Show ActionsContainer on hover */
    div:last-of-type {
      display: grid;
    }
  }

  :focus {
    outline: none;
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => lighten(theme.color.primary, 50)};
  }
`

const Label = styled("div")<{ hasChildren: boolean }>`
  overflow-wrap: break-word;
  font-size: ${({ theme }) => theme.font.size.small}px;
  font-weight: ${({ theme, hasChildren }) => (hasChildren ? theme.font.weight.bold : theme.font.weight.medium)};
`

const ActionsContainer = styled.div<{ childrenCount: number }>`
  display: none;
  align-items: center;
  position: absolute;
  right: 16px;
  grid-template-columns: repeat(${({ childrenCount }) => childrenCount}, 1fr);
  grid-column-gap: 4px;
`

const TreeItem: React.SFC<TreeItemProps> = ({
  highlight,
  tag,
  icon,
  iconColor,
  label,
  color,
  onNodeClick,
  onNodeContextMenu,
  hasChildren,
  isOpen,
  level,
  cursor,
  actions,
  searchWords = [],
}) => {
  const handleKeyDown = useCallback(
    e => {
      switch (e.key) {
        case "Enter":
          e.preventDefault()
          if (e.altKey && onNodeContextMenu) {
            onNodeContextMenu(e)
            return
          }

          if (onNodeClick) {
            onNodeClick(e)
          }
          return
        case " ":
        case "Space": // the platform™
          e.preventDefault()
          if (onNodeClick) {
            onNodeClick(e)
          }
          return
      }
    },
    [onNodeContextMenu, onNodeClick],
  )

  return (
    <Header
      level={level}
      onClick={onNodeClick}
      onContextMenu={onNodeContextMenu}
      onKeyDown={handleKeyDown}
      highlight={Boolean(highlight)}
      cursor={cursor}
      tabIndex={0}
    >
      {hasChildren &&
        React.createElement(isOpen ? ChevronDownIcon : ChevronRightIcon, {
          size: 11,
          left: true,
          color: "color.text.action",
        })}
      {tag && (
        <NameTag condensed left color={color}>
          {tag}
        </NameTag>
      )}
      {icon &&
        React.createElement(icon, {
          size: 12,
          color: iconColor || "color.text.lighter",
          style: { marginLeft: 0, marginRight: 8, flex: "0 0 15px" },
        })}
      <Label hasChildren={hasChildren}>
        <Highlighter
          textToHighlight={label}
          highlightStyle={{ color: constants.color.text.action, backgroundColor: "transparent", fontWeight: "bold" }}
          searchWords={searchWords}
        />
      </Label>
      <ActionsContainer childrenCount={React.Children.count(actions)}>{actions}</ActionsContainer>
    </Header>
  )
}

export default TreeItem
