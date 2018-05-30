import * as React from "react"
import { Sidebar, SidebarItem, SidebarHeader } from "@operational/components"
import * as constants from "../../constants"

export const title = "Sidebars"

export const docsUrl = `${constants.docsBaseUrl}/#sidebar`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Sidebars.tsx`

export const Component = () => (
  <>
    <Sidebar>
      <SidebarHeader label="Header 1" open>
        <SidebarItem>Item 1</SidebarItem>
        <SidebarItem>Item 2</SidebarItem>
        <SidebarItem>Item 3</SidebarItem>
      </SidebarHeader>
      <SidebarHeader label="Header 2" />
    </Sidebar>
  </>
)
