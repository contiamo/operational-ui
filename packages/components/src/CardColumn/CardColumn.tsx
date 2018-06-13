import * as React from "react"
import glamorous, { GlamorousComponent, withTheme } from "glamorous"
import { Theme } from "@operational/theme"

import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  /** DOM id attribute, useful for hash linking */
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  children?: React.ReactNode
  /** Column title */
  title?: string
}

const Container = glamorous.div(
  ({ theme }: WithTheme): CssStatic => ({
    label: "card-column",
    flex: "1 0 auto",
    paddingTop: theme.spacing,
    paddingBottom: theme.spacing,
    paddingLeft: theme.spacing * 2,
    paddingRight: theme.spacing * 2,
    "& > img": {
      maxWidth: "100%",
    },
    "&:first-child": {
      paddingLeft: 0,
    },
    "&:last-child": {
      paddingRight: 0,
    },
  }),
)

const Title = glamorous.div(
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.typography.heading1,
    color: "#545454",
    fontSize: 14,
    borderBottom: "1px solid #e8e8e8",
    marginBottom: theme.spacing,
  }),
)

const CardColumn = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    {props.title && <Title>{props.title}</Title>}
    {props.children}
  </Container>
)

export default CardColumn
