import * as React from "react"
import styled from "react-emotion"

import constants, { OperationalStyleConstants, expandColor } from "../utils/constants"
import BrandIcons, { BrandIconName } from "./Icon.Brand"
import * as CustomIcons from "./Icon.Custom"

export type IconName = BrandIconName | keyof typeof CustomIcons

export interface PropsWithoutName {
  className?: string
  /**
   * Size
   *
   * @default 18 for regular icons, 32 for brand icons
   */
  size?: number
  /** Icon color, specified as a hex, or a color name (info, success, warning, error) */
  color?: string
  /** Use the colored version of the logo (works for `name = Pantheon` only) */
  colored?: boolean
  /**
   * OperationalUI needs this prop to animate the inner circle.
   * All other icons should ignore it.
   */
  rotation?: number
  /**
   * Indicates that this component is left of other content, and adds an appropriate right margin.
   */
  left?: boolean
  /**
   * Indicates that this component is right of other content, and adds an appropriate left margin.
   */
  right?: boolean
}

export interface Props extends PropsWithoutName {
  /**
   * Icon name.
   * For OperationalUI brand icons, use the values `OperationalUI`, `Labs`, `Components`, `Blocks` and `Visualizations`
   */
  name: IconName
}

export interface PropsWithTheme extends Props {
  theme?: OperationalStyleConstants
}

const Icon = ({ left, right, color, ...props }: Props) => {
  const iconColor: string = expandColor(constants, color) || "currentColor"

  const TypedCustomIcons: { [key: string]: React.SFC<{ size?: number; color?: string }> } = CustomIcons

  if (TypedCustomIcons[props.name]) {
    const Comp = TypedCustomIcons[props.name]
    return <Comp {...props} size={props.size || 18} color={iconColor} />
  }

  if (BrandIcons[props.name]) {
    const Comp = BrandIcons[props.name]
    return <Comp {...props} size={props.size || 32} color={iconColor} />
  }

  return null
}

export default styled(Icon)(({ left, right, theme }: PropsWithTheme) => ({
  marginLeft: right ? theme.space.small : 0,
  marginRight: left ? theme.space.small : 0,
}))
