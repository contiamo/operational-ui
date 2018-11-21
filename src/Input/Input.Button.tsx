import * as React from "react"
import CopyToClipboard from "react-copy-to-clipboard"

import Icon, { IconName } from "../Icon/Icon"
import OperationalContext from "../OperationalContext/OperationalContext.init"
import styled from "../utils/styled"
import { height } from "./Input.constants"

interface InputButtonBaseProps {
  onIconClick?: () => void
}

interface InputButtonPropsWithoutCopy extends InputButtonBaseProps {
  copy: false
  icon: React.ReactNode | IconName
  value?: never
}

interface InputButtonPropsWithCopy extends InputButtonBaseProps {
  copy: true
  icon?: never
  value: string
}

export type InputButtonProps = InputButtonPropsWithoutCopy | InputButtonPropsWithCopy

const Button = styled("div")`
  width: ${height}px;
  /** Makes sure the button doesn't shrink when inside a flex container */
  flex: 0 0 ${height}px;
  height: ${height}px;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({ theme }) => `
    background-color: ${theme.color.background.lighter};
    border-top-left-radius: ${theme.borderRadius}px;
    border-bottom-left-radius: ${theme.borderRadius}px;
    border: 1px solid;
    border-color: ${theme.color.border.default};
    color: ${theme.color.text.light};
    &:hover {
      background-color: ${theme.color.background.light};
    }
  `};
`

const InputButton: React.SFC<InputButtonProps> = ({ icon, copy, value, onIconClick }) => {
  if (!icon && !copy) {
    return null
  }

  return copy === true ? (
    <OperationalContext>
      {({ pushMessage }) => (
        <CopyToClipboard text={value || ""} onCopy={() => pushMessage({ body: "Copied to clipboard", type: "info" })}>
          <Button>
            <Icon name="Copy" size={16} />
          </Button>
        </CopyToClipboard>
      )}
    </OperationalContext>
  ) : (
    <Button onClick={onIconClick}>
      {typeof icon === "string" ? <Icon name={icon as IconName} size={16} /> : icon}
    </Button>
  )
}

export default InputButton
