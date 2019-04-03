import React from "react"
import Icon from "../Icon/Icon"
import NameTag from "../NameTag/NameTag"
import { darken } from "../utils"
import styled from "../utils/styled"

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
  font-size: ${({ theme }) => theme.font.size.fineprint}px;
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

const TreeIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.space.base}px;
`

interface TreeItemProps {
  highlight: boolean
  hasChildren: boolean
  isOpen: boolean
  label: string
  tag?: string
  color?: string
  cursor?: string
  onNodeClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onRemove?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const TreeItem: React.SFC<TreeItemProps> = ({
  highlight,
  tag,
  label,
  color,
  onNodeClick,
  onRemove,
  hasChildren,
  isOpen,
  cursor,
}) => (
  <Header onClick={onNodeClick} highlight={Boolean(highlight)} cursor={cursor}>
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
)

export default TreeItem
