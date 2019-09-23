import * as React from "react"
import styled from "../utils/styled"

const Container = styled("div")<{ onClick?: (e: React.MouseEvent) => void }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.small}px;
  color: ${({ onClick, theme }) => (Boolean(onClick) ? theme.color.primary : "inherit")};
  cursor: ${({ onClick }) => (Boolean(onClick) ? "pointer" : "initial")};
  border: 1px solid ${({ theme }) => theme.color.border.disabled};
`

export const DataTableFooter: React.FC<{ onClick?: (e: React.MouseEvent) => void }> = props => <Container {...props} />

export default DataTableFooter
