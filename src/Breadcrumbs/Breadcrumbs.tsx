import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"
import Icon from "../Icon/Icon"

export interface BreadcrumbsProps extends DefaultProps {
  /** Children as `Breadcrumb` elements */
  children?: React.ReactNode
}

const Container = styled("div")({
  label: "breadcrumbs",
  verticalSlign: "middle",

  "& > *": {
    display: "inline-block",
  },
  "& a": {
    textDecoration: "none",
    color: "inherit",
  },
})

const Slash = styled("span")(({ theme }) => ({
  display: "inline-block",
  margin: `0 ${theme.space.medium}px`,
  color: theme.color.text.lightest,
  ":first-child": {
    marginLeft: 0,
  },
}))

const flatMap = (nodes: React.ReactNode[], map: (x: React.ReactNode, i: number) => React.ReactNode[]) =>
  nodes.reduce(
    (acc: React.ReactNode[], node, i) => {
      acc.push(...map(node, i))
      return acc
    },
    [] as React.ReactNode[],
  )

/**
 * Intersperse slashes between the children (`<Breadcrumb />` elements)
 * Curried first argument is necessary to give unique auto-incrementing
 *  keys to the slash elements.
 */
const intersperseSlashes = (nodes: React.ReactNode[]) =>
  flatMap(nodes, (node, index) => {
    if (nodes.length === 1) {
      return [
        <Slash key={`divider-${index}`}>
          <Icon name="ChevronLeft" size={12} />
        </Slash>,
        node,
      ]
    } else {
      return index === 0 ? [node] : [<Slash key={`divider-${index}`}>/</Slash>, node]
    }
  })

const Breadcrumbs: React.SFC<BreadcrumbsProps> = props => (
  <Container {...props}>{intersperseSlashes(React.Children.toArray(props.children))}</Container>
)

export default Breadcrumbs
