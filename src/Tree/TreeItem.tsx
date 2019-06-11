import React from "react"
import NameTag from "../NameTag/NameTag"
import { darken } from "../utils"
import styled from "../utils/styled"
import { PlusIcon, NoIcon, MinusIcon, IconComponentType } from "../Icon/Icon"

export const Container = styled("div")<{ hasChildren: boolean; disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "inherit")};
  user-select: none;
  margin-bottom: -${({ theme }) => theme.space.base}px;
`

const Header = styled("div")<{
  highlight: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  cursor?: string
}>`
  label: TreeItem;
  display: flex;
  align-items: center;
  cursor: ${({ onClick, cursor }) => cursor || (onClick ? "pointer" : "inherit")};
  background-color: ${({ highlight, theme }) => (highlight ? theme.color.highlight : "none")};
  padding: ${({ theme }) => theme.space.base}px;
  border-radius: 2px;

  :hover {
    background-color: ${({ theme, highlight }) =>
      highlight ? darken(theme.color.highlight, 20) : theme.color.background.lighter};
  }
`

const Label = styled("div")<{ hasChildren: boolean }>`
  overflow-wrap: break-word;
  font-size: ${({ theme }) => theme.font.size.small}px;
  font-weight: ${({ theme, hasChildren }) => (hasChildren ? theme.font.weight.bold : theme.font.weight.medium)};
  color: ${({ theme }) => theme.color.text.dark};
`

const DeleteNode = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  width: 14px;
  height: 14px;
  background-color: rgba(0, 0, 0, 0.05);
  color: ${({ theme }) => theme.color.text.lighter};
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

interface TreeItemProps {
  highlight: boolean
  hasChildren: boolean
  isOpen: boolean
  label: string
  tag?: string
  icon?: IconComponentType
  iconColor?: string
  color?: string
  cursor?: string
  onNodeClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onRemove?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const TreeItem: React.SFC<TreeItemProps> = ({
  highlight,
  tag,
  icon,
  iconColor,
  label,
  color,
  onNodeClick,
  onRemove,
  hasChildren,
  isOpen,
  cursor,
}) => (
  <Header onClick={onNodeClick} highlight={Boolean(highlight)} cursor={cursor}>
    {hasChildren &&
      React.createElement(isOpen ? MinusIcon : PlusIcon, {
        size: 11,
        left: true,
        color: "color.text.action",
      })}
    {tag && (
      <NameTag condensed left color={color} {...{ style: { marginLeft: 2 } }}>
        {tag}
      </NameTag>
    )}
    {icon &&
      React.createElement(icon, {
        size: 12,
        color: iconColor || "color.text.lighter",
        style: { marginLeft: 3, marginRight: 8 },
      })}
    <Label hasChildren={hasChildren}>{label}</Label>
    {onRemove && (
      <DeleteNode onClick={onRemove}>
        <NoIcon size={12} />
      </DeleteNode>
    )}
  </Header>
)

export default TreeItem
