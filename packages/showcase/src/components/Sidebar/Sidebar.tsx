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
      { label: "Progress" },
      { url: "/components/tooltips", label: "Tooltips" }
    ]
  },
  {
    label: "UI Elements",
    links: [
      { label: "Context Menu" },
      { url: "/components/cards", label: "Cards" },
      { url: "/components/chips", label: "Chips" },
      { url: "/components/stats", label: "Stats" }
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
  </Sidebar>
)
