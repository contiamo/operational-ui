import * as React from "react"
import { SFC } from "react"

import glamorous from "glamorous"

type Props = {
  className?: string
  children: React.ReactNode
  theme?: Theme
  id?: string
}

const CardHeader: SFC<Props> = ({ className, children, id }: Props) =>
    <div id={id} className={className}>
      {children}
    </div>,
  style: {} = ({ theme }: Props) => ({
    margin: theme.spacing ? theme.spacing * -1 : -16,
    marginBottom: 16,
    padding: theme.spacing ? theme.spacing : 16,
    borderBottom: "1px solid",
    borderColor: theme.greys ? theme.greys["10"] : "#f5f5f5",
    fontWeight: 700,
    lineHeight: 1,

    "* + &": {
      marginTop: theme.spacing ? theme.spacing : 16,
    },
  })

export default glamorous(CardHeader)(style)
