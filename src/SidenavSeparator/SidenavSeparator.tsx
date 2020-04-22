import * as React from "react"
import styled from "../utils/styled"
import { getDarkLightTheme } from "../utils/constants"

export interface SidenavSeparatorProps {
  dark?: boolean
}

const Container = styled("div")<SidenavSeparatorProps>`
  height: 1px;
  width: 100%;
  background-color: ${({ theme, dark }) => getDarkLightTheme(theme, dark).border};
  margin: ${({ theme }) => theme.space.content}px 0;
`

export const SidenavSeparator: React.FC<SidenavSeparatorProps> = props => <Container {...props} />

export default SidenavSeparator
