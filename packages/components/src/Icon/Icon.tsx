import * as React from "react"
import * as ReactFeather from "react-feather"
import styled from "react-emotion"
import { withTheme } from "emotion-theming"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { expandColor } from "@operational/utils"

import BrandIcons, { BrandIconName } from "./Icon.Brand"
import { ReactFeatherIconName } from "./Icon.ReactFeather"

export type IconName = ReactFeatherIconName | BrandIconName

export interface Props {
  /**
   * Icon name. See https://feathericons.com (convert name to PascalCase) for feather icons.
   * For OperationalUI brand icons, use the values `OperationalUI`, `Labs`, `Components`, `Blocks` and `Visualizations`
   */
  name: IconName
  className?: string
  /**
   * Size
   * @default 32
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
   * Is the icon aligned to the left of something? This adds a right margin to create proper spacing between icons and content.
   */
  left?: boolean

  /**
   * Adds a left margin to create proper spacing between icons and content.
   */
  right?: boolean
}

export interface PropsWithTheme extends Props {
  theme?: OperationalStyleConstants
}

const style = (Component: React.SFC<Props>) =>
  styled(Component)(({ left, right, theme }: PropsWithTheme) => ({
    marginLeft: right ? theme.space.small : 0,
    marginRight: left ? theme.space.small : 0,
  }))

const Icon = withTheme(({ left, right, ...props }: PropsWithTheme) => {
  const color: string = expandColor(props.theme, props.color) || "currentColor"
  const defaultSize = 32

  if (ReactFeather[props.name]) {
    const Comp = style(ReactFeather[props.name])
    return <Comp {...props} size={props.size || defaultSize} color={color} />
  }

  if (BrandIcons[props.name]) {
    const Comp = style(BrandIcons[props.name])
    return <Comp {...props} size={props.size || defaultSize} color={color} />
  }

  return null
})

export default styled(Icon)()
