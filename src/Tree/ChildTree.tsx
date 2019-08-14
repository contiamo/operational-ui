import * as React from "react"
import Tree, { TreeProps } from "./Tree"
import TreeItem from "./TreeItem"
import styled from "../utils/styled"

type Props = TreeProps["trees"][-1] & { searchWords?: string[]; level: number }

const Container = styled("div")<{ hasChildren: boolean; disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "inherit")};
  user-select: none;
`

const ChildTree: React.SFC<Props> = ({
  initiallyOpen,
  highlight,
  tag,
  label,
  icon,
  iconColor,
  color,
  disabled,
  forwardRef,
  childNodes = [],
  droppableProps,
  onClick,
  onContextMenu,
  cursor,
  searchWords,
  level,
  actions,
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
            onClick()
          }
        }
      : undefined

  return (
    <Container ref={forwardRef} disabled={Boolean(disabled)} hasChildren={hasChildren} {...props}>
      <TreeItem
        level={level}
        searchWords={searchWords}
        onNodeClick={onNodeClick}
        onNodeContextMenu={onNodeContextMenu}
        highlight={Boolean(highlight)}
        hasChildren={hasChildren}
        isOpen={isOpen}
        tag={tag}
        label={label}
        color={color}
        icon={icon}
        iconColor={iconColor}
        actions={actions}
        cursor={cursor}
      />
      {hasChildren && isOpen && (
        <Tree _level={level + 1} trees={childNodes} searchWords={searchWords} droppableProps={droppableProps} />
      )}
    </Container>
  )
}

export default ChildTree
