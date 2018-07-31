import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface Props extends DefaultProps {
  /** Title of the item */
  title: string
  /** Value of the item */
  value: React.ReactNode
}

const CardItemTitle = styled("div")(({ theme }) => ({
  color: theme.color.text.lightest,
  fontFamily: theme.font.family.main,
  fontWeight: theme.font.weight.medium,
  fontSize: theme.font.size.fineprint,
  textTransform: "uppercase",
}))

const CardItemBody = styled("div")(({ theme }) => ({
  color: theme.color.text.default,
  fontFamily: theme.font.family.main,
  fontSize: theme.font.size.body,
  marginTop: theme.space.base,
  marginBottom: theme.space.content,
}))

const CardItem: React.SFC<Props> = ({ title, value, children, ...props }) => (
  <div {...props}>
    <CardItemTitle>{title}</CardItemTitle>
    <CardItemBody>{children || value}</CardItemBody>
  </div>
)

export default CardItem
