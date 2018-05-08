import * as React from "react"
import { Avatar, Heading2, Theme } from "@operational/components"
import glamorous from "glamorous"

export const title = "Avatars"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/avatar.md"

const MiddleSection = glamorous.div(({ theme }: { theme: Theme }) => ({ margin: `${theme.spacing * 2}px 0` }))

export const Component = () => (
  <>
    <Heading2>Just a name</Heading2>
    <Avatar name="Peter Szerzo" />
    <MiddleSection>
      <Heading2>With a photo</Heading2>
      <Avatar
        name="Tejas Kumar"
        photo="https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/18622467_10156121732488332_4551245604522169705_n.jpg?_nc_cat=0&oh=2ee7f7f36ca7354020dc6c1b2b1bfb32&oe=5B9A00D5"
      />
    </MiddleSection>
    <Heading2>With a photo and `withName` prop</Heading2>
    <Avatar withName name="Jon Foreman" photo="http://coolspotters.com/files/photos/1170938/jon-foreman-profile.jpg" />
  </>
)
