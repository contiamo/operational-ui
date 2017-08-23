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
      <SidebarLink to="/buttons">Buttons</SidebarLink>
      <SidebarLink to="/form-fields">Form Fields</SidebarLink>
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
      <SidebarLink to="/tooltips" tooltip="Like this.">
        Tooltips
      </SidebarLink>
    </SidebarItem>
    <SidebarItem
      open={location && paths.uiElements.includes(location.pathname)}
      label="UI Elements"
    >
      <SidebarLink to="/cards">Cards</SidebarLink>
      <SidebarLink to="/chips">Chips</SidebarLink>
      <SidebarLink to="/stats">Stats</SidebarLink>
    </SidebarItem>
    <SidebarItem
      open={location && paths.navigation.includes(location.pathname)}
      label="Navigation"
    >
      <SidebarLink to="/sidebar">Sidebar</SidebarLink>
      <SidebarLink to="/side-navigation">Side Navigation</SidebarLink>
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
