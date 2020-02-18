import * as React from "react"
import { DefaultProps } from "../types"
import { inputFocus } from "../utils"
import styled from "../utils/styled"

export interface SwitchProps extends DefaultProps {
  /** Is the switch on? */
  on: boolean
  /** A change handler. Passes the new `on` boolean */
  onChange?: (on: boolean) => void
  /** left value */
  left?: string
  /** right value */
  right?: string
  /** id of the label for a11y */
  labeledBy?: string
}

const width: number = 28
const height: number = 16
const railHeight: number = 16

const Container = styled.div(
  {
    display: "inline-flex",
    alignItems: "center",
  },
  ({ theme }) => ({
    ":focus": inputFocus({ theme }),
    ".no-focus &:focus": {
      boxShadow: "none",
    },
  }),
)

const RailContainer = styled.div<{ left?: string; right?: string }>(
  {
    width,
    height,
    label: "switch",
    position: "relative",
    borderRadius: height / 2,
    overflow: "hidden",
    cursor: "pointer",
  },
  ({ theme, left, right }) => ({
    marginLeft: left ? theme.space.base : 0,
    marginRight: right ? theme.space.base : 0,
  }),
)

const Button = styled.div<{ on: boolean }>(
  {
    height,
    transition: "transform .3s",
    position: "absolute",
    top: 0,
    left: 0,
    content: `" "`,
    width: height,
    borderRadius: "50%",
  },
  ({ on, theme }) => ({
    transform: `translate3d(${on ? width - height : 0}px, 0, 0)`,
    backgroundColor: theme.color.white,
    border: "none",
    outline: "none",
    boxShadow: `0 0 0 1px ${on ? theme.color.primary : theme.color.border.default}`,
    zIndex: theme.zIndex.switch + 1,
  }),
)

const Rail = styled.div<{ on: boolean }>(
  {
    width,
    height: railHeight,
    position: "absolute",
    top: (height - railHeight) / 2,
    left: 0,
    borderRadius: railHeight / 2,
    overflow: "hidden",
    outline: "none",
  },
  ({ on, theme }) => ({
    backgroundColor: theme.color.background.mediumDark,
    zIndex: theme.zIndex.switch,
    "&:after": {
      content: `" "`,
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: -height / 2,
      backgroundColor: theme.color.primary,
      transition: "transform .3s",
      transform: `translate3d(${on ? "0" : "-100%"}, 0, 0)`,
      zIndex: theme.zIndex.switch - 1,
    },
  }),
)

const Switch: React.SFC<SwitchProps> = ({ on, onChange, left, right, labeledBy, ...props }) => (
  <Container
    {...props}
    role="checkbox"
    aria-checked={on}
    aria-labelledby={labeledBy}
    tabIndex={0}
    onKeyDown={e => {
      if (onChange && e.key === " ") {
        e.preventDefault()
        onChange(!on)
      }
    }}
  >
    {left}
    <RailContainer
      left={left}
      right={right}
      onClick={() => {
        if (onChange) {
          onChange(!on)
        }
      }}
    >
      <Button on={on} />
      <Rail on={on} />
    </RailContainer>
    {right}
  </Container>
)

export default Switch
