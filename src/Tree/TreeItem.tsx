import React, { useCallback } from "react"
import NameTag from "../NameTag/NameTag"
import { darken, lighten } from "../utils"
import styled from "../utils/styled"
import { ChevronRightIcon, ChevronDownIcon, IconComponentType } from "../Icon"
import Highlighter from "react-highlight-words"
import constants, { expandColor } from "../utils/constants"

interface TreeItemProps {
  paddingLeft: number
  paddingRight: number
  level: number
  highlight: boolean
  searchWords?: string[]
  ignoreSearchWords?: boolean
  hasChildren: boolean
  isOpen: boolean
  label: string
  tag?: string
  tagColor?: string
  icon?: IconComponentType
  iconColor?: string
  cursor?: string
  onNodeClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onNodeContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
  actions?: React.ReactNode
  hasIconOffset?: boolean
  strong?: boolean
  fontSize?: number
  fontColor?: string
  emphasized?: boolean
  monospace?: boolean
}

const Header = styled.div<{
  paddingLeft: number
  paddingRight: number
  highlight: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  cursor?: string
  level: number
  hasIconOffset: boolean
}>`
  label: TreeItem;
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  cursor: ${({ onClick, cursor }) => cursor || (onClick ? "pointer" : "inherit")};
  background: ${({ highlight, theme }) => (highlight ? theme.color.highlight : "none")};
  padding: ${({ theme }) => `${theme.space.base / 2}px`};
  padding-left: ${({ theme, paddingLeft, level, hasIconOffset }) =>
    paddingLeft + theme.space.element * level + (hasIconOffset ? theme.space.element : 0)}px;
  padding-right: ${({ paddingRight }) => paddingRight}px;
  color: ${({ theme }) => theme.color.text.dark};
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
  margin-right: ${({ theme }) => theme.space.small}px;
  width: ${({ theme }) => theme.space.medium}px;
  height: ${({ theme }) => theme.space.medium}px;
`

// These props are extracted to avoid useless re-render
const highlightStyle: React.CSSProperties = {
  color: constants.color.text.action,
  backgroundColor: "transparent",
}

const defaultSearch: string[] = []

const Label = styled.div<{
  strong: boolean
  fontSize: number
  emphasized: boolean
  monospace: boolean
  fontColor?: string
}>`
  /* Split the label by caract properly and show the first line only */
  overflow-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 16px;

  line-height: 16px;
  color: ${({ fontColor }) => (fontColor ? expandColor(constants, fontColor) : "inherit")};
  font-family: ${({ monospace }) => (monospace ? "monospace" : "inherit")};
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ theme, strong }) => (Boolean(strong) ? theme.font.weight.bold : theme.font.weight.regular)};
  font-style: ${({ emphasized }) => (emphasized ? "italic" : "normal")};
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

const sanitizeInput = (input: string) => input.replace(/\\/g, "") // Prevent crashing when entering a backslash "\"

const emptySearchWords: string[] = []

const TreeItem: React.SFC<TreeItemProps> = ({
  paddingLeft,
  paddingRight,
  highlight,
  tag,
  tagColor,
  icon,
  iconColor,
  label,
  onNodeClick,
  onNodeContextMenu,
  hasChildren,
  isOpen,
  level,
  cursor,
  actions,
  hasIconOffset,
  searchWords = defaultSearch,
  ignoreSearchWords,
  onMouseEnter,
  onMouseLeave,
  strong,
  fontSize,
  fontColor,
  emphasized,
  monospace,
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
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
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
          size: 12,
          left: true,
          color: "color.text.lighter",
          style: { marginRight: 8 },
        })}
      {tag && (
        <NameTagStyled condensed left color={tagColor}>
          {tag}
        </NameTagStyled>
      )}
      {icon &&
        React.createElement(icon, {
          size: 12,
          color: iconColor || "color.text.lighter",
          style: { marginLeft: 0, marginRight: 8, flex: "0 0 12px" },
        })}

      <Label
        fontColor={fontColor}
        strong={Boolean(strong)}
        fontSize={fontSize ? fontSize : constants.font.size.small}
        emphasized={Boolean(emphasized)}
        monospace={Boolean(monospace)}
      >
        <Highlighter
          textToHighlight={label}
          highlightStyle={highlightStyle}
          sanitize={sanitizeInput}
          searchWords={ignoreSearchWords ? emptySearchWords : searchWords}
        />
      </Label>
      <ActionsContainer childrenCount={React.Children.count(actions)}>{actions}</ActionsContainer>
    </Header>
  )
}

export default TreeItem
