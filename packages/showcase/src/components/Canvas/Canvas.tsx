import * as React from "react"
import glamorous from "glamorous"

import { Card } from "contiamo-ui-components"

type Props = { className?: string; children: React.ReactNode }

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  display: "flex",
  alignItems: "flex-start",
  flexBasis: "100%",
  marginLeft: theme.spacing * 4 / 3,
  maxHeight: "100%",

  "& > *": {
    width: "100%",
    maxWidth: 800
  },

  "& a:link, & a:visited": {
    color: theme.colors.palette.info
  },

  "& a:hover": {
    color: theme.colors.palette.success
  }
}))

const Canvas = ({ children }: Props) => (
  <Container>
    {children}
  </Container>
)

export default Canvas
