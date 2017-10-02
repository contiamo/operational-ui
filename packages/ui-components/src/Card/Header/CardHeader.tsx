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
  marginBottom: theme.spacing * 4 / 3,
  padding: `${theme.spacing}px ${theme.spacing}px ${theme.spacing * 5 / 6}px`,
  borderBottom: "1px solid #f2f2f2",
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
