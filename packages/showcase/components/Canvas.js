import * as React from "react"
import glamorous from "glamorous"

import { Card } from "@operational/components"
import { Theme } from "@operational/theme"
import { darken } from "@operational/utils"


const Container = glamorous.div(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  flexBasis: "100%",
  height: "100%",
  maxHeight: "100%",

  "& > *": {
    overflow: "auto",
    width: "100%",
    height: "100%"
  },

  "& a:link, & a:visited": {
    color: theme.colors.info
  },

  "& a:hover": {
    color: darken(theme.colors.info)(5)
  },

  "& p": {
    maxWidth: 670
  }
}))

const Canvas = ({ children }) => <Container>{children}</Container>

export default Canvas
