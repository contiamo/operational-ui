import * as React from "react"
import { Sidebar, SidebarItem, SidebarLink } from "contiamo-ui-components"

interface IProps {
  location?: {
    pathname: string
  }
  css?: any
  links: ISidebarLink[]
}

export interface ISidebarLink {
  label: string
  links: {
    url?: string
    label: string
  }[]
}

export default ({ links, location, css }: IProps) => (
  <Sidebar css={css}>
    {links.map((link, index) => {
      const isOpen = location && link.links.map(link => link.url).includes(location.pathname)
      return (
        <SidebarItem key={index} open={isOpen} label={link.label}>
          {link.links.map(({ url, label }, index) => {
            const isActive = location.pathname === url
            return (
              <SidebarLink key={index} to={url} disabled={!url} active={isActive}>
                {label}
              </SidebarLink>
            )
          })}
        </SidebarItem>
      )
    })}
  </Sidebar>
)
