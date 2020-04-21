import * as React from "react"
import styled from "../utils/styled"
import { sidenavBorderColor } from "../utils/constants"

export interface SidenavSeparatorProps {
  dark?: boolean
}

const Container = styled("div")<SidenavSeparatorProps>`
  height: 1px;
  width: 100%;
  background-color: ${({ dark }) => (dark ? "rgba(255,255,255, 0.15)" : sidenavBorderColor)};
  margin: ${({ theme }) => theme.space.content}px 0;
`

export const SidenavSeparator: React.FC<SidenavSeparatorProps> = props => <Container {...props} />

export default SidenavSeparator
