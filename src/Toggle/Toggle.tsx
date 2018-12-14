import * as React from "react"

import BaseButton from "../Button/Button"
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

const Button = styled(BaseButton)<{ selected: boolean; condensed?: boolean }>`
  padding: 0 ${props => props.theme.space.element}px;

  ${({ selected, condensed, theme: { color } }) => {
    // box-shadow from Button
    const originalBoxShadow = `0 0 0 1px ${color.border.disabled} inset`

    if (selected) {
      const innerShadow = condensed ? `0 0 5px 1px #B1B1B1 inset` : `0 0 7px 1px #B1B1B1 inset`

      return `box-shadow: ${originalBoxShadow}, ${innerShadow}; background-color: #F2F2F2`
    }
    return ""
  }};
`

const Toggle: React.SFC<ToggleProps> = props => (
  <Container>
    {props.options.map(item => (
      <Button
        textColor={item.value === props.value ? "primary" : undefined}
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
