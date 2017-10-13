// @todo -> type this better
import * as React from "react"
import * as ReactFeather from "react-feather"
import { withTheme } from "glamorous"

import { hexOrColor } from "contiamo-ui-utils"

type IconName = ReactFeatherIconName

interface IProps {
  name: IconName
  size?: number
  color?: string
  theme: Theme
}

const Icon: React.SFC<IProps> = ({ name, size, color, theme }) => {
  const defaultColor = theme.colors.palette.black
  const color_: string = color ? hexOrColor(color)(theme.colors.palette[color] || defaultColor) as string : defaultColor

  if (ReactFeather.hasOwnProperty(name)) {
    const Comp = ReactFeather[name]
    return <Comp size={size || theme.spacing} color={color_} />
  } else {
    return <div>Icon doesn't exist</div>
  }
}

export default withTheme(Icon)
