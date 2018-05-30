import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: any
  className?: string
  /** Children, typically a single string serving as a title. A controls element such as a condensed works well as a second child. */
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  ...theme.typography.heading1,
  label: "cardheader",
  display: "flex",
  alignItems: "center",
  /** @todo Add to theme once colors are updated across codebase */
  backgroundColor: "#F9F9F9",
  /** @todo Add to theme once colors are updated across codebase */
  color: "#747474",
  // This ensures that the card header text and card controls are placed in opposite corners.
  justifyContent: "space-between",
  height: 2 * theme.spacing,
  margin: -theme.spacing,
  marginBottom: theme.spacing,
  padding: `0 ${theme.spacing}px`,
  lineHeight: 1,
}))

const CardHeader = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default CardHeader
