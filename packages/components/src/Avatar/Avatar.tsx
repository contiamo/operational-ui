import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, expandColor } from "../utils/constants"
import { readableTextColor, getInitials } from "@operational/utils"

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
  /** Class name */
  className?: string
  /** Color assigned to the avatar circle (hex or named color from `theme.colors`) */
  color?: string
  /** Automatically assign a deterministic color. (Invalidates `color` assignment)  */
  assignColor?: boolean
  /** Size of avatars */
  size?: "small" | "medium"
  /** Add a border to the Avatar? */
  addBorder?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

const Container = styled("div")({
  label: "avatar",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
})

const NameContainer = styled("div")({
  display: "block",
})

const Name = styled("div")({
  margin: 0,
})

const Title = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  color: theme.color.text.lighter,
  margin: 0,
}))

const Picture = styled("div")(
  {
    textTransform: "uppercase",

    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ({
    theme,
    color,
    colorAssignment,
    photo,
    showName,
    addBorder,
    size,
  }: {
    theme?: OperationalStyleConstants
    color?: Props["color"]
    colorAssignment?: number
    photo?: Props["photo"]
    showName: Props["showName"]
    addBorder: Props["addBorder"]
    size: Props["size"]
  }) => {
    const defaultColor: string = theme.color.primary
    const fixedBackgroundColor: string = color ? expandColor(theme, color) || defaultColor : defaultColor
    const assignedBackgroundColor: null | string = colorAssignment
      ? theme.deprecated.colors.visualizationPalette[
          colorAssignment % theme.deprecated.colors.visualizationPalette.length
        ]
      : null
    const backgroundColor = assignedBackgroundColor || fixedBackgroundColor
    const textColor = readableTextColor(backgroundColor, [theme.color.text.default, "white"])

    // Calculate sizes based on the state of the size prop
    const sizes =
      size === "medium"
        ? {
            fontSize: 13,
            width: 48,
            height: 48,
          }
        : {
            fontSize: 9,
            width: 32,
            height: 32,
          }

    // Calculate background based on the state of the photo prop
    const background = photo
      ? {
          background: `url(${photo})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          color: theme.color.white,
        }
      : {
          backgroundColor,
          color: textColor,
        }

    return {
      ...sizes,
      ...background,
      marginRight: showName ? theme.space.small : 0, // use for offset the display name
      border: addBorder ? "2px solid white" : 0,
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
    <Container {...props}>
      <Picture
        photo={props.photo}
        color={props.color}
        colorAssignment={colorAssignmentNumber}
        showName={props.showName}
        size={props.size}
        addBorder={props.addBorder}
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
  addBorder: false,
  size: "small",
  onClick: () => ({}),
}

export default Avatar
