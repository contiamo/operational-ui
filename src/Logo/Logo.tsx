import * as React from "react"
import OperationalContext from "../OperationalContext/OperationalContext"
import { DefaultProps } from "../types"
import { isModifiedEvent } from "../utils"
import { expandColor, OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"
import shapes from "./Logo.Shapes"

export interface LogoProps extends DefaultProps {
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
  /** Stack the logo? */
  stack?: boolean
}

export interface ContainerStyleProps {
  stack: boolean
  color_: string
  size_: number
  aspectRatio: number
}

const logoPadding = 9

const Container = styled("div")<ContainerStyleProps>(
  ({ color_, size_, theme, aspectRatio }) => `
  padding: ${logoPadding}px;
  width: ${(size_ - 2 * logoPadding) * aspectRatio + 2 * logoPadding}px;
  height: ${size_}px;
  fill: ${expandColor(theme, color_) || theme.color.white};
  & svg {
    height: ${size_ - 2 * logoPadding}px;
  }
`,
)

const LinkContainer = styled("a")<ContainerStyleProps>(
  ({ color_, size_, theme, aspectRatio }) => `
  padding: ${logoPadding}px;
  width: ${(size_ - 2 * logoPadding) * aspectRatio + 2 * logoPadding}px;
  height: ${size_}px;
  fill: ${expandColor(theme, color_) || theme.color.white};
  & svg {
    height: ${size_ - 2 * logoPadding}px;
  }
`,
)

const Logo: React.SFC<LogoProps> = ({ stack, name, size, color, to, ...props }) => {
  const { svg, aspectRatio } = shapes[name]
  if (!to) {
    return (
      <Container stack={stack!} size_={size!} aspectRatio={aspectRatio} color_={color!} {...props}>
        {svg}
      </Container>
    )
  }
  return (
    <OperationalContext>
      {ctx => (
        <LinkContainer
          size_={size!}
          color_={color!}
          stack={stack!}
          aspectRatio={aspectRatio}
          {...props}
          href={to}
          onClick={(ev: React.MouseEvent<HTMLElement>) => {
            if (props.onClick) {
              props.onClick(ev)
            }

            if (!isModifiedEvent(ev) && to && ctx.pushState) {
              ev.preventDefault()
              ctx.pushState(to)
            }
          }}
        >
          {svg}
        </LinkContainer>
      )}
    </OperationalContext>
  )
}

Logo.defaultProps = {
  size: 50,
  color: "white",
  stack: false,
}

export default Logo
