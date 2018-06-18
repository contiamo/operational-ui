import * as React from "react"
import styled from "react-emotion"
import Avatar from "../Avatar/Avatar"
import { WithTheme, Css, CssStatic } from "../types"

export interface AvatarItem {
  photo?: string
  name: string
}

export interface Props {
  /** `css` prop as expected in a glamorous component */
  css?: Css
  /** Class name */

  className?: string
  children?: React.ReactNode
  /** Avatars list */

  avatars?: AvatarItem[]
  /** Maximum number of avatars to display */

  maximumToDisplay?: number
  /** More button handler */

  onMoreClick?: () => void
  /** Size of avatars */

  size?: "small" | "medium"
}

const Container = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    label: "avatar-group",
    display: "flex",
    "& :not(:first-child)": {
      marginLeft: theme.deprecated.spacing * -1,
    },
    "& .opui_avatar-picture": {
      border: "2px white solid",
    },
    "& .opui_name-container": {
      display: "none",
    },
  }),
)

const AvatarGroup: React.SFC<Props> = props => {
  const avatarsToDisplay = props.avatars
    ? props.avatars.map((avatar, i) => <Avatar key={i} {...avatar} />)
    : props.children
  const count = React.Children.count(avatarsToDisplay)
  const mustSlice = props.maximumToDisplay < count
  const sizeCss =
    props.size === "medium"
      ? {
          "& .opui_avatar-picture": {
            fontSize: 13,
            height: 48,
            width: 48,
          },
        }
      : {}
  return (
    <Container
      css={{
        ...props.css,
        ...sizeCss,
      }}
      className={props.className}
    >
      {mustSlice ? React.Children.toArray(avatarsToDisplay).slice(0, props.maximumToDisplay - 1) : avatarsToDisplay}
      {mustSlice && (
        <Avatar onClick={props.onMoreClick} name="more" assignColor={false}>
          +{count - props.maximumToDisplay + 1}
        </Avatar>
      )}
    </Container>
  )
}

AvatarGroup.defaultProps = {
  maximumToDisplay: 4,
}

export default AvatarGroup
