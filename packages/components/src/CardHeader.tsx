import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  id?: string | number
  css?: any
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  ...theme.typography.heading1,
  label: "cardheader",
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.colors.cardHeaderBackground,
  // This ensures that the card header text and card controls are placed in opposite corners.
  justifyContent: "space-between",
  height: 3 * theme.spacing,
  margin: -theme.spacing,
  marginBottom: theme.spacing,
  padding: `0 ${theme.spacing}px`,
  lineHeight: 1,
  color: theme.colors.emphasizedText
}))

const CardHeader = (props: Props) => (
  <Container key={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default CardHeader
