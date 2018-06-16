import * as React from "react"
import styled from "react-emotion"
import { WithTheme, Css } from "../types"
export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */

  css?: Css
  className?: string
  children?: React.ReactNode
}
const Container = styled("div")(
  ({ theme }: WithTheme): {} => ({
    label: "sidebar",
    width: "100%",
    maxWidth: 280,
    maxHeight: "100%",
    boxShadow: theme.deprecated.shadows.card,
    position: "relative",
    overflow: "hidden",
    scrollBehavior: "smooth",
    // future-proof
    color: theme.deprecated.colors.text,
    "& a:link, & a:visited": {
      width: "100%",
      display: "block",
      textDecoration: "none",
      color: "inherit",
    },
  }),
)

const Sidebar = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Sidebar
