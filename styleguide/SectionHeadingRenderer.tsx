import * as React from "react"
import styled from "../src/utils/styled"

import { CardHeader } from "../src"

export interface SectionHeadingRendererProps {
  children: React.ReactNode
  toolbar: React.ReactNode
  depth: number
}

/**
 * This restyling is necessary because cards and card headers need to be separate in
 * styleguidist's setup, which requires them to be included as children as opposed to
 * being `title`'s.
 */
const StyledCardHeader = styled(CardHeader)`
  margin: -20px -20px 20px -20px;
`

const SectionHeadingRenderer: React.SFC<SectionHeadingRendererProps> = ({ children, toolbar, depth }) =>
  depth > 1 ? <StyledCardHeader action={toolbar}>{children}</StyledCardHeader> : null

export default SectionHeadingRenderer
