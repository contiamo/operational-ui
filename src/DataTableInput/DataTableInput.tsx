import * as React from "react"

import Input, { InputProps } from "../Input/Input"
import Tooltip from "../Tooltip/Tooltip"
import { setAlpha } from "../utils"
import styled from "../utils/styled"

const StyledInput = styled(Input)<{ error: string }>`
  outline: 1px solid ${({ error, theme }) => (error ? theme.color.error : theme.color.primary)};
  margin: ${({ theme }) => -theme.space.medium}px ${({ theme }) => -theme.space.content}px;
  height: 100%;
  min-height: 0;
  font-family: ${({ theme }) => theme.font.family.code};
  border-radius: 0;
  border-color: transparent;
  background-color: ${({ error, theme }) => (error ? setAlpha(0.2)(theme.color.error) : theme.color.white)};
  color: ${({ error, theme }) => (error ? theme.color.error : theme.color.primary)};
  font-weight: ${({ error, theme }) => (error ? theme.font.weight.bold : theme.font.weight.regular)};
  :focus {
    border-color: transparent;
    box-shadow: none;
    outline: 1px solid ${({ error, theme }) => (error ? theme.color.error : theme.color.primary)};
    outline-offset: 0;
  }
  ::placeholder {
    color: inherit;
  }
` as typeof Input

export const DataTableInput: React.FC<InputProps> = ({ copy, ...props }) => (
  <StyledInput
    {...props}
    errorComponent={({ errorMessage }) => <Tooltip position="bottom">{errorMessage}</Tooltip>}
    fullWidth
    {...props}
  />
)

export default DataTableInput
