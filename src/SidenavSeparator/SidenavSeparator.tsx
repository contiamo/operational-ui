import * as React from "react"
import styled from "../utils/styled"

export interface SidenavSeparatorProps {
  dark?: boolean
}

const Container = styled("div")<SidenavSeparatorProps>`
  height: 1px;
  width: 100%;
  background-color: ${({ dark }) => `rgba(${dark ? "255,255,255" : "0,0,0"}, 0.14)`};
  margin: ${({ theme }) => theme.space.content}px 0;
`

export const SidenavSeparator: React.FC<SidenavSeparatorProps> = props => <Container {...props} />

export default SidenavSeparator
