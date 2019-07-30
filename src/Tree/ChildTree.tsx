import * as React from "react"
import Tree, { TreeProps } from "./Tree"
import TreeItem from "./TreeItem"
import styled from "../utils/styled"

type Props = TreeProps["trees"][-1] & { searchWords?: string[]; level: number }

const Container = styled("div")<{ hasChildren: boolean; disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "inherit")};
  user-select: none;
  margin-bottom: -${({ theme }) => theme.space.base}px;
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
  onDoubleClick,
  onRemove,
  cursor,
  searchWords,
  level,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(Boolean(initiallyOpen))
  const hasChildren = Boolean(childNodes && childNodes.length)
  const clickCount = React.useRef(0)

  /**
   * This ensures that single-click isn't caught when double clicking:
   * we set a timeout to catch the second click in a doubleclick event.
   * If found, we do nothing. If not found within the time window, we
   * fire the single click event.
   */

  const timeoutForDoubleClick = 200

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
          clickCount.current++
          setTimeout(
            () => {
              if (clickCount.current === 1) {
                if (hasChildren) {
                  setIsOpen(!isOpen)
                }
                if (onClick) {
                  onClick()
                }
              }
              clickCount.current = 0
            },
            onDoubleClick ? timeoutForDoubleClick : 0,
          )
        }
      : undefined

  const onNodeDoubleClick = React.useMemo(
    () =>
      !disabled && onDoubleClick
        ? (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.preventDefault()
            onDoubleClick(event)
          }
        : undefined,
    [disabled, onContextMenu],
  )

  return (
    <Container ref={forwardRef} disabled={Boolean(disabled)} hasChildren={hasChildren} {...props}>
      <TreeItem
        level={level}
        searchWords={searchWords}
        onNodeClick={onNodeClick}
        onNodeContextMenu={onNodeContextMenu}
        onNodeDoubleClick={onNodeDoubleClick}
        highlight={Boolean(highlight)}
        hasChildren={hasChildren}
        isOpen={isOpen}
        tag={tag}
        label={label}
        color={color}
        icon={icon}
        iconColor={iconColor}
        onRemove={onRemove}
        cursor={cursor}
      />
      {hasChildren && isOpen && (
        <Tree _level={level + 1} trees={childNodes} searchWords={searchWords} droppableProps={droppableProps} />
      )}
    </Container>
  )
}

export default ChildTree
