import * as React from "react"

interface ShaProps {
  short?: boolean
  children: string
}

const Sha: React.SFC<ShaProps> = ({ children, short }) => <span>{short ? children.slice(0, 11) : children}</span>

export default Sha
