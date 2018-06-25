import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"

interface ShaProps {
  short?: boolean
  children: string
}

const Sha: React.SFC<ShaProps> = ({ children, short }) => <span>{short ? children.slice(0, 11) : children}</span>

export default Sha
