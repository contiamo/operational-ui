import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"

export interface HeaderProps {
  /**
   * The "logo" element of the HeaderBar.
   * Typically, the leftmost element.
   */
  logo: React.ReactNode

  /** The center of the HeaderBar. */
  main?: React.ReactNode

  /** The "end" element of the HeaderBar. */
  end?: React.ReactNode
}

const Bar = styled("div")(
  {
    display: "grid",
    width: "100%",
    " > *": {
      display: "flex",
      alignItems: "center",
    },
  },
  ({ theme }: { theme?: OperationalStyleConstants }) => {
    return {
      height: theme.titleHeight,
      padding: `0 ${theme.space.content}px`,
      gridTemplateColumns: `${theme.sidebarWidth}px auto 50px`,
      backgroundColor: theme.color.background.dark,
      color: theme.color.white,
      " > *": {
        height: theme.titleHeight,
      },
    }
  },
)

const StartContainer = styled("div")()
const CenterContainer = styled("div")()
const EndContainer = styled("div")({ justifyContent: "flex-end" })

const HeaderBar: React.SFC<HeaderProps> = ({ logo, main, end }) => (
  <Bar>
    <StartContainer>{logo}</StartContainer>
    <CenterContainer>{main}</CenterContainer>
    <EndContainer>{end}</EndContainer>
  </Bar>
)

export default HeaderBar
