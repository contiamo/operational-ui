import * as React from "react"

import glamorous from "glamorous"

interface Props {
  className?: string
  children?: any
  style: any
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

const ButtonGroup: React.SFC<Props> = ({ children, style }: Props) => <Container style={style}>{children}</Container>

export default ButtonGroup
