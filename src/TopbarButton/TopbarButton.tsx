import * as React from "react"
import styled from "../utils/styled"
import { IconComponentType } from "../Icon/Icon"

export interface TopbarButtonProps {
  /** The name of the button icon */
  icon?: IconComponentType
  /** Button contents, typically as a string */
  children: React.ReactNode
  /** Disabled flag, deactivating click events and fading out the button */
  disabled?: boolean
  /** Click handler */
  onClick?: () => void
}

const TopbarButtonContainer = styled("div")<{ disabled?: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: ${props => (props.disabled ? "auto" : "pointer")};
  background-color: transparent;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  font-size: ${props => props.theme.font.size.fineprint}px;
  color: ${props => props.theme.color.text.lighter};
  padding: 0px ${props => props.theme.space.medium}px;
  :hover {
    background-color: ${props => (props.disabled ? "transparent" : props.theme.color.background.lighter)};
  }
  & svg {
    /** sIcon are purely presentational and click events are handled upstream */
    pointer-events: none;
  }
`

const TopbarButton: React.SFC<TopbarButtonProps> = ({ children, icon: Icon, onClick, ...props }) => (
  <TopbarButtonContainer onClick={props.disabled ? undefined : onClick} {...props}>
    {children}
    {Icon && <Icon right size={12} />}
  </TopbarButtonContainer>
)

export default TopbarButton
