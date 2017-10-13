import * as React from "react"
import { Sidebar, SidebarItem, SidebarLink } from "contiamo-ui-components"

interface IProps {
  location?: {
    pathname: string
  }
  style: any
  links: ILink[]
}

interface ILink {
  label: string
  links: {
    url?: string
    label: string
  }[]
}

export default ({ links, location, style }: IProps) => (
  <Sidebar style={style}>
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
