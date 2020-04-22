import * as React from "react"

import { DefaultProps } from "../types"
import { customScrollbar } from "../utils"
import styled from "../utils/styled"
import { getDarkLightTheme } from "../utils/constants"

export interface SidenavProps extends DefaultProps {
  /** Show the sidebar in compact mode */
  compact?: boolean
  /** Render a dark sidenav */
  dark?: boolean
}

export interface State {
  isHovered: boolean
}

const Container = styled("div")<SidenavProps>(({ theme, compact, dark }) => {
  const darkLightTheme = getDarkLightTheme(theme, dark)
  return {
    color: darkLightTheme.fg,
    backgroundColor: darkLightTheme.bg,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    overflow: "auto",
    width: compact ? theme.compactSidebarWidth : theme.sidebarWidth,
    height: "100%",
    ...(!dark && {
      borderRight: `2px solid ${darkLightTheme.border}`,
    }),

    ".operational-ui__sidenav-item_end": {
      marginTop: "auto",
    },

    ".operational-ui__sidenav-item_end + .operational-ui__sidenav-item_end": {
      marginTop: 0,
    },

    ...customScrollbar({ theme, dark }),
  }
})

const Sidenav: React.SFC<SidenavProps> = ({ children, ...props }) => (
  <Container {...props}>
    {React.Children.map(children, child => {
      if (!child) {
        return
      }
      // see line 8 for the safety of this assertion
      const childElement = child as React.ReactElement<any>
      return {
        ...childElement,
        props: { ...childElement.props, compact: props.compact, dark: props.dark },
      }
    })}
  </Container>
)

export default Sidenav
