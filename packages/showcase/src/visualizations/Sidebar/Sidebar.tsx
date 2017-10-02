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
    label: "Process Flow",
    links: [{ url: "/visualizations/process-flow/case01", label: "Case 1" }]
  },
  {
    label: "Bar chart",
    links: []
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
