import * as React from "react"
import glamorous from "glamorous"

interface IProps {
  style?: any
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  ...theme.typography.title,
  marginRight: theme.spacing
}))

const HeaderTitle: React.SFC = ({ style, className, children }: IProps) => (
  <Container style={style} className={className}>
    {children}
  </Container>
)

export default HeaderTitle
