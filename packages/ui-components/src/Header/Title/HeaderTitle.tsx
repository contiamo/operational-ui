import * as React from "react"
import { SFC } from "react"
import glamorous from "glamorous"
import Theme from "types/theme"

type Props = { className: string, theme: Theme, children: React.ReactNode }

const HeaderTitle: SFC = ({ className, children }: Props) =>
  <div className={className}>
    {children}
  </div>,
  style: {} = ({ theme }: Props) => ({
    marginRight: theme.spacing,
    fontSize: "1.7rem",
    fontWeight: 600
  })

export default glamorous(HeaderTitle)(style)
export { HeaderTitle }
