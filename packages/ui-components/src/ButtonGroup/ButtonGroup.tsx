import * as React from "react"

import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "contiamo-ui-theme"

export interface Props {
  css?: any
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }) => ({
  "& > div": {
    margin: 0
  },
  "& > div:not(:first-child)": {
    borderLeft: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  "& > div:not(:last-child)": {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }
}))

const ButtonGroup: React.SFC<Props> = ({ css, children, className }: Props) => (
  <Container css={css} className={className}>
    {children}
  </Container>
)

export default ButtonGroup
