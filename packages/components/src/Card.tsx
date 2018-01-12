import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  id?: string | number
  css?: any
  className?: string
  children: React.ReactNode
  theme?: Theme
  width?: number
}

const Container = glamorous.div(({ theme, width, padding }: { theme: Theme; width?: number; padding?: number }) => ({
  width,
  label: "card",
  padding: theme.spacing * 4 / 3,
  boxShadow: theme.shadows.card,
  backgroundColor: theme.colors.cardBackground,

  "& p": {
    lineHeight: "20px"
  },
  "& > img": {
    maxWidth: "100%"
  }
}))

const Card: React.SFC<IProps> = (props: IProps) => (
  <Container key={props.id} css={props.css} width={props.width} className={props.className}>
    {props.children}
  </Container>
)

export default Card
