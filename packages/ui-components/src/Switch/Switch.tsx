import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"

type Props = {
  on: boolean
  onChange: (on: boolean) => void
}

type StyleProps = {
  on: boolean
  theme: Theme
}

const width: number = 32
const height: number = 16
const railHeight: number = 6
const railOffset: number = 4

const Container = glamorous.div({
  width,
  height,
  position: "relative",
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
  ({ on, theme }: StyleProps) => ({
    transform: `translate3d(${on ? width - height : 0}px, 0, 0)`,
    backgroundColor: theme.greys.white,
    border: `1px solid ${theme.greys["80"]}`,
    zIndex: theme.baseZIndex + 2
  })
)

const Rail = glamorous.div(
  {
    width: width - 2 * railOffset,
    height: railHeight,
    backgroundColor: "black",
    position: "absolute",
    top: (height - railHeight) / 2,
    left: railOffset,
    borderRadius: railHeight / 2,
    overflow: "hidden"
  },
  ({ on, theme }: StyleProps) => ({
    backgroundColor: theme.greys["60"],
    "&:after": {
      content: " ",
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      backgroundColor: theme.colors.secondary,
      transition: "transform .3s",
      transform: `translate3d(${on ? "0" : "-100%"}, 0, 0)`,
      zIndex: theme.baseZIndex + 1
    }
  })
)

const Switch: React.SFC<Props> = ({ on, onChange }: Props) => (
  <Container
    onClick={() => {
      onChange(!on)
    }}
  >
    <Button on={on} />
    <Rail on={on} />
  </Container>
)

export default Switch
