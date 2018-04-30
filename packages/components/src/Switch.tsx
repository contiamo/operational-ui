import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  id?: string
  on: boolean
  onChange?: (on: boolean) => void
  className?: string
  style?: any
}

export interface IStyleProps {
  on: boolean
  theme: Theme
}

const width: number = 28
const height: number = 16
const railHeight: number = 16
const railOffset: number = 8

const Container = glamorous.div({
  width,
  height,
  label: "switch",
  position: "relative",
  borderRadius: height / 2,
  overflow: "hidden",
  cursor: "pointer"
})

const Button = glamorous.div(
  {
    height,
    transition: "transform .3s",
    position: "absolute",
    top: 0,
    left: 0,
    content: " ",
    width: height,
    borderRadius: "50%"
  },
  ({ on, theme }: IStyleProps) => ({
    transform: `translate3d(${on ? width - height : 0}px, 0, 0)`,
    backgroundColor: theme.colors.white,
    border: `1px solid ${on ? theme.colors.info : theme.colors.gray}`,
    zIndex: theme.baseZIndex + 2
  })
)

const Rail = glamorous.div(
  {
    width,
    height: railHeight,
    backgroundColor: "black",
    position: "absolute",
    top: (height - railHeight) / 2,
    left: 0,
    borderRadius: railHeight / 2,
    overflow: "hidden"
  },
  ({ on, theme }: IStyleProps) => ({
    backgroundColor: theme.colors.gray,
    zIndex: theme.baseZIndex,
    "&:after": {
      content: " ",
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: -height / 2,
      backgroundColor: theme.colors.info,
      transition: "transform .3s",
      transform: `translate3d(${on ? "0" : "-100%"}, 0, 0)`,
      zIndex: theme.baseZIndex - 1
    }
  })
)

const Switch = (props: Props) => (
  <Container
    id={props.id}
    style={props.style}
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
