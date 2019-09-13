import * as React from "react"
import styled from "../utils/styled"

const Wrapper = styled("div")`
  height: 36px;
  width: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Line = styled("div")`
  height: 100%;
  width: 1px;
  border: none;
  border-left: 1px solid ${({ theme }) => theme.color.border.invisible};
`

const TopbarSeparator: React.FC<{}> = () => (
  <Wrapper>
    <Line />
  </Wrapper>
)

export default TopbarSeparator
