import React, { useCallback } from "react"
import NameTag from "../NameTag/NameTag"
import styled from "../utils/styled"
import { ChevronRightIcon, ChevronDownIcon, IconComponentType } from "../Icon"
import constants, { expandColor, getHighlightColor } from "../utils/constants"
import TreeItemHighlighter from "./TreeItemHighlighter"

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
  disabled?: boolean
  cursor?: string
  onNodeClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onNodeContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
  actions?: React.ReactNode
  strong?: boolean
  fontSize?: number
  fontColor?: string
  emphasized?: boolean
  monospace?: boolean
  freeze?: boolean
}

const Header = styled.div<{
  paddingLeft: number
  paddingRight: number
  highlight: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  cursor?: string
  level: number
}>`
  label: TreeItem;
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  cursor: ${({ onClick, cursor }) => cursor || (onClick ? "pointer" : "inherit")};
  background: ${({ theme, highlight }) => (highlight ? getHighlightColor(theme) : "none")};
  padding: ${({ theme }) => `${theme.space.base / 2}px`};
  padding-left: ${({ theme, paddingLeft, level }) => paddingLeft + theme.space.element * level}px;
  padding-right: ${({ paddingRight }) => paddingRight}px;
  color: ${({ theme }) => theme.color.text.dark};
  color: ${({ theme }) => theme.color.text.dark};

  :hover,
  .no-focus &:hover:focus {
    background: ${({ theme, highlight }) => (highlight ? getHighlightColor(theme) : theme.color.background.lighter)};

    /* Show ActionsContainer on hover */
    div:last-of-type {
      opacity: 1;
    }
  }

  :focus {
    outline: none;
    color: ${({ theme }) => theme.color.primary};
    background: ${({ theme }) => getHighlightColor(theme)};

    /* Show ActionsContainer on hover */
    div:last-of-type {
      opacity: 1;
    }
  }
  .no-focus &:focus {
    color: ${({ theme }) => theme.color.text.dark};
    background: ${({ theme, highlight }) => (highlight ? getHighlightColor(theme) : "none")};
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
  disabled,
  label,
  onNodeClick,
  onNodeContextMenu,
  hasChildren,
  isOpen,
  level,
  cursor,
  actions,
  searchWords = defaultSearch,
  ignoreSearchWords,
  onMouseEnter,
  onMouseLeave,
  strong,
  fontSize,
  fontColor,
  emphasized,
  monospace,
  freeze,
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
      onClick={onNodeClick}
      onContextMenu={onNodeContextMenu}
      onKeyDown={handleKeyDown}
      highlight={Boolean(highlight)}
      cursor={cursor}
      tabIndex={disabled ? -1 : 0}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {hasChildren &&
        !freeze &&
        React.createElement(isOpen ? ChevronDownIcon : ChevronRightIcon, {
          size: 12,
          left: true,
          color: isOpen ? "color.text.lighter" : "primary",
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
        <TreeItemHighlighter
          textToHighlight={label}
          sanitize={sanitizeInput}
          searchWords={ignoreSearchWords ? emptySearchWords : searchWords}
        />
      </Label>
      <ActionsContainer childrenCount={React.Children.count(actions)}>{actions}</ActionsContainer>
    </Header>
  )
}

export default TreeItem
