import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  /** Is the switch on? */

  on: boolean
  /** A change handler. Passes the new `on` boolean */

  onChange?: (on: boolean) => void
  className?: string
}

export interface StyleProps {
  on: boolean
  theme?: OperationalStyleConstants & {
    deprecated: Theme
  }
}

const width: number = 28
const height: number = 16
const railHeight: number = 16
const railOffset: number = 8

const Container = styled("div")({
  width,
  height,
  label: "switch",
  position: "relative",
  borderRadius: height / 2,
  overflow: "hidden",
  cursor: "pointer",
})

const Button = styled("div")(
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
  ({ on, theme }: StyleProps): CssStatic => ({
    transform: `translate3d(${on ? width - height : 0}px, 0, 0)`,
    backgroundColor: theme.deprecated.colors.white,
    border: `1px solid ${on ? theme.deprecated.colors.info : theme.deprecated.colors.gray}`,
    zIndex: theme.deprecated.baseZIndex + 2,
  }),
)

const Rail = styled("div")(
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
  ({ on, theme }: StyleProps): CssStatic => ({
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

const Switch = (props: Props) => (
  <Container
    id={props.id}
    className={props.className}
    onClick={() => {
      props.onChange && props.onChange(!props.on)
    }}
  >
    <Button on={props.on} />
    <Rail on={props.on} />
  </Container>
)

export default Switch
