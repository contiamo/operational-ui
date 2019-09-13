import * as React from "react"
import styled from "../utils/styled"

export interface TopbarProps {
  /** Top bar components on the left side, added as a fragment */
  left?: React.ReactNode
  /** Top bar components on the right side, added as a fragment */
  right?: React.ReactNode
  /** The children prop is ignored for clarity */
  children?: never
}

const TopbarContainer = styled("div")`
  width: 100%;
  height: ${props => props.theme.topbarHeight}px;
  background-color: ${props => props.theme.color.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  border-bottom: 1px solid ${props => props.theme.color.border.invisible};
  border-top: 1px solid ${props => props.theme.color.border.invisible};
  color: ${props => props.theme.color.text.dark};
`

const TopbarSection = styled("div")`
  display: flex;
  height: 100%;
  align-items: center;
`

const Topbar: React.SFC<TopbarProps> = ({ left, right, ...props }) => (
  <TopbarContainer {...props}>
    <TopbarSection>{left}</TopbarSection>
    <TopbarSection>{right}</TopbarSection>
  </TopbarContainer>
)

export default Topbar
