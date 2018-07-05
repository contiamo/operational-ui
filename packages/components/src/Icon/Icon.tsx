import * as React from "react"
import * as ReactFeather from "react-feather"
import styled from "react-emotion"
import { withTheme } from "emotion-theming"

import { OperationalStyleConstants, expandColor } from "../utils/constants"
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
   * Icon name. See https://feathericons.com (convert name to PascalCase) for feather icons.
   * For OperationalUI brand icons, use the values `OperationalUI`, `Labs`, `Components`, `Blocks` and `Visualizations`
   */
  name: IconName
}

export interface PropsWithTheme extends Props {
  theme?: OperationalStyleConstants
}

const Icon = withTheme(({ left, right, ...props }: PropsWithTheme) => {
  const color: string = expandColor(props.theme, props.color) || "currentColor"

  const TypedCustomIcons: { [key: string]: React.SFC<{ size?: number; color?: string }> } = CustomIcons

  if (TypedCustomIcons[props.name]) {
    const Comp = TypedCustomIcons[props.name]
    return <Comp {...props} size={props.size || 18} color={color} />
  }

  if (BrandIcons[props.name]) {
    const Comp = BrandIcons[props.name]
    return <Comp {...props} size={props.size || 32} color={color} />
  }

  return null
})

export default styled(Icon)(({ left, right, theme }: PropsWithTheme) => ({
  marginLeft: right ? theme.space.small : 0,
  marginRight: left ? theme.space.small : 0,
}))
