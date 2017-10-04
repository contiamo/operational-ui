// @todo -> type this better
import * as React from "react"
import * as ReactFeather from "react-feather"
import { withTheme } from "glamorous"

import { hexOrColor } from "contiamo-ui-utils"

type SizeFactors = {
  [key: string]: number
}

type IconName = string

type Props = {
  name: IconName
  size?: number
  color?: string
  theme: Theme
}

const Icon: React.SFC<Props> = ({ name, size, color, theme }: Props) => {
  const defaultColor = theme.colors.palette.black
  const color_: string = color ? hexOrColor(color)(theme.colors.palette[color] || defaultColor) as string : defaultColor

  // @todo -> this, better
  const IconLib = ReactFeather as any

  if (IconLib.hasOwnProperty(name)) {
    const Comp = IconLib[name]
    return <Comp size={size || theme.spacing} color={color_} />
  } else {
    return <div>Icon doesn't exist</div>
  }
}

export default withTheme(Icon)
