import * as React from "react"
import styled from "../utils/styled"
import { IconComponentType } from "../Icon/Icon"
import { inputFocus } from "../utils"

export interface TopbarButtonProps {
  /** The name of the button icon */
  icon?: IconComponentType
  /** Button contents, typically as a string */
  children: React.ReactNode
  /** Disabled flag, deactivating click events and fading out the button */
  disabled?: boolean
  /** Click and key press handler */
  onClick?: () => void
  /**
   * `"basic"` - default
   * `"outline"` - make button smaller with border and text of the same color
   * `"filled"` - make button smaller with solid background
   */
  flavor?: "basic" | "outline" | "filled"
}

const TopbarButtonContainer = styled("button")<{ disabled?: boolean; flavor: TopbarButtonProps["flavor"] }>`
  height: ${({ flavor }) => (flavor === "outline" || flavor === "filled" ? "36px" : "100%")};
  border-radius: ${({ flavor, theme }) => (flavor === "outline" || flavor === "filled" ? theme.borderRadius : "0")}px;
  padding: 0px
    ${({ flavor, theme }) =>
      flavor === "outline" || flavor === "filled" ? theme.space.element : theme.space.medium}px;
  border: none;    
  box-shadow ${({ flavor, theme }) => (flavor === "outline" ? ` 0 0 0 1px ${theme.color.text.dark}` : "none")};
  background: ${({ flavor, theme }) =>
    flavor === "filled" ? theme.color.primary : flavor === "outline" ? theme.color.white : "transparent"};
  color: ${({ flavor, theme }) =>
    flavor === "filled" ? theme.color.white : flavor === "outline" ? theme.color.text.dark : theme.color.text.lighter};
  display: flex;
  align-items: center;
  cursor: ${props => (props.disabled ? "auto" : "pointer")};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  font-size: ${props => props.theme.font.size.small}px;
  :focus {
    ${({ theme }) => inputFocus({ theme })};
  }
  & svg {
    /** Icons are purely presentational and click events are handled upstream */
    pointer-events: none;
  }
`

const TopbarButton: React.SFC<TopbarButtonProps> = ({ children, icon: Icon, onClick, flavor, ...props }) => (
  <TopbarButtonContainer
    {...props}
    flavor={flavor}
    onClick={props.disabled ? undefined : onClick}
    aria-disabled={props.disabled}
    tabIndex={props.disabled ? -1 : undefined}
  >
    {children}
    {Icon && <Icon right size={12} />}
  </TopbarButtonContainer>
)

export default TopbarButton
