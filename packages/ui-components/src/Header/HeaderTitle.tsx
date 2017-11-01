import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "../theme"

export interface IProps {
  css?: any
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  ...theme.typography.title,
  marginRight: theme.spacing
}))

const HeaderTitle: React.SFC = ({ css, className, children }: IProps) => (
  <Container css={css} className={className}>
    {children}
  </Container>
)

export default HeaderTitle
