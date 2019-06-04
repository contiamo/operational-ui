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
  /** Click and key press handler */
  onClick?: () => void
  /** makes button smaller, as well changes background and border 🤷 */
  inline?: boolean
  /** makes button to use primary color, can be used for main action on the page */
  primary?: boolean
}

const TopbarButtonContainer = styled("button")<{ disabled?: boolean; inline?: boolean; primary?: boolean }>`
  height: ${({ inline }) => (inline ? "36px" : "100%")};
  border-radius: ${({ inline, theme }) => (inline ? theme.borderRadius : "0")}px;
  padding: 0px ${({ inline, theme }) => (inline ? theme.space.element : theme.space.medium)}px;
  border: ${({ inline, primary, theme }) => (inline && !primary ? `1px solid ${theme.color.text.dark}` : "none")};
  background: ${({ inline, primary, theme }) =>
    primary ? theme.color.primary : inline ? theme.color.white : "transparent"};
  color: ${({ inline, primary, theme }) =>
    primary ? theme.color.white : inline ? theme.color.text.dark : theme.color.text.lighter};
  display: flex;
  align-items: center;
  cursor: ${props => (props.disabled ? "auto" : "pointer")};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  font-size: ${props => props.theme.font.size.small}px;
  & svg {
    /** Icons are purely presentational and click events are handled upstream */
    pointer-events: none;
  }
`

const TopbarButton: React.SFC<TopbarButtonProps> = ({ children, icon: Icon, onClick, ...props }) => (
  <TopbarButtonContainer
    {...props}
    onClick={props.disabled ? undefined : onClick}
    aria-disabled={props.disabled}
    tabIndex={props.disabled ? -1 : undefined}
  >
    {children}
    {Icon && <Icon right size={12} />}
  </TopbarButtonContainer>
)

export default TopbarButton
