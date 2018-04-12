import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

import Animation from "./Animation"

export interface Props {
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "showcasetitlebar",
  padding: `${theme.spacing * 1}px 0`,
  color: theme.colors.white,
  margin: -theme.spacing,
  marginBottom: 20,
  position: "relative",
  height: 300,
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "center",
  "&::before": {
    position: "absolute",
    top: 0,
    left: 0,
    content: "' '",
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.sidenavBackground
  }
}))

const Hero = (props: Props) => (
  <Container>
    <Animation css={{ position: "absolute", top: "50%", left: "50%", transform: "translate3d(-50%, -50%, 0)" }} />
    {props.children}
  </Container>
)

export default Hero
