import * as React from "react"
import { Sidebar, SidebarItem, SidebarLink } from "contiamo-ui-components"

type Props = {
  location?: {
    pathname: string
  }
  css: {}
}

const links = [
  {
    label: "Basics",
    links: [
      { url: "/components/colors", label: "Colors", isEnabled: true },
      { url: "/components/typography", label: "Typography", isEnabled: true }
    ]
  },
  {
    label: "Data Entry",
    links: [
      { url: "/components/buttons", label: "Buttons", isEnabled: true },
      { url: "/components/switch", label: "Switch", isEnabled: true },
      { url: "/components/form-fields", label: "Form Fields", isEnabled: true },
      { url: "/components/color-picker", label: "Color Picker", isEnabled: true },
      { url: "/components/date-picker", label: "Date Picker", isEnabled: false }
    ]
  },
  {
    label: "Feedback",
    links: [
      { url: "/components/modals", label: "Modals", isEnabled: false },
      { url: "/components/notifications", label: "Notifications", isEnabled: false },
      { url: "/components/alerts", label: "Alerts", isEnabled: false },
      { url: "/components/messages", label: "Messages", isEnabled: false },
      { url: "/components/progress", label: "Progress", isEnabled: false },
      { url: "/components/tooltips", label: "Tooltips", isEnabled: true }
    ]
  },
  {
    label: "UI Elements",
    links: [
      { url: "/components/context-menu", label: "Context Menu", isEnabled: false },
      { url: "/components/cards", label: "Cards", isEnabled: true },
      { url: "/components/chips", label: "Chips", isEnabled: true },
      { url: "/components/stats", label: "Stats", isEnabled: true }
    ]
  },
  {
    label: "Navigation",
    links: [
      { url: "/components/sidebar", label: "Sidebar", isEnabled: true },
      { url: "/components/side-navigation", label: "Side Navigation", isEnabled: false },
      { url: "/components/tabs", label: "Tabs", isEnabled: false },
      { url: "/components/pagination", label: "Pagination", isEnabled: false }
    ]
  },
  {
    label: "Layout",
    links: [
      { url: "/components/grid", label: "Grid", isEnabled: false },
      { url: "/components/list", label: "List", isEnabled: false }
    ]
  }
]

export default ({ location, css }: Props) => (
  <Sidebar css={css}>
    {links.map((link, index) => {
      const isOpen = location && link.links.map(link => link.url).includes(location.pathname)
      return (
        <SidebarItem key={index} open={isOpen} label={link.label}>
          {link.links.map(({ url, label, isEnabled }, index) => {
            return (
              <SidebarLink key={index} to={url} disabled={!isEnabled}>
                {label}
              </SidebarLink>
            )
          })}
        </SidebarItem>
      )
    })}
  </Sidebar>
)
