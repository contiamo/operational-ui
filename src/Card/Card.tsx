import * as React from "react"
import { CardHeader, CardItem } from "../"
import { DefaultProps } from "../types"
import deprecate from "../utils/deprecate"
import styled from "../utils/styled"

export interface CardProps<T extends {} = {}> extends DefaultProps {
  /** Any object to show. The key is the title of the data. */
  data?: T
  /**  A function to format keys of `data` */
  keyFormatter?: (key: Extract<keyof T, string>) => string
  /** A key-value object to format values of `data`. */
  valueFormatters?: { [P in Extract<keyof T, string>]?: (value: T[P]) => React.ReactNode }
  /** Sort method for keys. By default, they will be sorted alphabetically as regular JavaScript strings */
  sortKeys?: (a: keyof T, b: keyof T) => number
  /** An ordered array to pick only some keys to display  */
  keys?: Array<Extract<keyof T, string>>
  /** Title of the card */
  title?: React.ReactNode
  /** Component containing buttons/links/actions assigned to the card */
  action?: React.ComponentType
  /** DOM id attribute, useful for hash linking */
  id?: string
  className?: string
  children?: React.ReactNode
}

const Container = styled("div")(({ theme }) => ({
  marginBottom: theme.space.element,
  borderTop: `1px solid ${theme.color.separators.light}`,
  padding: 20,
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.16)",
  backgroundColor: theme.color.white,
  wordWrap: "break-word",
  "& > img": {
    maxWidth: "100%",
  },
}))

const objectKeys = <T extends {}>(x: T) => Object.keys(x) as Array<keyof T>

function Card<T extends {}>(props: CardProps<T>) {
  const { title, keyFormatter, valueFormatters = {}, data, keys, sortKeys, children, action: Action, ...rest } = props
  const _keys = (keys ? keys : objectKeys(data || {})).sort(sortKeys)
  const titles = keyFormatter ? _keys.map(keyFormatter) : _keys
  const values = _keys.map(i => {
    const valueFormatter = valueFormatters[i]
    const value = data ? data[i] : undefined
    return valueFormatter ? valueFormatter(value!) : value
  })

  return (
    <Container {...rest}>
      {(title || Action) && <CardHeader title={title} action={Action && <Action />} />}
      {data && titles.map((cardItemTitle, i) => <CardItem key={i} value={values[i]} title={cardItemTitle} />)}
      {children}
    </Container>
  )
}

const CardWithWarning = deprecate(props => {
  const children = React.Children.toArray((props as any).children)
  const hasCardHeader = children.some((child: any) => child.props && child.props.__isCardHeader)
  if (hasCardHeader) {
    return [
      "<CardHeader/> components are deprecated - use the `title` and `action` props in `<Card/>` to achieve the same behavior.",
    ]
  }
  return []
})(Card)

/** @component */
export default CardWithWarning as typeof Card
