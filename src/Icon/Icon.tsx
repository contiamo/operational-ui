import * as React from "react"
import styled from "../utils/styled"

import { DefaultProps } from "../types"
import constants, { expandColor } from "../utils/constants"
import BrandIcons, { BrandIconName } from "./Icon.Brand"
import * as CustomIcons from "./Icon.Custom"

export type IconName = BrandIconName | keyof typeof CustomIcons

export interface CommunIconProps extends DefaultProps {
  /**
   * Size
   *
   * @default 18 for regular icons, 32 for brand icons
   */
  size?: number
  /** Icon color, specified as a hex, or a color name (info, success, warning, error) */
  color?: string
  /**
   * Indicates that this component is left of other content, and adds an appropriate right margin.
   */
  left?: boolean
  /**
   * Indicates that this component is right of other content, and adds an appropriate left margin.
   */
  right?: boolean
  /**
   * Icon name.
   * For OperationalUI brand icons, use the values `OperationalUI`, `Labs`, `Components`, `Blocks` and `Visualizations`
   */
  name: IconName
  onClick?: (e: React.MouseEvent) => void
}

export interface OperationalUIIconProps extends CommunIconProps {
  name?: "OperationalUI"
  /**
   * OperationalUI needs this prop to animate the inner circle.
   * All other icons should ignore it.
   */
  rotation?: number
}

export interface PantheonIconProps extends CommunIconProps {
  name?: "Pantheon"
  /** Use the colored version of the logo (works for `name = Pantheon` only) */
  colored?: boolean
}

export interface OtherIconProps extends CommunIconProps {
  colored?: never
  rotation?: never
}

export type IconProps = OtherIconProps | OperationalUIIconProps | PantheonIconProps

const Icon: React.SFC<IconProps> = ({ left, right, color, name, ...props }) => {
  if (!name) {
    return <>"No Icon Specified"</>
  }
  const iconColor: string = expandColor(constants, color) || "currentColor"

  const TypedCustomIcons: { [key: string]: React.SFC<{ size?: number; color?: string }> } = CustomIcons

  if (TypedCustomIcons[name]) {
    const Comp = TypedCustomIcons[name]
    return <Comp {...props} size={props.size || 18} color={iconColor} />
  }

  if (BrandIcons[name]) {
    const Comp = BrandIcons[name]
    return <Comp {...props} size={props.size || 32} color={iconColor} />
  }

  return null
}

const IconComp = styled(Icon)<Pick<CommunIconProps, "left" | "right" | "onClick">>(
  ({ left, right, theme, onClick }) => ({
    marginLeft: right ? theme.space.small : 0,
    marginRight: left ? theme.space.small : 0,
    cursor: Boolean(onClick) ? "pointer" : "default",
    transition: "fill .075s ease",
  }),
)

const IconJSX: React.SFC<IconProps> = props => <IconComp {...props} />

IconJSX.defaultProps = {
  size: 18,
}

export default IconJSX
