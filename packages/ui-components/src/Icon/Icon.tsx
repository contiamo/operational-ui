// @todo -> type this better
import * as React from "react"
import * as ReactFeather from "react-feather"
import { withTheme } from "glamorous"

type SizeFactors = {
  [key: string]: number
}

type IconName = string
type IconSize = keyof SizeFactors // any key from sizeFactors object

type Props = {
  name: IconName
  size?: number
  theme: Theme
}

const Icon: React.SFC<Props> = ({ name, size, theme }: Props) => {
  // @todo -> this, better
  const IconLib = ReactFeather as any

  if (IconLib.hasOwnProperty(name)) {
    const Comp = IconLib[name]
    return <Comp size={size || theme.spacing} />
  } else {
    return <div>Icon doesn't exist</div>
  }
}

export default withTheme(Icon)
