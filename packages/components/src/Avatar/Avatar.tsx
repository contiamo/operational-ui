import * as React from "react"
import glamorous, { CSSProperties, Div } from "glamorous"
import { Theme, expandColor } from "@operational/theme/lib"
import { readableTextColor } from "@operational/utils/lib"

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

const Container = glamorous.div(
  ({ theme }: WithTheme): CssStatic => ({
    label: "avatar",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    maxWidth: 180,
  }),
)

const NameContainer = glamorous.div(
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.typography.body,
    display: "block",
  }),
)

const Name = glamorous.div(
  ({ theme }: { theme: Theme }): CssStatic => ({
    ...theme.typography.body,
    lineHeight: 1.25,
    margin: 0,
  }),
)

const Title = glamorous.div(
  ({ theme }: { theme: Theme }): CssStatic => ({
    ...theme.typography.body,
    color: theme.colors.gray,
    lineHeight: 1.25,
    margin: 0,
  }),
)

const Picture = glamorous.div(
  ({
    theme,
    color,
    colorAssignment,
    photo,
  }: {
    theme: Theme
    color?: string
    colorAssignment?: number
    photo?: string
  }): {} => {
    const defaultColor: string = theme.colors.info
    const fixedBackgroundColor: string = color ? expandColor(theme, color) || defaultColor : defaultColor
    const assignedBackgroundColor: null | string = colorAssignment
      ? theme.colors.visualizationPalette[colorAssignment % theme.colors.visualizationPalette.length]
      : null
    const backgroundColor = assignedBackgroundColor || fixedBackgroundColor
    const textColor = readableTextColor(backgroundColor, [theme.colors.text, "white"])

    return {
      ...theme.typography.heading1,
      textTransform: "uppercase",
      marginRight: theme.spacing * 0.5,
      width: theme.spacing * 2,
      height: theme.spacing * 2,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...(photo
        ? {
            background: `url(${photo})`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            color: theme.colors.white,
          }
        : { backgroundColor, color: textColor }),
    }
  },
)

export const getInitials = (name: string): string => {
  if (!name) return ""
  const fullInitials = name
    .split(" ")
    .map(([firstLetter]) => firstLetter.toUpperCase())
    .join("")

  const [firstInitial, , lastInitial] = fullInitials
  return fullInitials.length > 2 ? firstInitial + lastInitial : fullInitials
}

const Avatar: React.SFC<Props> = props => {
  const initials = getInitials(props.name)
  const colorAssignmentNumber = props.assignColor
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
