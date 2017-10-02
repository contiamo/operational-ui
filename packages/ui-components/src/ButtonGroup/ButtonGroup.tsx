import * as React from "react"

import glamorous from "glamorous"

interface Props {
  className?: string
  children?: any
  style: any
}

const Container = glamorous.div(({ theme }: { theme: Theme }) => ({
  "& > *": {
    margin: 0,
    borderRadius: 0
  },
  "& > *:first-child": {
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2
  },
  "& > *:last-child": {
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2
  }
}))

const ButtonGroup: React.SFC<Props> = ({ children, style }: Props) => <Container style={style}>{children}</Container>

export default ButtonGroup
