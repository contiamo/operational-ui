import * as React from "react"
import * as ReactFeather from "react-feather"
import { withTheme } from "emotion-theming"
import { OperationalStyleConstants, Theme, expandColor } from "@operational/theme"
import * as BrandIcons from "./Icon.Brand"
import { ReactFeatherIconName } from "./Icon.ReactFeather"
export type IconName = ReactFeatherIconName | BrandIcons.BrandIconName
export interface Props {
  /**
   * Icon name. See https://feathericons.com (convert name to PascalCase) for feather icons.
   * For OperationalUI brand icons, use the values `OperationalUI`, `Labs`, `Components`, `Blocks` and `Visualizations`
   */
  name: IconName
  /**
   * Size
   * @default props.theme.spacing * 1.5
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
}
export interface PropsWithTheme extends Props {
  theme?: OperationalStyleConstants & {
    deprecated: Theme
  }
}

const Icon = (props: PropsWithTheme) => {
  const color: string = expandColor(props.theme.deprecated, props.color) || "currentColor"
  const defaultSize = props.theme.deprecated.spacing * 1.5

  if (ReactFeather.hasOwnProperty(props.name)) {
    const Comp = ReactFeather[props.name]
    return <Comp size={props.size || defaultSize} color={color} />
  }

  if (
    !!(BrandIcons as {
      [key: string]: React.ReactNode
    })[props.name]
  ) {
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

    return <Comp {...props} />
  }

  return null
}

export default withTheme(Icon)
