import * as React from "react"
import { Heading1, Heading2, Title } from "../src"

// export { Title, Heading1, Heading2, Body, Small }

const HeadingRenderer: React.SFC<any> = ({ classes, level, children, ...props }) => {
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
