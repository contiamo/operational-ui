import * as React from "react"

export interface SectionHeadingRendererProps {
  children: React.ReactNode
  toolbar: React.ReactNode
  depth: number
}

const SectionHeadingRenderer: React.SFC<SectionHeadingRendererProps> = ({ children, depth }) => null

export default SectionHeadingRenderer
