import * as React from "react"
import styled from "../utils/styled"

const Container = styled("div")<{ onClick?: (e: React.MouseEvent) => void }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.small}px;
  color: ${({ onClick, theme }) => (Boolean(onClick) ? theme.color.primary : "inherit")};
  font-weight: ${({ onClick, theme }) => (Boolean(onClick) ? theme.font.weight.bold : theme.font.weight.regular)};
  cursor: ${({ onClick }) => (Boolean(onClick) ? "pointer" : "initial")};
  border-top: 1px solid ${({ theme }) => theme.color.border.gentle};
`

export const DataTableFooter: React.FC = props => <Container {...props} />

export default DataTableFooter
