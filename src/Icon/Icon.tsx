import * as React from "react"
import styled from "../utils/styled"

import constants, { expandColor } from "../utils/constants"
import BrandIcons from "./Icon.Brand"
import * as CustomIconsMap from "./Icon.Custom"
import { BRAND_ICON, CommunIconProps, CUSTOM_ICON, CustomIconsData, IconProps, ICONS } from "./types"

export { IconProps, IconName, BRAND_ICON, CUSTOM_ICON, ICONS } from "./types"

export const allIcons: ICONS[] = Object.values(ICONS)

export const allBrandIcons = [ICONS.Contiamo, ICONS.OperationalUI, ICONS.Pantheon, ICONS.Labs] as BRAND_ICON[]

export const allCustomIcons = allIcons.filter(v => !allBrandIcons.includes(v as BRAND_ICON)) as CUSTOM_ICON[]

export const isCustomIcon = (value: string): value is CUSTOM_ICON => allCustomIcons.includes(value as CUSTOM_ICON)

export const isBrandIcon = (value: string): value is BRAND_ICON => allBrandIcons.includes(value as BRAND_ICON)

const Icon: React.SFC<IconProps> = ({ left, right, color, name, ...props }) => {
  if (!name) {
    return <>"No Icon Specified"</>
  }
  const iconColor: string = expandColor(constants, color) || "currentColor"

  const TypedCustomIcons: CustomIconsData = CustomIconsMap

  if (isCustomIcon(name)) {
    const Comp = TypedCustomIcons[name]
    return <Comp {...props} size={props.size || 18} color={iconColor} />
  }

  if (isBrandIcon(name)) {
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
