import * as React from "react"
import glamorous from "glamorous"
import { Heading2, Body } from "../"
import { WithTheme, CssStatic } from "../types"

export interface Props {
  /** Title of the item */
  title: string
  /** Value of the item */
  value: React.ReactNode
}

const CardItemTitle = glamorous.div(
  ({ theme }: WithTheme): CssStatic => ({
    color: "#909090",
    fontFamily: theme.fontFamily,
    textTransform: "uppercase",
    fontSize: theme.typography.small.fontSize,
  }),
)

const CardItemBody = glamorous.div(
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.typography.body,
    color: "#545454",
    fontFamily: theme.fontFamily,
    fontSize: 14,
    marginTop: 5,
    marginBottom: 16,
  }),
)

const CardItem: React.SFC<Props> = ({ title, value }) => (
  <div>
    <CardItemTitle>{title}</CardItemTitle>
    <CardItemBody>{value}</CardItemBody>
  </div>
)

export default CardItem
