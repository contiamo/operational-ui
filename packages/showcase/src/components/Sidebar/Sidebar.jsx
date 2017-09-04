import React from "react"

import { Sidebar, SidebarItem, SidebarLink } from "contiamo-ui-components"

const paths = {
  dataEntry: ["/buttons", "/form-fields"],
  feedback: ["/tooltips"],
  uiElements: ["/chips", "/cards", "/stats"],
  navigation: ["/sidebar"]
}

export default ({ location }) =>
  <Sidebar>
    <SidebarItem open={location && paths.dataEntry.includes(location.pathname)} label="Data Entry">
      <SidebarLink to="/components/buttons">Buttons</SidebarLink>
      <SidebarLink to="/components/form-fields">Form Fields</SidebarLink>
      <SidebarLink disabled>Date Picker</SidebarLink>
      <SidebarLink disabled>Color Picker</SidebarLink>
    </SidebarItem>
    <SidebarItem open={location && paths.feedback.includes(location.pathname)} label="Feedback">
      <SidebarLink disabled>Modals</SidebarLink>
      <SidebarLink disabled>Notifications</SidebarLink>
      <SidebarLink disabled>Alerts</SidebarLink>
      <SidebarLink disabled>Messages</SidebarLink>
      <SidebarLink disabled>Progress</SidebarLink>
      <SidebarLink to="/components/tooltips" tooltip="Like this.">
        Tooltips
      </SidebarLink>
    </SidebarItem>
    <SidebarItem open={location && paths.uiElements.includes(location.pathname)} label="UI Elements">
      <SidebarLink to="/components/cards">Cards</SidebarLink>
      <SidebarLink to="/components/chips">Chips</SidebarLink>
      <SidebarLink to="/components/stats">Stats</SidebarLink>
    </SidebarItem>
    <SidebarItem open={location && paths.navigation.includes(location.pathname)} label="Navigation">
      <SidebarLink to="/components/sidebar">Sidebar</SidebarLink>
      <SidebarLink to="/components/side-navigation">Side Navigation</SidebarLink>
      <SidebarLink disabled>Tabs</SidebarLink>
      <SidebarLink disabled>Pagination</SidebarLink>
    </SidebarItem>
    <SidebarItem label="Resources">
      <SidebarLink disabled>Grid</SidebarLink>
      <SidebarLink disabled>List</SidebarLink>
    </SidebarItem>
    <SidebarItem label="Icons">
      <SidebarLink to="/components/icons">Icons</SidebarLink>
    </SidebarItem>
  </Sidebar>
