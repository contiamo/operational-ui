import * as React from "react"
import { Sidebar, SidebarItem, SidebarHeader } from "@operational/components"

export const title = "Sidebars"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/sidebar.md"

export const Component = () => (
  <React.Fragment>
    <Sidebar>
      <SidebarHeader>
        Header
        <SidebarItem>Item 1</SidebarItem>
      </SidebarHeader>
    </Sidebar>
  </React.Fragment>
)
