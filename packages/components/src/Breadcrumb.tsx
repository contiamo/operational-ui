import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  className?: string
  css?: {}
  children?: React.ReactNode
}

const Container = glamorous.span(({ theme }: { theme: Theme }): {} => ({
  color: theme.colors.linkText,
  borderBottom: `1px solid ${theme.colors.linkText}`,
  "& a": {
    textDecoration: "none",
    color: "inherit"
  }
}))

export default (props: IProps) => (
  <Container className={props.className} css={props.css}>
    {props.children}
  </Container>
)
