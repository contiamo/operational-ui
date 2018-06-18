import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme, expandColor } from "@operational/theme"
import { readableTextColor, getInitials } from "@operational/utils"
import { WithTheme, Css, CssStatic } from "../types"
export interface Props {
  /** Name of the person */
  name: string
  /** Title of the person */

  title?: string
  /** Optionally display the name and title next to the avatar circle */

  showName?: boolean
  /** Hide initials from inside the avatar circle. Set automatically if a `photo` prop is set */

  hideInitials?: boolean
  /** A URL to an image of the person */

  photo?: string
  /** `css` prop as expected in a glamorous component */

  css?: Css
  /** Class name */

  className?: string
  /** Color assigned to the avatar circle (hex or named color from `theme.colors`) */

  color?: string
  /** Automatically assign a deterministic color. (Invalidates `color` assignment)  */

  assignColor?: boolean
  children?: React.ReactNode
  onClick?: () => void
}
const Container = styled("div")({
  label: "avatar",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
})
const NameContainer = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.deprecated.typography.body,
    display: "block",
  }),
)
const Name = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): CssStatic => ({
    ...theme.deprecated.typography.body,
    margin: 0,
  }),
)
const Title = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): CssStatic => ({
    ...theme.deprecated.typography.body,
    color: theme.deprecated.colors.gray,
    margin: 0,
  }),
)
const Picture = styled("div")(
  ({
    theme,
    color,
    colorAssignment,
    photo,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
    color?: string
    colorAssignment?: number
    photo?: string
  }): {} => {
    const defaultColor: string = theme.deprecated.colors.info
    const fixedBackgroundColor: string = color ? expandColor(theme.deprecated, color) || defaultColor : defaultColor
    const assignedBackgroundColor: null | string = colorAssignment
      ? theme.deprecated.colors.visualizationPalette[
          colorAssignment % theme.deprecated.colors.visualizationPalette.length
        ]
      : null
    const backgroundColor = assignedBackgroundColor || fixedBackgroundColor
    const textColor = readableTextColor(backgroundColor, [theme.deprecated.colors.text, "white"])
    return {
      fontSize: 9,
      textTransform: "uppercase",
      marginRight: theme.deprecated.spacing * 0.5,
      // use for offset the display name
      width: theme.deprecated.spacing * 2,
      height: theme.deprecated.spacing * 2,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...(photo
        ? {
            background: `url(${photo})`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            color: theme.deprecated.colors.white,
          }
        : {
            backgroundColor,
            color: textColor,
          }),
    }
  },
)

const Avatar: React.SFC<Props> = props => {
  const initials = getInitials(props.name)
  const colorAssignmentNumber =
    props.assignColor && !props.color
      ? [initials.charCodeAt(0), initials.charCodeAt(1)].reduce(
          (accumulator, current) => accumulator + (!current || isNaN(current) ? 0 : current),
          0,
        )
      : undefined
  return (
    <Container css={props.css} className={props.className} onClick={props.onClick}>
      <Picture
        photo={props.photo}
        color={props.color}
        colorAssignment={colorAssignmentNumber}
        className="opui_avatar-picture"
      >
        {props.children ? props.children : props.hideInitials || props.photo ? "" : initials}
      </Picture>
      {props.showName && (
        <NameContainer>
          <Name>{props.name}</Name>
          {props.title && <Title>{props.title}</Title>}
        </NameContainer>
      )}
    </Container>
  )
}

Avatar.defaultProps = {
  assignColor: true,
  onClick: () => ({}),
}
export default Avatar
