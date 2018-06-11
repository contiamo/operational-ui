import * as React from "react"

export interface Props {
  /** Title of the item */
  title: string
  /** Value of the item */
  value: string
}

const CardItem: React.SFC<Props> = ({ title, value }) => (
  <div>
    <h1>{title}</h1>
    <p>{value}</p>
  </div>
)

export default CardItem
