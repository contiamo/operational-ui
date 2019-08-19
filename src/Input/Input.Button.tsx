import * as React from "react"
import CopyToClipboard from "react-copy-to-clipboard"

import OperationalContext from "../OperationalContext/OperationalContext"
import { inputFocus } from "../utils"
import styled from "../utils/styled"
import { height } from "./Input.constants"
import { IconComponentType, CopyIcon } from "../Icon"

interface InputButtonBaseProps {
  onIconClick?: () => void
  tabIndex?: number
}

interface InputButtonPropsWithoutCopy extends InputButtonBaseProps {
  copy: false
  icon: IconComponentType | React.ReactNode
  value?: never
}

interface InputButtonPropsWithCopy extends InputButtonBaseProps {
  copy: true
  icon?: never
  value: string
}

export type InputButtonProps = InputButtonPropsWithoutCopy | InputButtonPropsWithCopy

const Button = styled("button")`
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
  outline: none;
  /* Don't respond to children's pointer-events */
  * {
    pointer-events: none;
  }
  ${({ theme }) => `
    background-color: ${theme.color.background.lighter};
    border-top-left-radius: ${theme.borderRadius}px;
    border-bottom-left-radius: ${theme.borderRadius}px;
    box-shadow: 0 0 0 1px ${theme.color.border.default};
    border:none;
    color: ${theme.color.text.light};
    :focus {
     ${inputFocus({ theme })},
    }
    :hover {
      background-color: ${theme.color.background.light};
    }
  `};
`

const InputButton: React.SFC<InputButtonProps> = ({ tabIndex, icon: Icon, copy, value, onIconClick }) => {
  if (!Icon && !copy) {
    return null
  }

  return copy === true ? (
    <OperationalContext>
      {({ pushMessage }) => (
        <CopyToClipboard text={value || ""} onCopy={() => pushMessage({ body: "Copied to clipboard", type: "info" })}>
          <Button tabIndex={tabIndex}>
            <CopyIcon size={16} />
          </Button>
        </CopyToClipboard>
      )}
    </OperationalContext>
  ) : (
    <Button onClick={onIconClick}>
      {typeof Icon === "function" ? React.createElement(Icon as IconComponentType, { size: 16 }) : Icon}
    </Button>
  )
}

export default InputButton
