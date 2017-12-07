import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

import CardHeader from "./CardHeader"

export interface IProps {
  id?: string | number
  css?: any
  className?: string
  children: React.ReactNode
  theme?: Theme
  width?: number
  padding?: number
}

const Container = glamorous.div(({ theme, width, padding }: { theme: Theme; width?: number; padding?: number }) => ({
  width,
  padding: padding || theme.spacing,
  boxShadow: theme.shadows.card,
  backgroundColor: theme.colors.usage.cardBackground,
  color: theme.colors.usage.bodyText,

  "& p": {
    lineHeight: "20px"
  },
  "& > img": {
    maxWidth: "100%"
  }
}))

const Card: React.SFC<IProps> = (props: IProps) => (
  <Container key={props.id} css={props.css} width={props.width} padding={props.padding} className={props.className}>
    {props.children}
  </Container>
)

export default Card
export { CardHeader }
