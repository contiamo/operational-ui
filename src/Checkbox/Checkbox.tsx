import uniqueId from "lodash/uniqueId"
import * as React from "react"
import { keyframes } from "react-emotion"

import styled from "../utils/styled"

const toggleCheckboxAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50%) scale(0) rotate(45deg);
  }

  70% {
    opacity: 1;
    transform: translateY(-50%) scale(1.2) rotate(45deg);
  }
  
  100% {
    transform: translateY(-50%) scale(1) rotate(45deg);
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
    height: 11px;
    position: absolute;
    left: 7px;
    margin: 0 auto;
    top: 48%;
    transform: translateY(-50%) rotate(45deg);
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
  padding-left: 30px;
  line-height: 20px;
  user-select: none;

  font-size: 12px;
  color: #545454;

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
    width: 20px;
    height: 20px;
    border-radius: 2px;
    background-color: #f2f2f2;
    border: solid 1px #c0c0c0;
  }
`

export interface CheckboxProps {
  /** The current value of the checkbox */
  value: boolean
  /** Callback called when the checkbox changes */
  onChange: (value: boolean) => void
  /** The label of the checkbox */
  label: string
  /** Disabled input */
  disabled?: boolean
}

class Checkbox extends React.Component<CheckboxProps> {
  private uuid = uniqueId("checkbox_")

  public render() {
    const { value, onChange, label, disabled } = this.props

    return (
      <div style={disabled ? { opacity: 0.6 } : {}}>
        <Input
          id={this.uuid}
          type="checkbox"
          checked={Boolean(value)}
          onChange={() => onChange(!value)}
          disabled={disabled}
        />
        <Label htmlFor={this.uuid}>{label}</Label>
      </div>
    )
  }
}

export default Checkbox
