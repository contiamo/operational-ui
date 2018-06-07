import * as React from "react"
import glamorous from "glamorous"

export interface Props {
  start: any
  middle: any
  end: any
}

const HeaderBar = glamorous.div({
  width: "100vw",
  height: 44,
  background: "#3e3e3e" /** @todo themeify when final */,
})

const Header = () => <HeaderBar />

export default Header
