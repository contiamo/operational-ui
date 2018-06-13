import * as React from "react"
import glamorous from "glamorous"
import { CardHeader, CardItem } from "../"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props<T = {}> {
  /** Any object to show. The key is the title of the data. */
  data?: T
  /**  A function to format keys of `data` */
  keyFormatter?: (key: string) => string
  /** A key-value object to format values of `data`. */
  valueFormatters?: { [P in Extract<keyof T, string>]?: (value: string) => React.ReactNode }
  /** An ordered array to pick only some keys to display  */
  keys?: (Extract<keyof T, string>)[]
  /** Title of the card */
  title?: React.ReactNode
  /** Component containing buttons/links/actions assigned to the card */
  action?: React.ComponentType
  /** DOM id attribute, useful for hash linking */
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(
  ({ theme }: WithTheme): CssStatic => ({
    label: "card",
    borderTop: "1px solid #ececec",
    padding: 20,
    boxShadow: theme.shadows.card,
    backgroundColor: theme.colors.white,
    "& > img": {
      maxWidth: "100%",
    },
  }),
)

class Card<T = {}> extends React.PureComponent<Props<T>> {
  static defaultProps = {
    keyFormatter: (title: string) => title,
  }

  render() {
    const { title, keyFormatter, valueFormatters = {}, data, keys, id, css, className, children, action } = this.props

    const _keys = keys ? keys : Object.keys(data || {})
    const titles = _keys.map(keyFormatter)
    const values = _keys.map(
      (i: Extract<keyof T, string>) => (valueFormatters[i] ? valueFormatters[i](data[i] as any) : data[i]),
    )

    return (
      <Container id={id} css={css} className={className}>
        {(title || action) && <CardHeader title={title} action={action && <this.props.action />} />}
        {data && titles.map((title, i) => <CardItem value={values[i]} title={title} />)}
        {children}
      </Container>
    )
  }
}

export default Card
