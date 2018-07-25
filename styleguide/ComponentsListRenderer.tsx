import * as React from "react"
import { SidenavHeader, SidenavItem } from "../src"

export interface ComponentsListItem {
  heading: string
  name: string
  href: string
}

export interface ComponentsListRendererProps {
  items: ComponentsListItem[]
}

const ComponentsListRenderer: React.SFC<ComponentsListRendererProps> = ({ items }) => (
  <SidenavHeader active={true} label="Components">
    {items.map(({ heading, name, href }) => <SidenavItem key={href} label={name} to={href} />)}
  </SidenavHeader>
)

export default ComponentsListRenderer
