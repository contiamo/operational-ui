import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"

interface ShaProps {
  short?: boolean
  children: string
}

const Span = styled("span")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  fontFamily: theme.font.family.code,
}))

const Sha: React.SFC<ShaProps> = ({ children, short }) => <Span>{short ? children.slice(0, 11) : children}</Span>

export default Sha
