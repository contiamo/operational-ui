import * as React from "react"
import Tree, { TreeProps } from "./Tree"
import TreeItem, { Container } from "./TreeItem"

type Props = TreeProps["trees"][-1]

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
      {hasChildren && isOpen && <Tree trees={childNodes} droppableProps={droppableProps} _extraOffset={Boolean(tag)} />}
    </Container>
  )
}

export default ChildTree
