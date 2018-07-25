import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, expandColor } from "../utils/constants"
import { isModifiedEvent } from "../utils"
import { Icon } from ".."
import { Consumer, Context } from "../OperationalUI/OperationalUI"
import shapes from "./Logo.Shapes"

type WithTheme = { theme?: OperationalStyleConstants }

export interface Props {
  /** Size, in pixels, that the logomark should be */
  size?: number
  /** A color from the constants, or an arbitrary hex value */
  color?: keyof OperationalStyleConstants["color"] | string
  /** Logo name */
  name: keyof (typeof shapes)
  /** Link url prop a'la react-router */
  to?: string
  /** Click handler */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void
}

const logoPadding = 6

const containerStyles = ({
  stack,
  color_,
  size_,
  theme,
  aspectRatio,
}: {
  stack?: boolean
  color_?: string
  size_?: number
  aspectRatio: number
  theme?: OperationalStyleConstants
}) => `
  padding: ${logoPadding}px;
  width: ${(size_ - 2 * logoPadding) * aspectRatio + 2 * logoPadding}px;
  height: ${size_}px;
  fill: ${expandColor(theme, color_) || theme.color.white};
  & svg {
    height: ${size_ - 2 * logoPadding}px;
  }
`

const Container = styled("div")(containerStyles)

const LinkContainer = styled("a")(containerStyles)

const Logo: React.SFC<Props> = ({ name, size, color, to, ...props }) => {
  const { svg, aspectRatio } = shapes[name]
  if (!to) {
    return (
      <Container size_={size} aspectRatio={aspectRatio} color_={color} {...props}>
        {svg}
      </Container>
    )
  }
  return (
    <Consumer>
      {ctx => (
        <LinkContainer
          size_={size}
          color_={color}
          aspectRatio={aspectRatio}
          {...props}
          href={to}
          onClick={(ev: React.MouseEvent<HTMLElement>) => {
            props.onClick && props.onClick(ev)

            if (!isModifiedEvent(ev) && to && ctx.pushState) {
              ev.preventDefault()
              ctx.pushState(to)
            }
          }}
        >
          {svg}
        </LinkContainer>
      )}
    </Consumer>
  )
}

Logo.defaultProps = {
  size: 50,
  color: "white",
}

export default Logo
