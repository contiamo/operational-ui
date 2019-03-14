import { keyframes } from "@emotion/core"
import uniqueId from "lodash/uniqueId"
import * as React from "react"

import styled from "../utils/styled"

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
const Input = styled("input")`
  position: absolute;
  left: -9999px;

  :checked + label::after {
    content: "";
    display: block;
    width: 5px;
    height: 10px;
    position: absolute;
    left: 7px;
    margin: 0 auto;
    top: 2px;
    transform: rotate(45deg);
    border-right: 2px solid ${props => props.theme.color.primary};
    border-bottom: 2px solid ${props => props.theme.color.primary};
    cursor: pointer;
    animation: ${toggleCheckboxAnimation} 0.2s ease forwards;
  }

  :disabled + label {
    cursor: not-allowed;
    pointer-events: none;
  }
`

const Label = styled("label")`
  position: relative;
  cursor: pointer;
  height: 20px;
  display: block;
  margin-bottom: 10px;
  padding-left: 32px;
  line-height: 20px;
  user-select: none;

  font-size: ${props => props.theme.font.size}px;
  color: ${props => props.theme.color.text.default};

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
    width: 18px;
    height: 18px;
    border-radius: ${props => props.theme.borderRadius}px;
    background-color: #f2f2f2;
    border: solid 1px #c0c0c0;
  }
`

export interface CheckboxProps {
  /** The current value of the checkbox */
  value?: boolean
  /** Callback called when the checkbox changes */
  onChange?: (value: boolean) => void
  /** The label of the checkbox */
  label: string
  /** Disabled input */
  disabled?: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({ value, onChange, label, disabled, ...props }) => {
  const uuid = uniqueId("checkbox_")

  return (
    <div style={disabled ? { opacity: 0.6 } : {}}>
      <Input
        id={uuid}
        type="checkbox"
        checked={Boolean(value)}
        onChange={() => (onChange ? onChange(!value) : undefined)}
        disabled={disabled}
        {...props}
      />
      <Label htmlFor={uuid}>{label}</Label>
    </div>
  )
}

Checkbox.defaultProps = {
  value: false,
}

export default Checkbox
