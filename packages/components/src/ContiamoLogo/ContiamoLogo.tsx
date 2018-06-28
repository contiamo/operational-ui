import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import { expandColor } from "@operational/utils"
import { Icon } from ".."

type WithTheme = { theme?: OperationalStyleConstants }

export interface LogoProps {
  /** Size, in pixels, that the logomark should be */
  size?: number

  /** A color from the constants, or an arbitrary hex value */
  color?: keyof OperationalStyleConstants["color"] | string
}

const LogoContainer = styled("div")(
  {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  ({ size }: LogoProps & WithTheme) => ({
    width: size,
  }),
)

const LogoType = styled("svg")(({ theme, color }: LogoProps & WithTheme) => ({
  fill: expandColor(theme, color) || theme.color.white,
}))

const ContiamoLogo: React.SFC<LogoProps> = ({ size, color }) => (
  <LogoContainer>
    <Icon left name="Contiamo" size={size} color={color} />
    <LogoType color={color} width={size * 3.5} viewBox="650 255 1800 215" fill="currentColor">
      <title>Contiamo</title>
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,737.64133)">
        <g transform="translate(783.6366,282.649)">
          <path d="m 0,0 c 0,-31.84 -22.648,-48.499 -45.024,-48.499 -22.373,0 -45.022,16.659 -45.022,48.499 0,31.61 22.649,48.151 45.022,48.151 C -22.648,48.151 0,31.61 0,0 m -123.88,0 c 0,-54.855 40.816,-79.841 78.74,-79.841 37.925,0 78.741,24.986 78.741,79.841 0,54.737 -40.816,79.666 -78.741,79.666 -37.924,0 -78.74,-24.929 -78.74,-79.666" />
        </g>
        <g transform="translate(1082.6327,206.2238)">
          <path d="m 0,0 h 32.208 v 125.037 h 39.598 v 28.276 H -39.828 V 125.037 H 0 Z" />
        </g>
        <g transform="translate(1750.3544,234.1505)">
          <path d="m 0,0 c -22.372,0 -45.024,16.659 -45.024,48.499 0,31.61 22.652,48.151 45.024,48.151 22.373,0 45.025,-16.541 45.025,-48.151 C 45.025,16.659 22.373,0 0,0 m -0.115,128.164 c -37.922,0 -78.74,-24.928 -78.74,-79.665 0,-54.856 40.818,-79.842 78.74,-79.842 37.923,0 78.74,24.986 78.74,79.842 0,54.737 -40.817,79.665 -78.74,79.665" />
        </g>
        <path d="m 1199.1,206.224 h 32.213 V 359.537 H 1199.1 Z" />
        <g transform="translate(600.0526,319.2111)">
          <path d="m 0,0 23.474,23.472 c -14.427,12.789 -34.072,19.63 -54.039,19.63 -10.975,0 -22.047,-2.065 -32.412,-6.34 -29.366,-12.118 -46.207,-38.842 -46.207,-73.322 0,-34.594 16.872,-61.39 46.288,-73.517 29.195,-12.034 64.02,-6.487 86.346,13.333 L 0.049,-73.345 c -12.144,-11.272 -30.203,-14.864 -46.373,-8.845 -18.176,6.757 -29.026,23.814 -29.026,45.63 0,21.557 10.773,38.462 28.818,45.224 C -30.319,14.736 -12.204,11.221 0,0" />
        </g>
        <g transform="translate(1330.2391,253.2531)">
          <path d="M 0,0 24.9,57.993 50.431,0 Z M 68.267,-47.029 H 102.85 L 36.128,108.368 H 14.234 L -52.487,-47.029 h 34.582 l 7.852,20.377 h 70.467 z" />
        </g>
        <g transform="translate(998.9862,359.2208)">
          <path d="m 0,0 v -153.312 h -20.283 l -76.399,85.604 v -85.604 h -34.582 V 1.01 h 20.482 L -34.187,-86.254 -34.385,0 Z" />
        </g>
        <g transform="translate(1506.2977,290.4176)" id="g12">
          <path d="m 0,0 38.165,-48.328 h 7.062 L 83.419,0 83.365,-83.382 h 33.6 V 70.391 H 95.441 L 41.505,-4.345 -12.075,70.391 H -33.6 V -83.382 H 0 Z" />
        </g>
      </g>
    </LogoType>
  </LogoContainer>
)

ContiamoLogo.defaultProps = {
  size: 26,
  color: "white",
}

export default ContiamoLogo
