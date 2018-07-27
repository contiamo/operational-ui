import * as React from "react"
import { CardHeader } from "../src"

export interface SectionHeadingRendererProps {
  children: React.ReactNode | React.ReactNode[]
  toolbar: React.ReactNode
  id: string
}

const SectionHeadingRenderer: React.SFC<SectionHeadingRendererProps> = ({ children, toolbar, id }) => (
  <CardHeader id={id} action={toolbar}>
    {children}
  </CardHeader>
)

export default SectionHeadingRenderer
