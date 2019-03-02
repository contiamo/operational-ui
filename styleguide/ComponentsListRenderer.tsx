import * as React from "react"

import { SidenavHeader, SidenavItem } from "../src"

export interface ComponentsListItem {
  heading: string
  name: string
  components: ComponentsListItem[]
}

export interface ComponentsListRendererProps {
  items: ComponentsListItem[]
}

const ComponentsListRenderer = ({ items }: ComponentsListRendererProps) =>
  items.map(({ name, components }) => (
    <SidenavHeader active={true} label={name} key={name}>
      {components.map(component => (
        <SidenavItem
          active={window.location.hash === `#/${component.name}`}
          key={`${name}-${component.name}`}
          label={component.name}
          to={`#/${component.name}`}
        />
      ))}
    </SidenavHeader>
  ))

export default ComponentsListRenderer
