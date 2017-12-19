import * as React from "react"
import { Sidebar, SidebarItem, SidebarLink } from "@operational/components"

export default (
  <Sidebar>
    <SidebarItem label="Links">
      <SidebarLink onClick={() => window.open("https://www.contiamo.com")} symbol="&rarr;">
        Link 1
      </SidebarLink>
      <SidebarLink>Link 2</SidebarLink>
    </SidebarItem>
    <SidebarItem label="Fetch data first" tooltip="Click for async fun!" onClick={() => fetch("SOME URL")}>
      <SidebarLink color="#eee">This could have been</SidebarLink>
      <SidebarLink color="#777" tooltip="Notice how the text is always readable. 😉">
        fetched from an
      </SidebarLink>
      <SidebarLink>external resource.</SidebarLink>
    </SidebarItem>
  </Sidebar>
)
