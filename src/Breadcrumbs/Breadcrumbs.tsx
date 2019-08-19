import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"
import { CaretLeftIcon } from "../Icon"

export interface BreadcrumbsProps extends DefaultProps {
  /** Children as `Breadcrumb` elements */
  children?: React.ReactNode
}

const Container = styled("nav")(({ theme }) => ({
  label: "breadcrumbs",
  color: theme.color.text.action,
  "& > *": {
    verticalAlign: "middle",
  },
}))

const Slash = styled("span")(({ theme }) => ({
  margin: `0 ${theme.space.content}px`,
  color: theme.color.text.lightest,
}))

const addCaret = (item: React.ReactElement) => React.cloneElement(item, { icon: CaretLeftIcon, iconLeft: true })

/**
 * Intersperse slashes between the children (`<Breadcrumb />` elements)
 * Curried first argument is necessary to give unique auto-incrementing
 *  keys to the slash elements.
 */
const intersperseSlashes = (index: number) => ([head, ...tail]: React.ReactNode[]): React.ReactNode[] =>
  head && tail.length
    ? [head, <Slash key={`divider-${index}`}>/</Slash>, ...intersperseSlashes(index + 1)(tail)]
    : [head]

const Breadcrumbs: React.SFC<BreadcrumbsProps> = props => {
  const items = React.Children.toArray(props.children)
  return (
    <Container aria-label="Breadcrumb" {...props}>
      {items.length === 1 ? [addCaret(items[0] as React.ReactElement)] : intersperseSlashes(0)(items)}
    </Container>
  )
}

export default Breadcrumbs
