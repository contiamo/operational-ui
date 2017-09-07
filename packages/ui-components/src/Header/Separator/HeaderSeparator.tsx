import * as React from "react"
import { SFC } from "react"
import Theme from "types/theme"
import glamorous from "glamorous"

type Props = {
  className: string
  theme: Theme
}

const HeaderSeparator: SFC<Props> = ({ className }: Props) => <div className={className} />,
  style: {} = ({ theme }: Props) => ({
    width: 5,
    height: 5,
    margin: `0 ${theme.spacing}px`,
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  })

export default glamorous(HeaderSeparator)(style)
export { HeaderSeparator }
