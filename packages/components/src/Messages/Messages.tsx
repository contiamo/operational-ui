import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "Messages",
  position: "fixed",
  zIndex: theme.baseZIndex + 500,
  bottom: 2 * theme.spacing,
  right: 2 * theme.spacing,
  "& > *": {
    width: 400,
    height: "auto",
    marginTop: theme.spacing / 2,
  },
}))

const Messages = (props: Props) => (
  <Container css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Messages
