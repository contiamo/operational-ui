import * as React from "react"
import { SFC } from "react"

import glamorous from "glamorous"

type Props = {
  className?: string
  children: React.ReactNode
  theme?: Theme
  id?: string
}

const style: {} = ({ theme }: Props) => ({
  margin: theme.spacing * -1,
  marginBottom: 16,
  padding: theme.spacing,
  borderBottom: "1px solid",
  borderColor: theme.colors.grey10,
  fontWeight: 700,
  lineHeight: 1,

  "* + &": {
    marginTop: theme.spacing
  }
})

const CardHeader: SFC<Props> = ({ className, children, id }: Props) => (
  <div id={id} className={className}>
    {children}
  </div>
)

export default glamorous(CardHeader)(style)
