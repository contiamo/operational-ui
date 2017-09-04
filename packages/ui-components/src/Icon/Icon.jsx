// @flow
import React from "react"
import type { Node } from "react"
import * as ReactFeather from "react-feather"

const sizeFactors = {
  small: 0.5,
  medium: 1,
  large: 2
}

type IconName = string
type IconSize = $Keys<typeof sizeFactors> // any key from sizeFactors object

type Props = {
  name: IconName,
  size?: IconSize,
  sizeOverride?: number,
  theme: THEME
}

const Icon = ({ name = "Play", size = "medium", sizeOverride, theme }: Props): Node => {
  const themeSpacing = theme ? theme.spacing : 16

  const pixelSize = sizeOverride || themeSpacing * sizeFactors[size]

  const props = {
    size: pixelSize
  }

  const Comp = ReactFeather[name]

  return <Comp {...props} />
}
export default Icon
export { Icon }
