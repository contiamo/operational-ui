import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  /** DOM id attribute, useful for hash linking */
  id?: string
  /** `css` prop as expected in a glamorous component */

  css?: Css
  className?: string
  children?: React.ReactNode
}

const Container = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    display: "flex",
    justifyContent: "flex-start",
  }),
)

const CardColumn = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default CardColumn
