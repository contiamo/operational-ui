import React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import tinycolor from "tinycolor2"

export interface Props {
  running?: boolean
  success?: boolean
  error?: boolean
  theme?: OperationalStyleConstants
}

const getColorFromProps = ({ running, success, error, theme }: Props): string => {
  if (running) {
    return theme.color.warn
  }

  if (success) {
    return theme.color.success
  }

  if (error) {
    return theme.color.error
  }

  return "#989898"
}

export const Status = styled("div")((props: Props) => ({
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

export default Status
