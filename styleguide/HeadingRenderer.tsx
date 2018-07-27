import * as React from "react"
import { CardColumn, CardColumns } from "../src"

export interface HeadingRendererProps {
  children: string
}

const HeadingRenderer: React.SFC<HeadingRendererProps> = ({ children, ...props }) => (
  <CardColumns {...props}>
    <CardColumn title={children} />
  </CardColumns>
)

export default HeadingRenderer
