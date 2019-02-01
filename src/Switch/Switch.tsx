import * as React from "react"
import { DefaultProps } from "../types"
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
}

const width: number = 28
const height: number = 16
const railHeight: number = 16

const Container = styled("div")({
  display: "inline-flex",
  alignItems: "center",
})

const RailContainer = styled("div")<{ left?: string; right?: string }>(
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

const Button = styled("div")<SwitchProps>(
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
    backgroundColor: theme.deprecated.colors.white,
    border: `1px solid ${on ? theme.deprecated.colors.info : theme.deprecated.colors.gray}`,
    zIndex: theme.deprecated.baseZIndex + 2,
  }),
)

const Rail = styled("div")<SwitchProps>(
  {
    width,
    height: railHeight,
    backgroundColor: "black",
    position: "absolute",
    top: (height - railHeight) / 2,
    left: 0,
    borderRadius: railHeight / 2,
    overflow: "hidden",
  },
  ({ on, theme }) => ({
    backgroundColor: theme.deprecated.colors.gray,
    zIndex: theme.deprecated.baseZIndex,
    "&:after": {
      content: `" "`,
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: -height / 2,
      backgroundColor: theme.deprecated.colors.info,
      transition: "transform .3s",
      transform: `translate3d(${on ? "0" : "-100%"}, 0, 0)`,
      zIndex: theme.deprecated.baseZIndex - 1,
    },
  }),
)

const Switch: React.SFC<SwitchProps> = ({ on, onChange, left, right, ...props }) => (
  <Container {...props}>
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
