import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  /** DOM id attribute, useful for hash linking */
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  label: "card",
  padding: theme.spacing,
  boxShadow: theme.shadows.card,
  backgroundColor: theme.colors.white,
  "& > img": {
    maxWidth: "100%",
  },
}))

const Card = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Card
