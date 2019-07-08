import * as React from "react"
import Avatar from "../Avatar/Avatar"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface AvatarItem {
  photo?: string
  name: string
}

export interface AvatarGroupProps extends DefaultProps {
  children?: never
  /** Avatars list */
  avatars: AvatarItem[]
  /** Maximum number of avatars to display */
  maximumToDisplay?: number
  /** More button handler */
  onMoreClick?: () => void
  /** Size of avatars */
  size?: "small" | "medium"
}

const Container = styled("div")({
  display: "flex",
  marginLeft: 12,
})

const GroupedAvatar = styled(Avatar)({
  marginLeft: -12,
})

const AvatarGroup: React.SFC<AvatarGroupProps> = ({ avatars, size, onMoreClick, ...props }) => {
  const avatarsToDisplay = avatars.map((avatar, i) => <GroupedAvatar addBorder size={size} key={i} {...avatar} />)
  const count = React.Children.count(avatarsToDisplay)
  const mustSlice = props.maximumToDisplay! < count

  return (
    <Container {...props}>
      {mustSlice ? React.Children.toArray(avatarsToDisplay).slice(0, props.maximumToDisplay! - 1) : avatarsToDisplay}
      {mustSlice && (
        <GroupedAvatar addBorder size={size} onClick={onMoreClick} name="more" assignColor={false}>
          +{count - props.maximumToDisplay! + 1}
        </GroupedAvatar>
      )}
    </Container>
  )
}

AvatarGroup.defaultProps = {
  maximumToDisplay: 4,
}

export default AvatarGroup
