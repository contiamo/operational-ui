import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  id?: string | number
  css?: any
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }) => ({
  label: "card",
  padding: theme.spacing * 4 / 3,
  boxShadow: theme.shadows.card,
  backgroundColor: theme.colors.cardBackground,
  "& > img": {
    maxWidth: "100%"
  }
}))

export default (props: IProps) => (
  <Container key={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)
