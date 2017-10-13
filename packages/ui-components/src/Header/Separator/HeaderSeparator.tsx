import * as React from "react"

import glamorous from "glamorous"

interface IProps {
  style?: any
  className?: string
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  width: 5,
  height: 5,
  margin: `0 ${theme.spacing}px`,
  borderRadius: "50%",
  backgroundColor: "rgba(0, 0, 0, 0.2)"
}))

const HeaderSeparator: React.SFC<IProps> = ({ style, className }: IProps) => <div style={style} className={className} />

export default HeaderSeparator
