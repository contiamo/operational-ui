import * as React from "react"

export interface Props<T> {
  /**
   * Any object to show. The key is the title of the data.
   */
  data: T
  /**
   * A function to format any title
   */
  titleFormatter?: (title: string) => string
  /**
   * A key-value object to format any data values.
   */
  valueFormatters?: { [P in keyof T]?: (value: string) => React.ReactNode }
  /**
   * An ordered array to pick only some value to display
   */
  pick?: keyof T[]
}

class CardData<T> extends React.PureComponent<Props<T>> {
  static defaultProps = {
    titleFormatter: (title: string) => title,
  }

  render() {
    // @todo Write an awesome component here
    return <div />
  }
}

export default CardData
