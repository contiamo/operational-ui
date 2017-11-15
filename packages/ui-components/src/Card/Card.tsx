import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"

import CardHeader from "./CardHeader"
import { Theme } from "contiamo-ui-theme"

export interface IProps {
  key?: string | number
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

const Card: React.SFC<IProps> = ({ key, css, className, children, width, padding }) => (
  <Container key={key} css={css} width={width} padding={padding} className={className}>
    {children}
  </Container>
)

export default Card
export { CardHeader }
