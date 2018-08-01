import * as React from "react"
import { CardHeader } from "../src"

export interface SectionHeadingRendererProps {
  children: React.ReactNode
  toolbar: React.ReactNode
  depth: number
}

const SectionHeadingRenderer: React.SFC<SectionHeadingRendererProps> = ({ children, toolbar, depth }) =>
  depth > 1 ? <CardHeader action={toolbar}>{children}</CardHeader> : null

export default SectionHeadingRenderer
