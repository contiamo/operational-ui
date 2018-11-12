import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface CardColumnProps extends DefaultProps {
  /** Column title */
  title?: string
  /** Align the content to the right */
  contentRight?: boolean
  /** Set the component as a flex-box column */
  flexColumn?: boolean
}

const Container = styled("div")<CardColumnProps>(({ theme, contentRight, flexColumn }) => ({
  label: "card-column",
  height: "min-content",
  minWidth: 280 / 2,
  padding: theme!.space.element / 2,
  flex: "1 0",
  " img": {
    maxWidth: "100%",
  },
  textAlign: contentRight ? "right" : "left",
  ...(flexColumn
    ? {
        display: "flex",
        flexDirection: "column",
        justifyContent: contentRight ? "flex-end" : "flex-start",
      }
    : {}),
}))

const Title = styled("div")(({ theme }) => ({
  fontFamily: theme.font.family.main,
  fontWeight: theme.font.weight.medium,
  color: theme.color.text.dark,
  fontSize: theme.font.size.body,
  borderBottom: `1px solid ${theme.color.separators.default}`,
  paddingBottom: theme.space.small,
  marginBottom: theme.space.content,
}))

const CardColumn: React.SFC<CardColumnProps> = ({ title, children, ...props }) => (
  <Container {...props}>
    {title && <Title>{title}</Title>}
    {children}
  </Container>
)

export default CardColumn
