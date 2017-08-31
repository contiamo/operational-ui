// @flow
import React from "react"
import type { Node } from "react"
import glamorous from "glamorous"

const HeaderTitle = ({ className, children }: { className: string, children: any }): Node =>
    <div className={className}>
      {children}
    </div>,
  style = ({ theme }: { theme: THEME }): {} => ({
    marginRight: theme.spacing,
    fontSize: "1.7rem",
    fontWeight: 600
  })

export default glamorous(HeaderTitle)(style)
export { HeaderTitle }
