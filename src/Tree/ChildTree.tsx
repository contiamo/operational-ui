import * as React from "react"
import Tree, { TreeProps } from "./Tree"
import TreeItem from "./TreeItem"
import styled from "../utils/styled"

type Props = TreeProps["trees"][-1] & {
  searchWords?: string[]
  level: number
  hasIconOffset: boolean
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Container = styled.div<{ hasChildren: boolean; disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "inherit")};
  user-select: none;
`

const ChildTree: React.SFC<Props> = ({
  paddingLeft,
  initiallyOpen,
  highlight,
  tag,
  tagColor,
  label,
  icon,
  iconColor,
  disabled,
  forwardRef,
  childNodes = [],
  droppableProps,
  onClick,
  onContextMenu,
  cursor,
  searchWords,
  ignoreSearchWords,
  level,
  actions,
  hasIconOffset,
  onMouseEnter,
  onMouseLeave,
  strong,
  fontSize,
  fontColor,
  emphasized,
  monospace,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(Boolean(initiallyOpen))
  const hasChildren = Boolean(childNodes && childNodes.length)

  const onNodeContextMenu = React.useMemo(
    () =>
      !disabled && onContextMenu
        ? (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.preventDefault()
            onContextMenu(event)
          }
        : undefined,
    [disabled, onContextMenu],
  )

  const onNodeClick =
    !disabled && (hasChildren || onClick)
      ? (e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation()
          if (e.altKey && onNodeContextMenu) {
            onNodeContextMenu(e)
            return
          }
          if (hasChildren) {
            setIsOpen(!isOpen)
          }
          if (onClick) {
            onClick(e)
          }
        }
      : undefined

  return (
    <Container ref={forwardRef} disabled={Boolean(disabled)} hasChildren={hasChildren} {...props}>
      <TreeItem
        paddingLeft={paddingLeft}
        level={level}
        searchWords={searchWords}
        ignoreSearchWords={ignoreSearchWords}
        onNodeClick={onNodeClick}
        onNodeContextMenu={onNodeContextMenu}
        highlight={Boolean(highlight)}
        hasChildren={hasChildren}
        isOpen={isOpen}
        tag={tag}
        tagColor={tagColor}
        label={label}
        icon={icon}
        iconColor={iconColor}
        actions={actions}
        cursor={cursor}
        hasIconOffset={hasIconOffset && !hasChildren}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        strong={strong}
        fontSize={fontSize}
        fontColor={fontColor}
        emphasized={emphasized}
        monospace={monospace}
      />
      {hasChildren && isOpen && (
        <Tree
          _level={level + 1}
          _hasIconOffset={Boolean(icon) || Boolean(tag)}
          paddingLeft={paddingLeft}
          trees={childNodes}
          searchWords={searchWords}
          droppableProps={droppableProps}
        />
      )}
    </Container>
  )
}

export default ChildTree
