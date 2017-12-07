// @todo -> type this better
import * as React from "react"
import * as ReactFeather from "react-feather"
import { withTheme } from "glamorous"
import { Theme } from "@operational/theme"
import { hexOrColor } from "@operational/utils"

import { ReactFeatherIconName } from "./ReactFeather"

export interface IProps {
  id?: string | number
  name: ReactFeatherIconName
  size?: number
  color?: string
}

export interface IPropsWithTheme extends IProps {
  theme: Theme
}

const Icon = (props: IPropsWithTheme) => {
  const defaultColor = props.theme.colors.palette.grey90
  const color_: string = props.color
    ? (hexOrColor(props.color)(props.theme.colors.palette[props.color] || defaultColor) as string)
    : defaultColor

  if (ReactFeather.hasOwnProperty(props.name)) {
    const Comp = ReactFeather[props.name]
    return <Comp key={props.id} size={props.size || props.theme.spacing} color={color_} />
  }
  return null
}

const WrappedIcon: React.SFC<IProps> = withTheme(Icon)

export default WrappedIcon
export { ReactFeatherIconName }
