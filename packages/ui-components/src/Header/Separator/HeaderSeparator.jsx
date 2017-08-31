// @flow
import React from "react"
import type { Node } from "react"
import glamorous from "glamorous"

type Props = {
  className: string,
}

const HeaderSeparator = ({ className }: Props): Node => <div className={className} />,
  style = ({ theme }: { theme: THEME }): {} => ({
    width: 5,
    height: 5,
    margin: `0 ${theme.spacing}px`,
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  })

export default glamorous(HeaderSeparator)(style)
export { HeaderSeparator }
