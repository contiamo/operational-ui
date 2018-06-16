import * as React from "react"
import styled from "react-emotion"
export interface Props {
  start: any
  middle: any
  end: any
}
const HeaderBar = styled("div")({
  width: "100vw",
  height: 44,
  background: "#3e3e3e",
  /** @todo themeify when final */
})

const Header = () => <HeaderBar />

export default Header
