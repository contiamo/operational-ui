import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"

import CardHeader from "./CardHeader"
import { Theme } from "../theme"

export interface IProps {
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

const Card: React.SFC<IProps> = ({ css, className, children, width, padding }) => (
  <Container css={css} width={width} padding={padding} className={className}>
    {children}
  </Container>
)

export default Card
export { CardHeader }
