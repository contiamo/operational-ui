import * as React from "react"
import { SFC } from "react"
import glamorous from "glamorous"

type Props = { className: string; theme: Theme; children: React.ReactNode }

const style: {} = ({ theme }: Props) => ({
  ...theme.typography.title,
  marginRight: theme.spacing
})

const HeaderTitle: SFC = ({ className, children }: Props) => <div className={className}>{children}</div>

export default glamorous(HeaderTitle)(style)
export { HeaderTitle }
