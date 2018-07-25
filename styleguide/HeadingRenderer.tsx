import * as React from "react"
import { Heading1, Heading2, Title } from "../src"

export interface HeadingRendererProps {
  level: number
  children: React.ReactNode | React.ReactNode[]
}

const HeadingRenderer: React.SFC<HeadingRendererProps> = ({ level, children, ...props }) => {
  const Tag = (() => {
    switch (level) {
      case 1:
        return Title
      case 2:
        return Heading1
      case 3:
        return Heading2
      default:
        return Heading2
    }
  })()

  return <Tag {...props}>{children}</Tag>
}

export default HeadingRenderer
