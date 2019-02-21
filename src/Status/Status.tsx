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

const getColorFromProps = ({
  running,
  success,
  error,
  state,
  theme,
}: StatusProps & { theme: OperationalStyleConstants }): string => {
  if (state) {
    return (
      new Map<LatestProps["state"], string>([
        ["error", theme.color.error],
        ["running", theme.color.warning],
        ["success", theme.color.success],
      ]).get(state) || "#989898"
    )
  }

  // deprecated api bellow
  if (running) {
    return theme.color.warning
  }

  if (success) {
    return theme.color.success
  }

  if (error) {
    return theme.color.error
  }

  return "#989898"
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
  <>
    <StatusDot {...props} />
    {children}
  </>
)

export default Status
