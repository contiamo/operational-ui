import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "contiamo-ui-theme"

export interface IProps {
  key?: string | number
  css?: any
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  ...theme.typography.title,
  marginRight: theme.spacing
}))

const HeaderTitle: React.SFC = ({ key, css, className, children }: IProps) => (
  <Container key={key} css={css} className={className}>
    {children}
  </Container>
)

export default HeaderTitle
