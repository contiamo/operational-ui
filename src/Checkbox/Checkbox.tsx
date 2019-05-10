import { keyframes } from "@emotion/core"
import uniqueId from "lodash/uniqueId"
import * as React from "react"

import styled from "../utils/styled"

export interface CheckboxProps {
  /** The current value of the checkbox */
  value?: boolean
  /** Callback called when the checkbox changes */
  onChange?: (value: boolean) => void
  /** The label of the checkbox */
  label: string
  /** Disabled input */
  disabled?: boolean
  /** Shall we make ourselves smaller? */
  condensed?: boolean
}

const toggleCheckboxAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.6) rotate(45deg);
  }

  70% {
    opacity: 1;
    transform: scale(1.1) rotate(45deg);
  }
  
  100% {
    transform: scale(1) rotate(45deg);
  }
`

// ref: https://codersblock.com/blog/checkbox-trickery-with-css/
const Input = styled("input")<{ condensed: CheckboxProps["condensed"] }>`
  position: absolute;
  left: -100vw;

  :checked + label::after {
    content: "";
    display: block;
    width: ${({ condensed }) => (condensed ? 4 : 5)}px;
    height: ${({ condensed }) => (condensed ? 6 : 11)}px;
    position: absolute;
    left: ${({ condensed }) => (condensed ? 3 : 6)}px;
    margin: 0 auto;
    top: 1px;
    transform: rotate(45deg);
    border-right: ${({ condensed, theme }) => `${condensed ? 1 : 2}px solid ${theme.color.primary}`};
    border-bottom: ${({ condensed, theme }) => `${condensed ? 1 : 2}px solid ${theme.color.primary}`};
    cursor: pointer;
    animation: ${toggleCheckboxAnimation} 0.2s ease forwards;
  }

  :disabled + label {
    cursor: not-allowed;
    pointer-events: none;
  }
`

const Label = styled("label")<{ condensed: CheckboxProps["condensed"] }>`
  position: relative;
  cursor: pointer;
  height: ${({ condensed }) => (condensed ? 13 : 20)}px;
  display: block;
  margin-bottom: ${({ theme, condensed }) => (condensed ? 0 : theme.space.small)}px;
  padding-left: ${({ condensed }) => (condensed ? 18 : 32)}px;
  line-height: ${({ condensed }) => (condensed ? 13 : 20)}px;
  user-select: none;
  font-size: ${({ theme, condensed }) => (condensed ? theme.font.size.small : theme.font.size.body)}px;
  font-weight: 400;

  :hover {
    color: ${props => props.theme.color.primary};

    ::before {
      border: solid 1px ${props => props.theme.color.primary};
    }
  }

  ::before {
    content: "";
    cursor: pointer;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: ${({ condensed }) => (condensed ? 10 : 18)}px;
    height: ${({ condensed }) => (condensed ? 10 : 18)}px;
    border-radius: ${props => props.theme.borderRadius}px;
    background-color: #f2f2f2;
    border: solid 1px #c0c0c0;
  }
`

const Checkbox: React.FC<CheckboxProps> = ({ value, onChange, label, disabled, condensed, ...props }) => {
  const uuid = uniqueId("checkbox_")

  return (
    <div style={disabled ? { opacity: 0.6 } : {}}>
      <Input
        condensed={condensed}
        id={uuid}
        type="checkbox"
        checked={Boolean(value)}
        onChange={() => (onChange ? onChange(!value) : undefined)}
        disabled={disabled}
        {...props}
      />
      <Label condensed={condensed} htmlFor={uuid}>
        {label}
      </Label>
    </div>
  )
}

Checkbox.defaultProps = {
  value: false,
}

export default Checkbox
