import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  className?: string
  css?: {}
  children?: React.ReactNode
}

const Container = glamorous.div({
  label: "breadcrumbs",
  "& a": {
    textDecoration: "none",
    color: "inherit",
  },
})

const Slash = glamorous.span(({ theme }: { theme: Theme }): {} => ({
  display: "inline-block",
  margin: `0 ${theme.spacing / 2}px`,
  color: theme.colors.gray,
}))

/*
 * Intersperse slash elements between children.
 * Curried first argument is used as an incremented index for keys.
 */
const intersperseSlashes = (index: number) => ([head, ...tail]: React.ReactNode[]): React.ReactNode[] =>
  head ? [<Slash key={`breadcrumbdivider-${index}`}>{"/"}</Slash>, head, ...intersperseSlashes(index + 1)(tail)] : []

const Breadcrumbs = (props: Props) => (
  <Container className={props.className} css={props.css}>
    {intersperseSlashes(0)(React.Children.toArray(props.children))}
  </Container>
)

export default Breadcrumbs
