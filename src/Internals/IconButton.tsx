import styled from "../utils/styled"

export const IconButton = styled.span<{
  size: number
  onClick: (event: React.SyntheticEvent<HTMLSpanElement>) => void
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
  & svg {
    cursor: pointer !important;
  }
`

export default IconButton
