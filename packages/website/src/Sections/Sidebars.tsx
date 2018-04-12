import * as React from "react"
import { Sidebar, SidebarItem, SidebarHeader } from "@operational/components"

export const title = "Sidebars"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/sidebar.md"

export const Component = () => (
  <React.Fragment>
    <Sidebar>
      <SidebarHeader label="Header 1" open>
        <SidebarItem>Item 1</SidebarItem>
        <SidebarItem>Item 2</SidebarItem>
        <SidebarItem>Item 3</SidebarItem>
      </SidebarHeader>
      <SidebarHeader label="Header 2" />
    </Sidebar>
  </React.Fragment>
)
