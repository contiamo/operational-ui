import * as React from "react"
import Select, { SelectProps } from "../Select/Select"
import styled from "../utils/styled"

const StyledSelect = styled(Select)`
  margin: ${({ theme }) => -theme.space.medium}px ${({ theme }) => -theme.space.content}px;
  height: 100%;
  min-height: fit-content;
  background: transparent;
  border: 0;
  font-weight: 400;
  width: calc(100% + ${({ theme }) => -theme.space.content * 2}px);
` // * 2 for left _and_ right.

export const DataTableSelect: React.FC<SelectProps> = props => <StyledSelect {...props} />

export default DataTableSelect
