import * as React from "react"
import { AvatarCollection, Heading2 } from "@operational/components"

export const title = "Avatar Collections"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/avatar.md"

export const Component = () => (
  <>
    <AvatarCollection
      people={[
        { name: "Peter Szerzo" },
        {
          name: "Tejas Kumar",
          photo:
            "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/18622467_10156121732488332_4551245604522169705_n.jpg?_nc_cat=0&oh=2ee7f7f36ca7354020dc6c1b2b1bfb32&oe=5B9A00D5",
        },
        { name: "Jon Foreman", photo: "http://coolspotters.com/files/photos/1170938/jon-foreman-profile.jpg" },
      ]}
    />
    <AvatarCollection
      size={48}
      people={[
        { name: "Peter Szerzo" },
        {
          name: "Tejas Kumar",
          photo:
            "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/18622467_10156121732488332_4551245604522169705_n.jpg?_nc_cat=0&oh=2ee7f7f36ca7354020dc6c1b2b1bfb32&oe=5B9A00D5",
        },
        { name: "Jon Foreman", photo: "http://coolspotters.com/files/photos/1170938/jon-foreman-profile.jpg" },
      ]}
    />
    <AvatarCollection
      size={64}
      people={[
        { name: "Peter Szerzo" },
        {
          name: "Tejas Kumar",
          photo:
            "https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/18622467_10156121732488332_4551245604522169705_n.jpg?_nc_cat=0&oh=2ee7f7f36ca7354020dc6c1b2b1bfb32&oe=5B9A00D5",
        },
        { name: "Jon Foreman", photo: "http://coolspotters.com/files/photos/1170938/jon-foreman-profile.jpg" },
      ]}
    />
  </>
)
