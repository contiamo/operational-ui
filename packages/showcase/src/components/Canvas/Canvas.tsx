import * as React from "react"
import glamorous from "glamorous"

import { Card, Theme } from "contiamo-ui-components"

interface IProps {
  className?: string
  children: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  display: "flex",
  alignItems: "flex-start",
  flexBasis: "100%",
  marginLeft: theme.spacing * 4 / 3,
  height: "100%",
  maxHeight: "100%",

  "& > *": {
    overflow: "auto",
    width: "100%",
    height: "100%"
  },

  "& a:link, & a:visited": {
    color: theme.colors.palette.info
  },

  "& a:hover": {
    color: theme.colors.palette.success
  },

  "& h4": {
    ...theme.typography.heading2
  },

  "& p": {
    maxWidth: 670
  }
}))

const Canvas: React.SFC<IProps> = ({ children }: IProps) => <Container>{children}</Container>

export default Canvas
