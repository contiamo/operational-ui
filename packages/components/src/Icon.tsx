import * as React from "react"
import * as ReactFeather from "react-feather"
import { withTheme } from "glamorous"
import { Theme, expandColor } from "@operational/theme"

import * as BrandIcons from "./Icon/BrandIcon"
import { ReactFeatherIconName } from "./Icon/ReactFeatherIcon"

export type IconName = ReactFeatherIconName | BrandIcons.BrandIconName

export interface IProps {
  id?: string | number
  name: IconName
  size?: number
  color?: string
  // OperationalUI needs this prop to animate the inner circle.
  // All other icons should ignore it.
  rotation?: number
}

export interface IPropsWithTheme extends IProps {
  theme: Theme
}

const Icon = (props: IPropsWithTheme) => {
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
    if (props.name === "Components") {
      Comp = BrandIcons.Components
    }
    if (props.name === "Blocks") {
      Comp = BrandIcons.Blocks
    }
    if (props.name === "Visualizations") {
      Comp = BrandIcons.Visualizations
    }
    if (props.name === "Documentation") {
      Comp = BrandIcons.Documentation
    }
    return <Comp key={props.id} size={props.size || defaultSize} color={color_} rotation={props.rotation} />
  }

  return null
}

const WrappedIcon: React.SFC<IProps> = withTheme(Icon)

export default WrappedIcon
