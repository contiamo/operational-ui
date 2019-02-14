import Icon from "../Icon/Icon"
import { darken } from "../utils"
import styled from "../utils/styled"

export const Header = styled("div")<{ highlight: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.space.base}px;
  cursor: pointer;
  background-color: ${({ highlight, theme }) => (highlight ? theme.color.highlight : "none")};
  outline: ${({ theme, highlight }) => (highlight ? `${theme.space.base}px solid ${theme.color.highlight}` : "none")};

  :hover {
    background-color: ${({ theme, highlight }) =>
      highlight ? darken(theme.color.highlight, 20) : theme.color.background.lighter};
    outline: ${({ theme, highlight }) =>
      `${theme.space.base}px solid ${highlight ? darken(theme.color.highlight, 20) : theme.color.background.lighter};`};
  }
`

export const Label = styled("div")<{ hasChildren: boolean }>`
  overflow-wrap: break-word;
  font-size: ${({ theme }) => theme.font.size.fineprint}px;
  font-weight: ${({ theme, hasChildren }) => (hasChildren ? theme.font.weight.bold : theme.font.weight.medium)};
  color: ${({ theme }) => theme.color.text.dark};
`

export const Container = styled("div")<{ hasChildren: boolean; disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  user-select: none;

  & + & {
    margin-top: ${({ theme, hasChildren }) => (hasChildren ? theme.space.small : theme.space.base)}px;
  }
`

export const DeleteNode = styled("div")`
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
    cursor: pointer;
  }
`

export const TreeIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.space.base}px;
`
