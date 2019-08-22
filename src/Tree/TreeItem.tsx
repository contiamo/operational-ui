import React, { useCallback, useRef, useLayoutEffect, useState } from "react"
import NameTag from "../NameTag/NameTag"
import { darken, lighten } from "../utils"
import styled from "../utils/styled"
import { ChevronRightIcon, ChevronDownIcon, IconComponentType, DotMenuHorizontalIcon } from "../Icon"
import Highlighter from "react-highlight-words"
import constants from "../utils/constants"
import { ViewMorePopup } from "../DataTable/DataTable.styled"

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
  margin: 0 -${({ theme }) => theme.space.element}px;
  padding: ${({ theme }) => `${theme.space.base}px ${theme.space.element}px`};
  padding-left: ${({ theme, level, hasIconOffset }) =>
    theme.space.element * (level + 1) + (hasIconOffset ? theme.space.base + theme.space.element : 0)}px;
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

const viewMoreIconSize = 18

const Label = styled.div<{ hasChildren: boolean }>`
  /* Split the label by caract properly and show the first line only */
  overflow-wrap: break-word;
  overflow: hidden;
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

  const [viewMorePopup, setViewMorePopup] = useState<{ x: number; y: number; content: string } | null>(null)
  const [isTooLong, setIsTooLong] = useState(false)
  const labelRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    // We can't attach the ref to `Highlighter`, this is why we attached the ref
    // to the parent and using `children[0]`
    if (labelRef.current && labelRef.current.children[0]) {
      const { height } = labelRef.current.children[0].getBoundingClientRect()
      setIsTooLong(height > 16)
    }
  }, [label])

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
    >
      {viewMorePopup && (
        <ViewMorePopup top={viewMorePopup.y} left={viewMorePopup.x}>
          {viewMorePopup.content}
        </ViewMorePopup>
      )}
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
      <Label hasChildren={hasChildren} ref={labelRef}>
        <Highlighter
          textToHighlight={label}
          highlightStyle={{ color: constants.color.text.action, backgroundColor: "transparent", fontWeight: "bold" }}
          searchWords={searchWords}
        />
      </Label>
      {isTooLong && (
        <DotMenuHorizontalIcon
          size={viewMoreIconSize}
          left
          onClick={() => {
            /** Just the hover style! */
          }}
          onMouseEnter={() => {
            if (labelRef.current) {
              const { right, top } = labelRef.current.getBoundingClientRect()
              setViewMorePopup({ y: top + viewMoreIconSize, x: right + viewMoreIconSize, content: label })
            }
          }}
          onMouseLeave={() => {
            if (labelRef.current) {
              setViewMorePopup(null)
            }
          }}
        />
      )}
      <ActionsContainer childrenCount={React.Children.count(actions)}>{actions}</ActionsContainer>
    </Header>
  )
}

export default TreeItem
