import * as React from "react"
import styled from "react-emotion"
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

const Container = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    label: "card-column",
    flex: "1 0 auto",
    paddingTop: theme.deprecated.spacing,
    paddingBottom: theme.deprecated.spacing,
    paddingLeft: theme.deprecated.spacing * 2,
    paddingRight: theme.deprecated.spacing * 2,
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

const Title = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.deprecated.typography.heading1,
    color: "#545454",
    fontSize: 14,
    borderBottom: "1px solid #e8e8e8",
    marginBottom: theme.deprecated.spacing,
  }),
)

const CardColumn = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    {props.title && <Title>{props.title}</Title>}
    {props.children}
  </Container>
)

export default CardColumn
