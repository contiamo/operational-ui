import React, { useCallback } from "react"

import NameTag from "../NameTag/NameTag"
import { darken, lighten } from "../utils"
import styled from "../utils/styled"
import { ChevronRightIcon, ChevronDownIcon, IconComponentType } from "../Icon"
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
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
  actions?: React.ReactNode
  hasIconOffset?: boolean
}

const Header = styled.div<{
  highlight: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  cursor?: string
  level: number
  hasIconOffset: boolean
}>`
  label: TreeItem;
  display: flex;
  position: relative;
  align-items: center;
  cursor: ${({ onClick, cursor }) => cursor || (onClick ? "pointer" : "inherit")};
  background: ${({ highlight, theme }) => (highlight ? theme.color.highlight : "none")};
  padding: ${({ theme }) => `${theme.space.base / 2}px ${theme.space.content}px`};
  padding-left: ${({ theme, level, hasIconOffset }) =>
    theme.space.content * (level + 1) + (hasIconOffset ? theme.space.content - theme.space.base : -theme.space.base)}px;
  margin: 0 -${({ theme }) => theme.space.medium}px;
  color: ${({ theme }) => theme.color.text.dark};

  :hover,
  .no-focus &:hover:focus {
    background: ${({ theme, highlight }) =>
      highlight ? darken(theme.color.highlight, 20) : theme.color.background.lighter};

    /* Show ActionsContainer on hover */
    div:last-of-type {
      opacity: 1;
    }
  }

  :focus {
    outline: none;
    color: ${({ theme }) => theme.color.primary};
    background: ${({ theme }) => lighten(theme.color.primary, 50)};

    /* Show ActionsContainer on hover */
    div:last-of-type {
      opacity: 1;
    }
  }
  .no-focus &:focus {
    color: ${({ theme }) => theme.color.text.dark};
    background: ${({ highlight, theme }) => (highlight ? theme.color.highlight : "none")};
    div:last-of-type {
      opacity: 0;
    }
  }
`

const NameTagStyled = styled(NameTag)<{ withIcon?: boolean }>`
  label: NameTagStyled;
  margin-right: ${({ theme }) => theme.space.base}px;
`

// These props are extracted to avoid useless re-render
const highlightStyle: React.CSSProperties = {
  color: constants.color.text.action,
  backgroundColor: "transparent",
  fontWeight: "bold",
}
const defaultSearch: string[] = []

const Label = styled.div<{ hasChildren: boolean }>`
  /* Split the label by caract properly and show the first line only */
  overflow-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 16px;

  font-size: ${({ theme }) => theme.font.size.small}px;
  font-weight: ${({ theme, hasChildren }) => (hasChildren ? theme.font.weight.bold : theme.font.weight.medium)};
  flex: 1;
`

const ActionsContainer = styled.div<{ childrenCount: number }>`
  display: grid;
  opacity: 0;
  align-items: center;
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
  hasIconOffset,
  searchWords = defaultSearch,
  onMouseEnter,
  onMouseLeave,
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
      hasIconOffset={Boolean(hasIconOffset)}
      onClick={onNodeClick}
      onContextMenu={onNodeContextMenu}
      onKeyDown={handleKeyDown}
      highlight={Boolean(highlight)}
      cursor={cursor}
      tabIndex={0} // TODO: tabIndex -1 for disabled items
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {hasChildren &&
        React.createElement(isOpen ? ChevronDownIcon : ChevronRightIcon, {
          size: 11,
          left: true,
          color: "color.text.lighter",
          style: { marginRight: 4 },
        })}
      {tag && (
        <NameTagStyled condensed left color={color}>
          {tag}
        </NameTagStyled>
      )}
      {icon &&
        React.createElement(icon, {
          size: 12,
          color: iconColor || "color.text.lighter",
          style: { marginLeft: 0, marginRight: 4, flex: "0 0 11px" },
        })}
      <Label hasChildren={hasChildren}>
        <Highlighter textToHighlight={label} highlightStyle={highlightStyle} searchWords={searchWords} />
      </Label>
      <ActionsContainer childrenCount={React.Children.count(actions)}>{actions}</ActionsContainer>
    </Header>
  )
}

export default TreeItem
