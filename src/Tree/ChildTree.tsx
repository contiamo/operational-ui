import * as React from "react"
import Tree, { TreeProps } from "./Tree"
import TreeItem, { Container } from "./TreeItem"

type Props = TreeProps["trees"][-1] & { searchWords?: string[] }

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
  onRemove,
  cursor,
  searchWords,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(Boolean(initiallyOpen))
  const hasChildren = Boolean(childNodes && childNodes.length)
  const onNodeClick =
    !disabled && (hasChildren || onClick)
      ? (e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation()
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
        searchWords={searchWords}
        onNodeClick={onNodeClick}
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
        <Tree
          _isChild
          _hasParentTag={Boolean(tag)}
          trees={childNodes}
          searchWords={searchWords}
          droppableProps={droppableProps}
        />
      )}
    </Container>
  )
}

export default ChildTree
