import * as React from "react"
import Icon from "../Icon/Icon"
import NameTag from "../NameTag/NameTag"
import { Container, DeleteNode, Header, Label, TreeIcon } from "./styledComponents"
import Tree, { TreeData, TreeSharedProps } from "./Tree"

export type ChildTreeProps<Meta> = TreeData<Meta> & TreeSharedProps<Meta>

export default function ChildTree<Meta = any>(props: ChildTreeProps<Meta>) {
  const {
    initiallyOpen,
    highlight,
    tag,
    label,
    color,
    disabled,
    innerRef,
    childNodes = [],
    onClick,
    onRemove,
    ...restProps
  } = props

  const [isOpen, setIsOpen] = React.useState(Boolean(initiallyOpen))
  const toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (childNodes && childNodes.length) {
      setIsOpen(!isOpen)
    }
    if (onClick) {
      onClick(props)
    }
  }

  const hasChildren = childNodes.length > 0

  return (
    <Container innerRef={innerRef} disabled={Boolean(disabled)} hasChildren={hasChildren} {...restProps}>
      <Header onClick={toggle} highlight={Boolean(highlight)}>
        {hasChildren && <TreeIcon color="color.text.lightest" size={12} left name={isOpen ? "ChevronDown" : "Add"} />}
        {!hasChildren && tag && (
          <NameTag condensed left color={color}>
            {tag}
          </NameTag>
        )}
        <Label hasChildren={hasChildren}>{label}</Label>
        {onRemove && (
          <DeleteNode onClick={onRemove}>
            <Icon size={12} name="No" />
          </DeleteNode>
        )}
      </Header>
      {hasChildren && isOpen && <Tree trees={childNodes} onClick={onClick} />}
    </Container>
  )
}
