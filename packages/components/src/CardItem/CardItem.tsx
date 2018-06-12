import * as React from "react"
import { Heading2, Body } from "../"

export interface Props {
  /** Title of the item */
  title: string
  /** Value of the item */
  value: string
}

const CardItem: React.SFC<Props> = ({ title, value }) => (
  <div>
    <Heading2>{title}</Heading2>
    <Body>{value}</Body>
  </div>
)

export default CardItem
