import * as React from "react"

import Avatar from "../Avatar/Avatar"
import { DefaultProps } from "../types"
import styled from "../utils/styled"
import Tooltip from "../Tooltip/Tooltip"

export interface AvatarItem {
  photo?: string
  name: string
}

export interface AvatarGroupProps extends DefaultProps {
  children?: never
  /** Avatars list */
  avatars: AvatarItem[]
  /** Maximum number of avatars to display, includes a final "+# more" avatar */
  maximumToDisplay?: number
  /** More button handler */
  onMoreClick?: () => void
  /** Size of avatars */
  size?: "small" | "medium"
}

const MAX_MORE = 10

const Container = styled("div")({
  display: "flex",
  marginLeft: 12,
})

const AvatarContainer = styled.div`
  position: relative;
  margin-left: -12px;

  [data-avatar] {
    display: none;
  }
  :hover > [data-avatar] {
    display: block;
  }
`

const AvatarGroup: React.SFC<AvatarGroupProps> = ({ avatars, size, onMoreClick, ...props }) => {
  // Should at least display one avatar
  const maxToDisplay = Math.max(props.maximumToDisplay || 1, 1)
  const overflow = avatars.length - maxToDisplay + 1
  const mustSlice = overflow > 0
  const displayAvatars = mustSlice ? avatars.slice(0, maxToDisplay - 1) : avatars
  const moreAvatars = mustSlice ? avatars.slice(maxToDisplay - 1, maxToDisplay - 1 + MAX_MORE) : null

  return (
    <Container {...props}>
      {displayAvatars.map((avatar, i) => (
        <AvatarContainer key={i}>
          <Tooltip data-avatar position="top">
            {avatar.name}
          </Tooltip>
          <Avatar addBorder size={size} {...avatar} />
        </AvatarContainer>
      ))}
      {moreAvatars && (
        <AvatarContainer key="more">
          <Tooltip data-avatar position="top">
            {moreAvatars.map((avatar, i) => (
              <React.Fragment key={i}>
                {avatar.name}
                <br />
              </React.Fragment>
            ))}
            {overflow - MAX_MORE > 0 && "..."}
          </Tooltip>
          <Avatar addBorder size={size} onClick={onMoreClick} name="more" assignColor={false}>
            +{overflow}
          </Avatar>
        </AvatarContainer>
      )}
    </Container>
  )
}

AvatarGroup.defaultProps = {
  maximumToDisplay: 4,
}

export default AvatarGroup
