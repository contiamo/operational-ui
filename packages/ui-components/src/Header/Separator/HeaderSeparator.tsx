import * as React from "react"

import glamorous from "glamorous"

type Props = {
  className: string
  theme: Theme
}

const style: {} = ({ theme }: Props) => ({
  width: 5,
  height: 5,
  margin: `0 ${theme.spacing}px`,
  borderRadius: "50%",
  backgroundColor: "rgba(0, 0, 0, 0.2)"
})

const HeaderSeparator: React.SFC<Props> = ({ className }: Props) => <div className={className} />

export default glamorous(HeaderSeparator)(style)
export { HeaderSeparator }
