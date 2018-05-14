import * as React from "react"
import { Avatar, AvatarGroup, Heading2, Theme } from "@operational/components"
import glamorous from "glamorous"
import * as constants from "../../constants"

export const title = "Avatars"

export const docsUrl = `${constants.docsBaseUrl}/components/avatar.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Avatars.tsx`

const MiddleSection = glamorous.div(({ theme }: { theme: Theme }) => ({ margin: `${theme.spacing * 2}px 0` }))

export const Component = () => (
  <>
    <Avatar
      name="Franklin Green"
      title="Vice President"
      showName
      photo="https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/18622467_10156121732488332_4551245604522169705_n.jpg?_nc_cat=0&oh=2ee7f7f36ca7354020dc6c1b2b1bfb32&oe=5B9A00D5"
    />
    <AvatarGroup>
      <Avatar name="Paul Miller" />
      <Avatar
        name="Franklin Green"
        photo="https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/18622467_10156121732488332_4551245604522169705_n.jpg?_nc_cat=0&oh=2ee7f7f36ca7354020dc6c1b2b1bfb32&oe=5B9A00D5"
      />
    </AvatarGroup>
  </>
)
