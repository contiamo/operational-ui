import * as React from "react"
import glamorous from "glamorous"

import CardHeader from "./Header/CardHeader"

interface IProps {
  style?: any
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

const Card: React.SFC<IProps> = ({ style, className, children, width, padding }) => (
  <Container style={style} width={width} padding={padding} className={className}>
    {children}
  </Container>
)

export default Card
export { CardHeader }
