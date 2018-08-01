import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface HeaderBarProps extends DefaultProps {
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
    padding: 0,
    " > *": {
      display: "flex",
      alignItems: "center",
    },
  },
  ({ theme }) => {
    return {
      height: theme.titleHeight,
      gridTemplateColumns: `${theme.sidebarWidth}px auto 250px`,
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

const EndContainer = styled("div")`
  display: flex;
  justify-content: flex-end;
`

const HeaderBar: React.SFC<HeaderBarProps> = ({ logo, main, end }) => (
  <Bar>
    <StartContainer>{logo}</StartContainer>
    <CenterContainer>{main}</CenterContainer>
    <EndContainer>{end}</EndContainer>
  </Bar>
)

export default HeaderBar
