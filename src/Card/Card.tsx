import * as React from "react"
import { CardHeader, CardItem } from "../"
import styled from "../utils/styled"

export interface Props<T = {}> {
  /** Any object to show. The key is the title of the data. */
  data?: T
  /**  A function to format keys of `data` */
  keyFormatter?: (key: string) => string
  /** A key-value object to format values of `data`. */
  valueFormatters?: { [P in Extract<keyof T, string>]?: (value: string) => React.ReactNode }
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

class Card<T = {}> extends React.PureComponent<Props<T>> {
  public static defaultProps = {
    keyFormatter: (title: string) => title,
  }

  public render() {
    const { title, keyFormatter, valueFormatters = {}, data, keys, children, action: Action, ...props } = this.props

    const _keys = keys ? keys : Object.keys(data || {})
    const titles = keyFormatter ? _keys.map(keyFormatter) : _keys
    const values = _keys.map(
      /**
       * @todo Improve typings: the typing of this does not satisfy the typescript compiler
       * https://github.com/contiamo/operational-ui/issues/629
       */
      // @ts-ignore
      (i: Extract<keyof T, string>) => (valueFormatters[i] ? valueFormatters[i](data[i] as any) : data[i]),
    )

    return (
      <Container {...props}>
        {(title || Action) && <CardHeader title={title} action={Action && <Action />} />}
        {data && titles.map((cardItemTitle, i) => <CardItem key={i} value={values[i]} title={cardItemTitle} />)}
        {children}
      </Container>
    )
  }
}

export default Card
