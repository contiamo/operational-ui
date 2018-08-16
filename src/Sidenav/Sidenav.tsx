import * as React from "react"

import { DefaultProps } from "../types"
import { readableTextColor } from "../utils"
import styled from "../utils/styled"

export interface SidenavProps extends DefaultProps {
  children: React.ReactElement<any> | Array<React.ReactElement<any>>
  /** Show the sidebar in compact mode */
  compact?: boolean
}

export interface State {
  isHovered: boolean
}

const Container = styled("div")<{ compact?: SidenavProps["compact"] }>(({ theme, compact }) => {
  const backgroundColor = theme.color.white
  const color = readableTextColor(backgroundColor, [theme.color.text.default, theme.color.white])
  return {
    color,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    overflow: "auto",
    width: compact ? theme.compactSidebarWidth : theme.sidebarWidth,
    height: "100%",
    borderRight: "1px solid",
    borderRightColor: theme.color.separators.default,
    background: theme.color.white,
  }
})

const Sidenav: React.SFC<SidenavProps> = ({ children, ...props }) => (
  <Container {...props}>
    {React.Children.map(children, child => {
      const dudeMyChildIsAnElementJustLetMeUseItUgh = child as React.ReactElement<any>
      return {
        ...dudeMyChildIsAnElementJustLetMeUseItUgh,
        props: { ...dudeMyChildIsAnElementJustLetMeUseItUgh.props, compact: props.compact },
      }
    })}
  </Container>
)

export default Sidenav
