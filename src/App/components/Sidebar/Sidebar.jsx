import React from 'react';

import Sidebar, { SidebarItem, SidebarLink } from '../../../components/Sidebar/Sidebar';

const feedbackPaths = ['/tooltips'];
const uiElementPaths = ['/chips', '/cards'];

export default ({ location }) =>
  (<Sidebar>
    <SidebarItem title="Data Entry">
      <SidebarLink>Buttons</SidebarLink>
      <SidebarLink>Form Fields</SidebarLink>
      <SidebarLink>Date Picker</SidebarLink>
      <SidebarLink>Color Picker</SidebarLink>
    </SidebarItem>
    <SidebarItem open={location && feedbackPaths.includes(location.pathname)} title="Feedback">
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
      open={!!(location && uiElementPaths.includes(location.pathname))}
      title="UI Elements"
    >
      <SidebarLink to="/chips">Chips</SidebarLink>
      <SidebarLink to="/cards">Cards</SidebarLink>
    </SidebarItem>
    <SidebarItem title="Navigation">
      <SidebarLink>Side Navigation</SidebarLink>
      <SidebarLink>Tabs</SidebarLink>
      <SidebarLink>Pagination</SidebarLink>
    </SidebarItem>
    <SidebarItem title="Resources">
      <SidebarLink>Grid</SidebarLink>
      <SidebarLink>List</SidebarLink>
    </SidebarItem>
    <SidebarItem title="Icons">
      <SidebarLink>Feather Icons</SidebarLink>
    </SidebarItem>
  </Sidebar>);
