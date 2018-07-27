import * as React from "react"

import { SidenavHeader, SidenavItem } from "../src"
import { Consumer } from "./StyleGuideRenderer"

export interface ComponentsListItem {
  heading: string
  name: string
  href: string
}

export interface ComponentsListRendererProps {
  items: ComponentsListItem[]
}

const ComponentsListRenderer: React.SFC<ComponentsListRendererProps> = ({ items }) => (
  <Consumer>
    {({ activeComponent }) => (
      <SidenavHeader active={true} label="Components">
        {items.map(({ name, href }) => (
          <SidenavItem active={activeComponent === name} key={href} label={name} to={`#${name}`} />
        ))}
      </SidenavHeader>
    )}
  </Consumer>
)

export default ComponentsListRenderer
