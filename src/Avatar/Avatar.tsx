import * as React from "react"
import { DefaultProps } from "../types"
import { getInitials, readableTextColor } from "../utils"
import { colorMapper } from "../utils/color"
import { expandColor } from "../utils/constants"
import styled from "../utils/styled"

export interface AvatarProps extends DefaultProps {
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
  /** Color assigned to the avatar circle (hex or named color from `theme.colors`) */
  color?: string
  /** Automatically assign a deterministic color. (Invalidates `color` assignment)  */
  assignColor?: boolean
  /** Size of avatars */
  size?: "x-small" | "small" | "medium"
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

const Title = styled("div")(({ theme }) => ({
  color: theme.color.text.lighter,
  margin: 0,
}))

const Picture = styled("div")<{
  color?: AvatarProps["color"]
  colorAssignment?: string
  photo?: AvatarProps["photo"]
  showName: AvatarProps["showName"]
  addBorder: AvatarProps["addBorder"]
  size: AvatarProps["size"]
}>(
  {
    textTransform: "uppercase",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ({ theme, color, colorAssignment, photo, showName, addBorder, size }) => {
    const defaultColor: string = theme.color.primary
    const fixedBackgroundColor: string = color ? expandColor(theme, color) || defaultColor : defaultColor
    const assignedBackgroundColor: null | string = colorAssignment
      ? colorMapper(theme.color.palette)(colorAssignment)
      : null
    const backgroundColor = assignedBackgroundColor || fixedBackgroundColor
    const textColor = readableTextColor(backgroundColor, [theme.color.text.default, "white"])
    const sizeInPixels = size === "medium" ? 48 : size === "small" ? 32 : 16
    const fontSizeInPixels = size === "medium" ? 13 : size === "small" ? 11 : 8

    // Calculate sizes based on the state of the size prop
    const sizes = {
      fontSize: fontSizeInPixels,
      width: sizeInPixels,
      height: sizeInPixels,
      flex: `0 0 ${sizeInPixels}px`,
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
      border: addBorder ? (size === "x-small" ? "1px solid white" : "2px solid white") : 0,
    }
  },
)

const Avatar: React.SFC<AvatarProps> = props => {
  const initials = getInitials(props.name)
  return (
    <Container {...props}>
      <Picture
        photo={props.photo}
        color={props.color}
        colorAssignment={!props.color ? props.name : undefined}
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
