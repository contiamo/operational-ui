import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  className?: string
  /** `css` prop as expected in a glamorous component */

  css?: Css
  /** Children as `Breadcrumb` elements */

  children?: React.ReactNode
}

const Container = styled("div")({
  label: "breadcrumbs",
  "& a": {
    textDecoration: "none",
    color: "inherit",
  },
})

const Slash = styled("span")(
  ({ theme }: WithTheme): CssStatic => ({
    display: "inline-block",
    margin: `0 ${theme.deprecated.spacing / 2}px`,
    color: theme.deprecated.colors.gray,
    ":first-child": {
      marginLeft: 0,
    },
  }),
)

/**
 * Intersperse slashes between the children (`<Breadcrumb />` elements)
 * Curried first argument is necessary to give unique auto-incrementing
 *  keys to the slash elements.
 */

const intersperseSlashes = (index: number) => ([head, ...tail]: React.ReactNode[]): React.ReactNode[] =>
  head ? [<Slash key={`divider-${index}`}>/</Slash>, head, ...intersperseSlashes(index + 1)(tail)] : []

const Breadcrumbs = (props: Props) => (
  <Container className={props.className} css={props.css}>
    {intersperseSlashes(0)(React.Children.toArray(props.children))}
  </Container>
)

export default Breadcrumbs
