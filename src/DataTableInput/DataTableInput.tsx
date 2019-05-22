import * as React from "react"
import Input, { InputProps } from "../Input/Input"
import styled from "../utils/styled"

const StyledInput = styled(Input)`
  border: 0;
  margin: ${({ theme }) => -theme.space.medium}px ${({ theme }) => -theme.space.content}px;
  height: 100%;
  min-height: 0;
` as typeof Input

export const DataTableInput: React.FC<InputProps> = props => <StyledInput fullWidth {...props} />

export default DataTableInput
