import React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import tinycolor from "tinycolor2"

export interface DeprecatedProps {
  running?: boolean
  success?: boolean
  error?: boolean
  state?: never
  theme?: OperationalStyleConstants
}

export interface LatestProps {
  running?: never
  success?: never
  error?: never
  state?: "error" | "success" | "running" | "neutral"
  theme?: OperationalStyleConstants
}

export type Props = DeprecatedProps | LatestProps

const getColorFromProps = ({ running, success, error, state, theme }: Props): string => {
  if (state) {
    return (
      new Map<LatestProps["state"], string>(
        [["error", theme.color.error], ["running", theme.color.warning], ["success", theme.color.success]],
      ).get(state) || "#989898"
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

const StatusDot = styled("div")((props: Props) => ({
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

export const Status: React.SFC<Props> = ({ children, ...props }) => (
  <>
    <StatusDot {...props} />
    {children}
  </>
)

export default Status
