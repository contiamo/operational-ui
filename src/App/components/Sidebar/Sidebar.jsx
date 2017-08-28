import React from "react"

import Sidebar, {
  SidebarItem,
  SidebarLink
} from "../../../components/Sidebar/Sidebar"

const paths = {
  dataEntry: ["/buttons", "/form-fields"],
  feedback: ["/tooltips"],
  uiElements: ["/chips", "/cards", "/stats"],
  navigation: ["/sidebar"]
}

export default ({ location }) =>
  <Sidebar>
    <SidebarItem
      open={location && paths.dataEntry.includes(location.pathname)}
      label="Data Entry"
    >
      <SidebarLink to="/components/buttons">Buttons</SidebarLink>
      <SidebarLink to="/components/form-fields">Form Fields</SidebarLink>
      <SidebarLink>Date Picker</SidebarLink>
      <SidebarLink>Color Picker</SidebarLink>
    </SidebarItem>
    <SidebarItem
      open={location && paths.feedback.includes(location.pathname)}
      label="Feedback"
    >
      <SidebarLink>Modals</SidebarLink>
      <SidebarLink>Notifications</SidebarLink>
      <SidebarLink>Alerts</SidebarLink>
      <SidebarLink>Messages</SidebarLink>
      <SidebarLink>Progress</SidebarLink>
      <SidebarLink to="/components/tooltips" tooltip="Like this.">
        Tooltips
      </SidebarLink>
    </SidebarItem>
    <SidebarItem
      open={location && paths.uiElements.includes(location.pathname)}
      label="UI Elements"
    >
      <SidebarLink to="/components/cards">Cards</SidebarLink>
      <SidebarLink to="/components/chips">Chips</SidebarLink>
      <SidebarLink to="/components/stats">Stats</SidebarLink>
    </SidebarItem>
    <SidebarItem
      open={location && paths.navigation.includes(location.pathname)}
      label="Navigation"
    >
      <SidebarLink to="/components/sidebar">Sidebar</SidebarLink>
      <SidebarLink to="/components/side-navigation">
        Side Navigation
      </SidebarLink>
      <SidebarLink>Tabs</SidebarLink>
      <SidebarLink>Pagination</SidebarLink>
    </SidebarItem>
    <SidebarItem label="Resources">
      <SidebarLink>Grid</SidebarLink>
      <SidebarLink>List</SidebarLink>
    </SidebarItem>
    <SidebarItem label="Icons">
      <SidebarLink>Feather Icons</SidebarLink>
    </SidebarItem>
  </Sidebar>
