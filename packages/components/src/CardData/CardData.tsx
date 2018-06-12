import * as React from "react"
import { Card, CardHeader, CardItem } from "../"

export interface Props<T = {}> {
  /**
   * Any object to show. The key is the title of the data.
   */
  data: T
  /**
   * A function to format keys of `data`
   */
  keyFormatter?: (key: string) => string
  /**
   * A key-value object to format values of `data`.
   */
  valueFormatters?: { [P in Extract<keyof T, string>]?: (value: string) => React.ReactNode }
  /**
   * An ordered array to pick only some keys to display
   */
  keys?: (Extract<keyof T, string>)[]
  /**
   * Title of the card
   */
  title?: string
}

class CardData<T = {}> extends React.PureComponent<Props<T>> {
  static defaultProps = {
    keyFormatter: (title: string) => title,
  }

  render() {
    const { title, keyFormatter, valueFormatters = {}, data, keys } = this.props

    const _keys = keys ? keys : Object.keys(data)
    const titles = _keys.map(keyFormatter)
    const values = _keys.map(
      (i: Extract<keyof T, string>) => (valueFormatters[i] ? valueFormatters[i](data[i] as any) : data[i]),
    )

    return (
      <Card>
        {title && <CardHeader>{title}</CardHeader>}
        {titles.map((title, i) => <CardItem value={values[i] as any} title={title} />)}
      </Card>
    )
  }
}

export default CardData
