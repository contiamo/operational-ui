import * as React from "react"
import { DefaultProps } from "../types"
import { readableTextColor } from "../utils"
import styled from "../utils/styled"

export interface SidenavProps extends DefaultProps {
  children?: React.ReactNode
}

export interface State {
  isHovered: boolean
}

const Container = styled("div")(({ theme }) => {
  const backgroundColor = theme.color.white
  const color = readableTextColor(backgroundColor, [theme.color.text.default, theme.color.white])
  return {
    color,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    overflow: "auto",
    width: theme.sidebarWidth,
    height: "100%",
    borderRight: "1px solid",
    borderRightColor: theme.color.separators.default,
    background: theme.color.white,
  }
})

const Sidenav: React.SFC<SidenavProps> = ({ children, ...props }) => <Container {...props}>{children}</Container>

export default Sidenav
