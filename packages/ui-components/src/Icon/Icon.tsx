// @todo -> type this better
import * as React from "react"
import * as ReactFeather from "react-feather"
import { withTheme } from "glamorous"
import { Theme } from "../theme"
import { ReactFeatherIconName } from "./ReactFeather"

import { hexOrColor } from "contiamo-ui-utils"

export interface IProps {
  name: ReactFeatherIconName
  size?: number
  color?: string
}

export interface IPropsWithTheme extends IProps {
  theme: Theme
}

const Icon: React.StatelessComponent<IPropsWithTheme> = ({ name, size, color, theme }: IPropsWithTheme) => {
  const defaultColor = theme.colors.palette.grey90
  const color_: string = color ? hexOrColor(color)(theme.colors.palette[color] || defaultColor) as string : defaultColor

  if (ReactFeather.hasOwnProperty(name)) {
    const Comp = ReactFeather[name]
    return <Comp size={size || theme.spacing} color={color_} />
  } else {
    return null
  }
}

const WrappedIcon: React.SFC<IProps> = withTheme(Icon)

export default WrappedIcon
export { ReactFeatherIconName }
