import * as React from "react"

import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "contiamo-ui-theme"

export interface IProps {
  css?: any
  className?: string
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  width: 5,
  height: 5,
  margin: `0 ${theme.spacing}px`,
  borderRadius: "50%",
  backgroundColor: "rgba(0, 0, 0, 0.2)"
}))

const HeaderSeparator: React.SFC<IProps> = ({ css, className }: IProps) => <Container css={css} className={className} />

export default HeaderSeparator
