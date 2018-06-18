import React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import * as tinycolor from "tinycolor2"

export interface Props {
  success?: boolean
  error?: boolean
  theme?: OperationalStyleConstants & { deprecated: Theme }
}

const getColorFromProps = ({ success, error, theme }: Props): string => {
  if (success) {
    return theme.color.success
  }

  if (error) {
    return theme.color.error
  }

  return theme.color.background.dark
}

const Status = styled("div")((props: Props) => ({
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

export default (props: Props) => <Status {...props} />
