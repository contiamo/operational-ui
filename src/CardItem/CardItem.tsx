import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface CardItemProps extends DefaultProps {
  /** Title of the item */
  title: string
  /** Value of the item */
  value: React.ReactNode
  /** A flag that sets the value in monospace font, useful for displaying technical values. */
  monospace?: boolean
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

const CardItemBody = styled("div")<{ monospace?: boolean }>(({ theme, monospace }) => ({
  color: theme.color.text.default,
  fontFamily: monospace ? theme.font.family.code : theme.font.family.main,
  fontSize: theme.font.size.body,
  marginTop: theme.space.base,
}))

const CardItem: React.SFC<CardItemProps> = ({ title, value, monospace, children, ...props }) => (
  <Container {...props}>
    <CardItemTitle>{title}</CardItemTitle>
    <CardItemBody monospace={monospace}>{children || value}</CardItemBody>
  </Container>
)

export default CardItem
