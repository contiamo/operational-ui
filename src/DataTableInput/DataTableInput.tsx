import * as React from "react"
import Input, { InputProps } from "../Input/Input"
import styled from "../utils/styled"

const StyledInput = styled(Input)`
  margin: ${({ theme }) => -theme.space.medium}px ${({ theme }) => -theme.space.content}px;
  height: 100%;
  min-height: 0;
  background: transparent;
  border: 0;
  font-weight: 400;
  width: calc(100% + ${({ theme }) => theme.space.content * 2}px); /* 2 for left _and_ right. */
  max-width: none;
` as typeof Input

export const DataTableSelect: React.FC<InputProps> = props => <StyledInput {...props} />

export default DataTableSelect
