import * as React from "react"
import * as ReactFeather from "react-feather"
import { withTheme } from "glamorous"
import { Theme, expandColor } from "@operational/theme"

import * as BrandIcons from "./Icon/BrandIcon"
import { ReactFeatherIconName } from "./Icon/ReactFeatherIcon"

export type IconName = ReactFeatherIconName | BrandIcons.BrandIconName

export interface Props {
  id?: string | number
  name: IconName
  size?: number
  color?: string
  colored?: boolean
  // OperationalUI needs this prop to animate the inner circle.
  // All other icons should ignore it.
  rotation?: number
}

export interface PropsWithTheme extends Props {
  theme: Theme
}

const Icon = (props: PropsWithTheme) => {
  const color_: string = expandColor(props.theme, props.color) || "currentColor"
  const defaultSize: number = props.theme.spacing * 1.5

  if (ReactFeather.hasOwnProperty(props.name)) {
    const Comp = ReactFeather[props.name]
    return <Comp key={props.id} size={props.size || defaultSize} color={color_} />
  }
  // @todo -> type this better
  if (BrandIcons.hasOwnProperty(props.name)) {
    let Comp = BrandIcons.OperationalUI
    if (props.name === "Labs") {
      Comp = BrandIcons.Labs
    }
    if (props.name === "Pantheon") {
      Comp = BrandIcons.Pantheon
    }
    if (props.name === "Contiamo") {
      Comp = BrandIcons.Contiamo
    }
    return (
      <Comp
        key={props.id}
        size={props.size || defaultSize}
        color={color_}
        rotation={props.rotation}
        colored={props.colored}
      />
    )
  }

  return null
}

const WrappedIcon: React.SFC<Props> = withTheme(Icon)

export default WrappedIcon
