import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  id?: string
  css?: any
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  ...theme.typography.heading1,
  label: "cardheader",
  display: "flex",
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  alignItems: "center",
  backgroundColor: theme.colors.lighterBackground,
  // This ensures that the card header text and card controls are placed in opposite corners.
  justifyContent: "space-between",
  height: 2 * theme.spacing,
  margin: -theme.spacing,
  marginBottom: theme.spacing,
  padding: `0 ${theme.spacing}px`,
  lineHeight: 1,
  color: theme.colors.text,
}))

const CardHeader = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default CardHeader
