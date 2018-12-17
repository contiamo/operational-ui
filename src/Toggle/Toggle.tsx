import * as React from "react"

import { darken } from "../utils"
import styled from "../utils/styled"

export interface Value {
  label: React.ReactNode
  value: string
}

export interface ToggleProps {
  /** Options available */
  options: [Value, Value]
  /** Current value */
  value: Value["value"]
  /** Callback trigger on any changes */
  onChange: (newValue: Value["value"]) => void
  /** Condensed option */
  condensed?: boolean
}

const Container = styled("div")`
  > :not(:last-child) {
    margin-right: 0;
    border-radius: ${({ theme: { borderRadius } }) => `${borderRadius}px 0 0 ${borderRadius}px`};
  }

  > :not(:first-child) {
    left: -2px; /* Merge buttons */
    border-radius: ${({ theme: { borderRadius } }) => `0 ${borderRadius}px ${borderRadius}px 0`};
  }
`

const Button = styled("div")<{ selected: boolean; condensed?: boolean }>`
  line-height: ${props => (props.condensed ? 28 : 36)}px;
  font-size: ${props => props.theme.font.size.small}px;
  font-weight: ${props => props.theme.font.weight.medium};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius}px;
  border: 0;
  cursor: pointer;
  outline: none;
  margin-right: ${props => props.theme.space.small}px;
  background-color: ${props => (props.selected ? darken(props.theme.color.white, 5) : props.theme.color.white)};
  padding: 0 ${props => props.theme.space.element}px;
  color: ${props => (props.selected ? props.theme.color.primary : props.theme.color.text.default)};
  box-shadow: ${({ selected, condensed, theme: { color } }) => {
    const originalBoxShadow = `0 0 0 1px ${color.border.disabled} inset`
    if (selected) {
      const innerShadow = condensed ? `0 0 5px 1px #B1B1B1 inset` : `0 0 7px 1px #B1B1B1 inset`
      return `${originalBoxShadow}, ${innerShadow};`
    }
    return originalBoxShadow
  }};

  :hover {
    background-color: ${props => darken(props.theme.color.white, 5)};
  }
`

const Toggle: React.SFC<ToggleProps> = props => (
  <Container>
    {props.options.map(item => (
      <Button
        selected={item.value === props.value}
        condensed={props.condensed}
        key={item.value}
        onClick={() => props.onChange(item.value)}
      >
        {item.label}
      </Button>
    ))}
  </Container>
)

export default Toggle
