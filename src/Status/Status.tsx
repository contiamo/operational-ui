import * as React from "react"
import tinycolor from "tinycolor2"
import { DefaultProps } from "../types"
import { OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"

export interface DeprecatedProps extends DefaultProps {
  running?: boolean
  success?: boolean
  error?: boolean
  state?: never
}

export interface LatestProps extends DefaultProps {
  running?: never
  success?: never
  error?: never
  state?: "error" | "success" | "running" | "neutral"
}

export type StatusProps = DeprecatedProps | LatestProps

const getColorFromProps = ({ state, theme }: StatusProps & { theme: OperationalStyleConstants }): string => {
  return (
    new Map<LatestProps["state"], string>([
      ["error", theme.color.error],
      ["running", theme.color.warning],
      ["success", theme.color.success],
    ]).get(state) || "#989898"
  )
}

const StatusDot = styled("div")<StatusProps>(props => ({
  display: "inline-block",
  marginRight: props.theme.space.small,
  width: props.theme.space.small,
  height: props.theme.space.small,
  borderRadius: "50%",
  boxShadow: `0 0 4px
    ${tinycolor(getColorFromProps(props))
      .setAlpha(0.6)
      .toHslString()}`,
  backgroundColor: getColorFromProps(props),
}))

const Status: React.SFC<StatusProps> = ({ children, ...props }) => (
  <div>
    <StatusDot {...props} />
    {children}
  </div>
)

export default Status
