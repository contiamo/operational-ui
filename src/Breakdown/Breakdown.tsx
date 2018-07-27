import * as React from "react"
import { IconName } from "../"
import { setBrightness } from "../utils"
import { deprecatedExpandColor } from "../utils/constants"
import styled from "../utils/styled"

export interface Props {
  /** Id */
  id?: string
  /** Class name */

  className?: string
  children: React.ReactNode
  /** A number by which the breakdown is represented */

  number?: number
  /** A statistic number label within the bar of the breakdown */

  label: string
  /** The percentage to fill the bar. This is typically passed in from a container component that calculates percentages at large */

  fill: number
  /** A theme palette color name, or a hex code that the bar will be colored with */

  color?: string
  /** Bar color */

  barColor?: string
  /** An icon that is displayed on the breakdown */

  icon?: IconName
  /** Invoked weth the mouse click the breakdown */

  onClick?: () => void
  /** Invoked when the mouse enters the breakdown. Useful for tooltips/infowindows */

  onMouseEnter?: () => void
  /** Invoked when the mouse leaves the breakdown. Useful for tooltips/infowindows */

  onMouseLeave?: () => void
}

const Container = styled("div")<{ onClick?: () => void }>(
  {
    label: "breakdown",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    maxWidth: 300,
  },
  ({ theme, onClick }) => ({
    padding: `${(theme.deprecated.spacing * 3) / 4}px 0`,
    ...(onClick
      ? {
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.01)",
          },
        }
      : {}),
    background: theme.deprecated.colors.white,
    ":not(:first-child)": {
      borderTop: `1px solid ${theme.deprecated.colors.separator}`,
    },
  }),
)

const Content = styled("div")({
  width: "100%",
})

const Label = styled("label")(
  {
    display: "block",
  },
  ({ theme }) => ({
    marginBottom: theme.deprecated.spacing / 4,
    fontSize: theme.deprecated.typography.small.fontSize,
  }),
)

const Bar = styled("div")<{ fill: number; color?: string }>(
  {
    position: "relative",
    width: "100%",
    fontSize: 12,
    overflow: "hidden",
    "& > span": {
      position: "relative",
      padding: 2,
    },
    ":before": {
      content: "' '",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 0,
      display: "block",
      height: "100%",
      pointerEvents: "none",
    },
  },
  ({ theme, fill, color }) => {
    const backgroundColor: string = deprecatedExpandColor(theme.deprecated, color) || theme.deprecated.colors.info
    return {
      padding: `${theme.deprecated.spacing / 4}px ${theme.deprecated.spacing / 2}px`,
      backgroundColor: theme.deprecated.colors.lightGray,
      "> span": {
        color: theme.deprecated.colors.gray,
        fontSize: 12,
        position: "relative",
        top: 1,
        fontWeight: theme.font.weight.regular,
      },
      ":before": {
        backgroundColor: setBrightness(backgroundColor, 155),
        transition: "all 0.3s ease-in-out",
        width: `${fill * 100}%`,
      },
    }
  },
)

const Number = styled("div")(
  {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ({ theme }) => ({
    ...theme.deprecated.typography.heading1,
    flex: `0 0 ${theme.deprecated.spacing * 2.5}px`,
    color: theme.deprecated.colors.lightGray,
  }),
)

const Span = styled("span")({ fontFeatureSettings: "'tnum'" })

const Breakdown: React.SFC<Props> = props => (
  <Container
    id={props.id}
    className={props.className}
    onClick={props.onClick}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
  >
    <Number>{props.number}</Number>
    <Content>
      <Label>{props.children}</Label>
      <Bar color={props.color} fill={props.fill}>
        <Span>{props.label}</Span>
      </Bar>
    </Content>
  </Container>
)

export default Breakdown
