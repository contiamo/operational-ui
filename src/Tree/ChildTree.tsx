import * as React from "react"

import Icon from "../Icon/Icon"
import NameTag from "../NameTag/NameTag"
import { Container, DeleteNode, Header, Label, TreeIcon } from "./styledComponents"
import Tree, { TreeProps } from "./Tree"

type Props = TreeProps["trees"][-1]

const ChildTree: React.SFC<Props> = ({
  initiallyOpen,
  highlight,
  tag,
  label,
  color,
  disabled,
  forwardRef,
  childNodes = [],
  onClick: onNodeClick,
  onRemove,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(Boolean(initiallyOpen))
  const toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (childNodes && childNodes.length) {
      setIsOpen(!isOpen)
    }
  }

  const hasChildren = Boolean(childNodes && childNodes.length)

  return (
    <Container ref={forwardRef} disabled={Boolean(disabled)} hasChildren={hasChildren} {...props}>
      <Header
        onClick={e => {
          toggle(e)
          if (onNodeClick) {
            onNodeClick()
          }
        }}
        highlight={Boolean(highlight)}
      >
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
      {childNodes && isOpen && <Tree trees={childNodes} />}
    </Container>
  )
}

export default ChildTree
