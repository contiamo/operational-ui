import * as React from "react"
import { Sidebar, SidebarItem, SidebarLink } from "contiamo-ui-components"

type Props = {
  location?: {
    pathname: string
  }
  css: {}
}

type Link = {
  label: string
  links: { url?: string; label: string }[]
}

const links: Link[] = [
  {
    label: "Basics",
    links: [{ url: "/components/colors", label: "Colors" }, { url: "/components/typography", label: "Typography" }]
  },
  {
    label: "Data Entry",
    links: [
      { url: "/components/buttons", label: "Buttons" },
      { url: "/components/switch", label: "Switch" },
      { url: "/components/form-fields", label: "Form Fields" },
      { url: "/components/color-picker", label: "Color Picker" },
      { label: "Date Picker" }
    ]
  },
  {
    label: "Feedback",
    links: [
      { label: "Modals" },
      { label: "Notifications" },
      { label: "Alerts" },
      { label: "Messages" },
      { url: "/components/progress", label: "Progress" },
      { url: "/components/tooltips", label: "Tooltips" }
    ]
  },
  {
    label: "UI Elements",
    links: [
      { label: "Context Menu" },
      { url: "/components/cards", label: "Cards" },
      { url: "/components/chips", label: "Chips" },
      { url: "/components/info-tiles", label: "InfoTiles" }
    ]
  },
  {
    label: "Navigation",
    links: [
      { url: "/components/sidebar", label: "Sidebar" },
      { label: "Side Navigation" },
      { label: "Tabs" },
      { label: "Pagination" }
    ]
  },
  {
    label: "Layout",
    links: [{ label: "Grid" }, { label: "List" }]
  }
]

export default ({ location, css }: Props) => (
  <Sidebar css={css}>
<<<<<<< HEAD
    {links.map((link, index) => {
      const isOpen = location && link.links.map(link => link.url).includes(location.pathname)
      return (
        <SidebarItem key={index} open={isOpen} label={link.label}>
          {link.links.map(({ url, label }, index) => {
            return (
              <SidebarLink key={index} to={url} disabled={!url}>
                {label}
              </SidebarLink>
            )
          })}
        </SidebarItem>
      )
    })}
=======
    <SidebarItem open={location && paths.dataEntry.includes(location.pathname)} label="Data Entry">
      <SidebarLink to="/components/buttons">Buttons</SidebarLink>
      <SidebarLink to="/components/switch">Switch</SidebarLink>
      <SidebarLink to="/components/form-fields">Form Fields</SidebarLink>
      <SidebarLink to="/components/color-picker">Color Picker</SidebarLink>
      <SidebarLink disabled>Date Picker</SidebarLink>
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
      <SidebarLink disabled>Context Menu</SidebarLink>
      <SidebarLink to="/components/cards">Cards</SidebarLink>
      <SidebarLink to="/components/chips">Chips</SidebarLink>
      <SidebarLink to="/components/stats">Stats</SidebarLink>
    </SidebarItem>
    <SidebarItem open={location && paths.navigation.includes(location.pathname)} label="Navigation">
      <SidebarLink to="/components/sidebar">Sidebar</SidebarLink>
      <SidebarLink disabled to="/components/side-navigation">
        Side Navigation
      </SidebarLink>
      <SidebarLink disabled>Tabs</SidebarLink>
      <SidebarLink to="/components/paginator">Pagination</SidebarLink>
    </SidebarItem>
    <SidebarItem label="Resources">
      <SidebarLink disabled>Grid</SidebarLink>
      <SidebarLink disabled>List</SidebarLink>
    </SidebarItem>
    <SidebarItem label="Icons">
      <SidebarLink to="/components/icons">Icons</SidebarLink>
    </SidebarItem>
>>>>>>> Add first pass at implementing Paginator component
  </Sidebar>
)
