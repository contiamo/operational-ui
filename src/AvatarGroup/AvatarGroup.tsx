import * as React from "react"
import styled from "react-emotion"
import Avatar from "../Avatar/Avatar"

export interface AvatarItem {
  photo?: string
  name: string
}

export interface Props {
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

const Container = styled("div")({
  display: "flex",
})

const GroupedAvatar = styled(Avatar)({
  marginLeft: -8,
})

const AvatarGroup: React.SFC<Props> = props => {
  const avatarsToDisplay = props.avatars
    ? props.avatars.map((avatar, i) => <GroupedAvatar addBorder size={props.size} key={i} {...avatar} />)
    : props.children
  const count = React.Children.count(avatarsToDisplay)
  const mustSlice = props.maximumToDisplay < count

  return (
    <Container>
      {mustSlice ? React.Children.toArray(avatarsToDisplay).slice(0, props.maximumToDisplay - 1) : avatarsToDisplay}
      {mustSlice && (
        <GroupedAvatar addBorder size={props.size} onClick={props.onMoreClick} name="more" assignColor={false}>
          +{count - props.maximumToDisplay + 1}
        </GroupedAvatar>
      )}
    </Container>
  )
}

AvatarGroup.defaultProps = {
  maximumToDisplay: 4,
}

export default AvatarGroup
