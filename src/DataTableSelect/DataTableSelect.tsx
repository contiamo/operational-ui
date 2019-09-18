import * as React from "react"
import Select from "../Select/Select"
import { SelectProps } from "../Select/Select.types"
import styled from "../utils/styled"

const StyledSelect = styled(Select)`
  margin: ${({ theme }) => -theme.space.medium}px ${({ theme }) => -theme.space.content}px;
  height: 100%;
  min-height: 0;
  border: 0;
  font-weight: ${({ theme }) => theme.font.weight.regular};
  width: calc(100% + ${({ theme }) => theme.space.content * 2}px); /* 2 for left _and_ right. */
  border-radius: 0;

  [role="listbox"] > div:nth-of-type(2) {
    box-shadow: 0 4px 9px 2px rgba(0, 0, 0, 0.3);
  }

  input {
    border: 0;
  }

  [role="button"] {
    border-left: 0;
  }
`

export const DataTableSelect: React.FC<SelectProps> = props => <StyledSelect fullWidth {...props} />

export default DataTableSelect
