import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface CardItemProps extends DefaultProps {
  /** Title of the item */
  title: string
  /** Value of the item */
  value: React.ReactNode
}

const Container = styled("div")(({ theme }) => ({
  ":not(:last-child)": { marginBottom: theme.space.content },
}))

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
}))

const CardItem: React.SFC<CardItemProps> = ({ title, value, children, ...props }) => (
  <Container {...props}>
    <CardItemTitle>{title}</CardItemTitle>
    <CardItemBody>{children || value}</CardItemBody>
  </Container>
)

export default CardItem
