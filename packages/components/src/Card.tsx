import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  id?: string
  css?: any
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }) => ({
  label: "card",
  padding: theme.spacing,
  borderRadius: 4,
  boxShadow: theme.shadows.card,
  backgroundColor: theme.colors.cardBackground,
  "& > img": {
    maxWidth: "100%"
  }
}))

const Card = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)

export default Card
