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
    links: [
      { url: "/components/colors", label: "Colors" },
      { url: "/components/typography", label: "Typography" },
      { url: "/components/icons", label: "Icons" }
    ]
  },
  {
    label: "UI Elements",
    links: [
      { url: "/components/buttons", label: "Buttons" },
      { url: "/components/cards", label: "Cards" },
      { url: "/components/chips", label: "Chips" },
      { label: "Context Menu" },
      { url: "/components/info-tiles", label: "InfoTiles" },
      { url: "/components/timeline", label: "Timeline" }
    ]
  },
  {
    label: "Data Entry",
    links: [
      { url: "/components/color-picker", label: "Color Picker" },
      { label: "Date Picker" },
      { url: "/components/form-fields", label: "Form Fields" },
      { url: "/components/switch", label: "Switch" }
    ]
  },
  {
    label: "Feedback",
    links: [
      { label: "Alerts" },
      { label: "Messages" },
      { label: "Modals" },
      { label: "Notifications" },
      { url: "/components/progress", label: "Progress" },
      { url: "/components/tooltips", label: "Tooltips" }
    ]
  },
  {
    label: "Navigation",
    links: [
      { url: "/components/paginator", label: "Pagination" },
      { url: "/components/sidebar", label: "Sidebar" },
      { label: "Side Navigation" },
      { url: "/components/tabs", label: "Tabs" }
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
