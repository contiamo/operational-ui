import styled from "../utils/styled"

export const IconButton = styled.div<{
  size: number
  onClick: (event: React.MouseEvent) => void
}>`
  pointer-events: all;
  transition: background-color 0.2s;
  &:hover {
    background: ${({ theme }) => theme.color.separators.default};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${props => props.size}px;
  min-width: ${props => props.size}px;
  border-radius: ${props => props.size}px;
  cursor: pointer;
`

IconButton.defaultProps = {
  role: "button",
  tabIndex: 0,
}

export default IconButton
