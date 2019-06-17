import React from "react"
import { styled } from "../src"

const Container = styled("iframe")`
  border: 0;
  width: 100%;
  height: 100%;
  border-left: 2px dashed red;
`

const IFrame: React.FC<{ src: string }> = ({ src }) => <Container src={src} />

export default IFrame
