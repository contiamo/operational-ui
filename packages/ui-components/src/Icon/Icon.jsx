// @flow
import React from "react"
import { Play, Pause } from "react-feather"

const sizeFactors = {
  small: 0.5,
  medium: 1,
  large: 2
}

type IconName = "play" | "pause"
type IconSize = $Keys<typeof sizeFactors> // any key from sizeFactors object

const Icon = ({
    name = "play",
    size = "medium",
    sizeOverride,
    theme
  }: {
    name: IconName,
    size?: IconSize,
    sizeOverride?: number,
    theme: THEME
  }): React$Element<*> => {
    // Theme is not defined in the showcase package.
    // TODO: find better solution here.
    const themeSpacing = theme ? theme.spacing : 16

    const pixelSize = sizeOverride || themeSpacing * sizeFactors[size]

    // Separate react-feather props to facilitate mixing with other
    // icon types later on.
    const reactFeatherProps = {
      size: pixelSize
    }

    switch(name) {
      case "play":
        return <Play {...reactFeatherProps} />
      case "pause":
        return <Pause {...reactFeatherProps} />
      default:
        // eslint-disable-next-line
        (name: empty)
        // Return dummy SVG to make Flow happy, but this part of the code is
        // never reached in a typechecked environment.
        return <svg />
    }
  }

export default Icon
export { Icon }
